import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// Import Supabase or Vercel Postgres if environment variables are available
let sql: any = null
let supabaseClient: any = null

try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Use Supabase (preferred)
    const { createClient } = require('@supabase/supabase-js')
    supabaseClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  } else if (process.env.POSTGRES_URL) {
    // Fallback to Vercel Postgres
    const { sql: postgresql } = require('@vercel/postgres')
    sql = postgresql
  }
} catch (error) {
  console.log('Database not available, using fallback storage')
}

// Fallback in-memory storage for development
let subscribers: string[] = []

// Initialize database table
async function initDatabase() {
  if (supabaseClient) {
    try {
      // Create table using Supabase SQL
      const { error } = await supabaseClient.rpc('create_subscribers_table', {})
      if (error && !error.message.includes('already exists')) {
        // If RPC doesn't exist, create table directly
        const { error: sqlError } = await supabaseClient
          .from('subscribers')
          .select('*')
          .limit(1)
        
        if (sqlError && sqlError.code === 'PGRST116') {
          // Table doesn't exist, let's create it via raw SQL
          console.log('Creating subscribers table...')
          return true // Supabase will auto-create via first insert
        }
      }
      return true
    } catch (error) {
      console.error('Failed to initialize Supabase table:', error)
      return false
    }
  } else if (sql) {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS subscribers (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          ip_address VARCHAR(45),
          user_agent TEXT
        )
      `
      return true
    } catch (error) {
      console.error('Failed to initialize SQL table:', error)
      return false
    }
  }
  return false
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate email
    const result = emailSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      )
    }

    const { email } = result.data
    
    // Get user info for analytics
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    let totalSubscribers = 0
    let isNew = false

    // Try to use Supabase database first
    if (supabaseClient) {
      try {
        // Check if email already exists
        const { data: existingUser, error: selectError } = await supabaseClient
          .from('subscribers')
          .select('email')
          .eq('email', email)
          .single()
        
        if (existingUser) {
          return NextResponse.json(
            { message: 'Email already subscribed!' },
            { status: 400 }
          )
        }

        // Insert new subscriber
        const { error: insertError } = await supabaseClient
          .from('subscribers')
          .insert([
            {
              email: email,
              ip_address: ip,
              user_agent: userAgent,
              created_at: new Date().toISOString()
            }
          ])

        if (insertError) {
          throw insertError
        }
        
        // Get total count
        const { count, error: countError } = await supabaseClient
          .from('subscribers')
          .select('*', { count: 'exact', head: true })
        
        totalSubscribers = count || 0
        isNew = true

      } catch (dbError: any) {
        console.error('Supabase error, falling back to SQL or memory:', dbError)
        // Try SQL fallback
        if (sql) {
          try {
            await initDatabase()
            
            const existingUser = await sql`
              SELECT email FROM subscribers WHERE email = ${email}
            `
            
            if (existingUser.rows.length > 0) {
              return NextResponse.json(
                { message: 'Email already subscribed!' },
                { status: 400 }
              )
            }

            await sql`
              INSERT INTO subscribers (email, ip_address, user_agent) 
              VALUES (${email}, ${ip}, ${userAgent})
            `
            
            const countResult = await sql`SELECT COUNT(*) as count FROM subscribers`
            totalSubscribers = parseInt(countResult.rows[0].count)
            isNew = true
          } catch (sqlError) {
            console.error('SQL error, falling back to memory:', sqlError)
            // Final fallback to memory
            if (subscribers.includes(email)) {
              return NextResponse.json(
                { message: 'Email already subscribed!' },
                { status: 400 }
              )
            }
            subscribers.push(email)
            totalSubscribers = subscribers.length
            isNew = true
          }
        } else {
          // Memory fallback
          if (subscribers.includes(email)) {
            return NextResponse.json(
              { message: 'Email already subscribed!' },
              { status: 400 }
            )
          }
          subscribers.push(email)
          totalSubscribers = subscribers.length
          isNew = true
        }
      }
    } else if (sql) {
      try {
        await initDatabase()
        
        const existingUser = await sql`
          SELECT email FROM subscribers WHERE email = ${email}
        `
        
        if (existingUser.rows.length > 0) {
          return NextResponse.json(
            { message: 'Email already subscribed!' },
            { status: 400 }
          )
        }

        await sql`
          INSERT INTO subscribers (email, ip_address, user_agent) 
          VALUES (${email}, ${ip}, ${userAgent})
        `
        
        const countResult = await sql`SELECT COUNT(*) as count FROM subscribers`
        totalSubscribers = parseInt(countResult.rows[0].count)
        isNew = true
      } catch (dbError) {
        console.error('SQL error, falling back to memory:', dbError)
        if (subscribers.includes(email)) {
          return NextResponse.json(
            { message: 'Email already subscribed!' },
            { status: 400 }
          )
        }
        subscribers.push(email)
        totalSubscribers = subscribers.length
        isNew = true
      }
    } else {
      // Use memory storage as fallback
      if (subscribers.includes(email)) {
        return NextResponse.json(
          { message: 'Email already subscribed!' },
          { status: 400 }
        )
      }
      subscribers.push(email)
      totalSubscribers = subscribers.length
      isNew = true
    }



    // RELIABLE EMAIL SYSTEM - Multiple attempts with detailed logging
    let emailStatus = 'not_attempted';
    let emailError = null;
    let emailId = null;

    if (resend && process.env.RESEND_API_KEY && isNew) {
      emailStatus = 'attempting';
      
      // Try email sending with retries
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts && emailStatus !== 'sent') {
        attempts++;
        try {
          console.log(`🔄 Email attempt ${attempts}/${maxAttempts} for: ${email}`);
          
          const result = await resend.emails.send({
            from: 'Liquidfy Team <hello@liquidfy.app>',
            to: email,
            subject: '🎯 Your Shopify Store is About to Get a MAJOR Upgrade',
            html: `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 10px; background: #f8fafc;">
            <div style="background: #ffffff !important; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e2e8f0; color-scheme: light !important;">
              
              <!-- Header with black gradient -->
              <div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%) !important; padding: 32px 20px; text-align: center;">
                <div style="margin: 0 auto 18px; text-align: center;">
                  <img src="https://liquidfy.app/LOGO.png" alt="Liquidfy Logo" style="width: 72px; height: 72px; border-radius: 16px; border: 2px solid rgba(255,255,255,0.2);">
                </div>
                <h1 style="color: white !important; margin: 0 0 10px; font-size: 32px; font-weight: 800; font-family: 'Inter', sans-serif; letter-spacing: -0.5px;">Welcome to Liquidfy!</h1>
                <p style="color: rgba(255,255,255,0.85) !important; margin: 0; font-size: 18px; font-weight: 500; line-height: 1.4;">You just secured your spot for the ultimate Shopify revolution 🚀</p>
              </div>
              
              <!-- Main content -->
              <div style="padding: 32px 20px;">
                
                <!-- Subscriber badge -->
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; border-radius: 12px; padding: 20px; margin-bottom: 28px; text-align: center; border: 1px solid #065f46;">
                  <h2 style="color: white !important; margin: 0 0 8px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif;">🎊 Congratulations!</h2>
                  <p style="color: rgba(255,255,255,0.9) !important; margin: 0; line-height: 1.5; font-weight: 600; font-size: 16px;">You're subscriber #${142 + totalSubscribers} on the exclusive Liquidfy waitlist</p>
                </div>
                
                <!-- The Problem -->
                <div style="margin-bottom: 28px;">
                  <h3 style="color: #111827 !important; margin: 0 0 16px; font-size: 22px; font-weight: 700; font-family: 'Inter', sans-serif;">💡 Here's Why You Made the Right Choice</h3>
                  <p style="color: #374151 !important; margin: 0 0 16px; font-size: 16px; line-height: 1.6;">Let's be honest: <strong>every Shopify store looks the same</strong>. Free themes make you blend in with thousands of competitors, while premium themes cost $300+ and still leave you looking generic.</p>
                  <p style="color: #374151 !important; margin: 0; font-size: 16px; line-height: 1.6; font-weight: 600;">Result? <span style="color: #dc2626;">Lower conversions, lost customers, and missed revenue.</span></p>
                </div>
                
                                 <!-- The Solution -->
                 <div style="background: #f9fafb !important; border-radius: 12px; padding: 24px; margin-bottom: 28px; border-left: 4px solid #6366f1;">
                   <h3 style="color: #111827 !important; margin: 0 0 16px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif;">⚡ The Liquidfy Solution</h3>
                   <p style="color: #374151 !important; margin: 0 0 16px; font-size: 16px; line-height: 1.6;">Instead of expensive themes and limited plugins, get access to <strong>100+ premium modules</strong> AND <strong>120+ ready-to-use Shopify sections</strong> that you can mix, match, and customize infinitely.</p>
                   <div style="background: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #e5e7eb;">
                     <p style="color: #111827 !important; margin: 0; font-size: 15px; line-height: 1.5; font-weight: 600;">💰 One subscription = Unlimited modules + Unlimited sections + Unlimited stores + Unlimited customization</p>
                   </div>
                 </div>
                
                                 <!-- What You Get -->
                 <div style="margin-bottom: 28px;">
                   <h3 style="color: #111827 !important; margin: 0 0 20px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif;">🎯 What You're Getting Access To</h3>
                   
                   <div style="background: #fef3c7 !important; border-radius: 10px; padding: 16px; margin-bottom: 12px; border-left: 3px solid #f59e0b;">
                     <h4 style="color: #92400e !important; font-weight: 700; margin: 0 0 6px; font-size: 16px; font-family: 'Inter', sans-serif;">🛒 100+ Premium Modules</h4>
                     <p style="color: #a16207 !important; margin: 0; font-size: 14px; line-height: 1.4;">Product carousels, comparison tables, trust badges, urgency timers, upsell widgets that actually convert</p>
                   </div>
                   
                   <div style="background: #dbeafe !important; border-radius: 10px; padding: 16px; margin-bottom: 12px; border-left: 3px solid #3b82f6;">
                     <h4 style="color: #1e40af !important; font-weight: 700; margin: 0 0 6px; font-size: 16px; font-family: 'Inter', sans-serif;">🎨 120+ Shopify Sections</h4>
                     <p style="color: #1d4ed8 !important; margin: 0; font-size: 14px; line-height: 1.4;">Ready-to-use .liquid sections for any theme: hero banners, product grids, testimonials, FAQ layouts</p>
                   </div>
                   
                   <div style="background: #fce7f3 !important; border-radius: 10px; padding: 16px; margin-bottom: 0; border-left: 3px solid #ec4899;">
                     <h4 style="color: #be185d !important; font-weight: 700; margin: 0 0 6px; font-size: 16px; font-family: 'Inter', sans-serif;">💰 Revenue Optimization</h4>
                     <p style="color: #be185d !important; margin: 0; font-size: 14px; line-height: 1.4;">Cart abandonment recovery, social proof widgets, discount displays, conversion-focused layouts</p>
                   </div>
                 </div>
                
                <!-- The Process -->
                <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%) !important; border-radius: 12px; padding: 24px; margin-bottom: 28px;">
                  <h3 style="color: #111827 !important; margin: 0 0 16px; font-size: 18px; font-weight: 700; font-family: 'Inter', sans-serif;">⚡ How Simple It Is</h3>
                  <div style="color: #374151 !important; font-size: 15px; line-height: 1.5;">
                    <div style="margin: 0 0 8px; font-weight: 600;">1️⃣ Choose any module from our library</div>
                    <div style="margin: 0 0 8px; font-weight: 600;">2️⃣ Customize text, colors, and settings</div>
                    <div style="margin: 0 0 8px; font-weight: 600;">3️⃣ Copy one line of code</div>
                    <div style="margin: 0; font-weight: 600;">4️⃣ Paste into your Shopify page (takes 30 seconds)</div>
                  </div>
                </div>
                
                                 <!-- Early Access Benefits -->
                 <div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%) !important; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                   <h3 style="color: white !important; margin: 0 0 16px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif;">🎁 Your Exclusive Early Access Benefits</h3>
                   <div style="color: #d1d5db !important; font-size: 15px; line-height: 1.6;">
                     <div style="margin: 0 0 8px; font-weight: 600; color: #d1d5db !important;">💰 <strong style="color: #d1d5db !important;">Exclusive discount access</strong> sent directly to your inbox at launch</div>
                     <div style="margin: 0 0 8px; font-weight: 600; color: #d1d5db !important;">⚡ <strong style="color: #d1d5db !important;">7-day exclusive access</strong> before public launch</div>
                     <div style="margin: 0 0 8px; font-weight: 600; color: #d1d5db !important;">🎯 <strong style="color: #d1d5db !important;">Priority support</strong> and feature requests</div>
                     <div style="margin: 0; font-weight: 600; color: #d1d5db !important;">🏆 <strong style="color: #d1d5db !important;">Bonus modules & sections</strong> only for waitlist members</div>
                   </div>
                 </div>
                
                                 <!-- CTA Button -->
                 <div style="text-align: center; margin-bottom: 24px;">
                   <a href="https://liquidfy.app" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%) !important; color: white !important; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 700; font-size: 16px; font-family: 'Inter', sans-serif; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">
                     🌐 Visit Liquidfy.app
                   </a>
                 </div>
                
                <!-- Social Proof -->
                <div style="background: #f0fdf4 !important; border-radius: 10px; padding: 20px; text-align: center; border: 1px solid #bbf7d0;">
                  <p style="color: #166534 !important; margin: 0 0 8px; font-size: 16px; font-weight: 700;">Our beta testers are already seeing results:</p>
                  <p style="color: #15803d !important; margin: 0; font-size: 15px; font-weight: 600;">"My conversion rate increased by 34% in the first week!" - Sarah K.</p>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background: #f8fafc !important; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b !important; margin: 0 0 8px; font-size: 14px; font-weight: 600;">
                  Launch countdown: We're going live very soon! ⏰
                </p>
                <p style="color: #94a3b8 !important; margin: 0; font-size: 12px;">
                  © 2024 Liquidfy. All rights reserved.<br>
                  <a href="https://liquidfy.app" style="color: #111827 !important; text-decoration: none; font-weight: 600;">liquidfy.app</a>
                </p>
              </div>
            </div>
          </div>
        `,
          });
          
          // Check if email was actually sent
          if (result && result.data && result.data.id) {
            emailStatus = 'sent';
            emailId = result.data.id;
            console.log(`✅ Email sent successfully on attempt ${attempts}:`, result.data.id);
            break; // Exit retry loop
          } else {
            throw new Error('Invalid response from Resend API');
          }
          
        } catch (error: any) {
          emailError = `Attempt ${attempts}: ${error.message || error.toString()}`;
          console.error(`❌ Email attempt ${attempts} failed:`, error);
          
          if (attempts >= maxAttempts) {
            emailStatus = 'failed';
            console.error(`❌ All ${maxAttempts} email attempts failed for: ${email}`);
          } else {
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, attempts * 1000));
          }
        }
      }
    } else {
      if (!resend) emailStatus = 'no_resend_instance';
      else if (!process.env.RESEND_API_KEY) emailStatus = 'no_api_key';
      else if (!isNew) emailStatus = 'not_new_subscriber';
    }

    // Return response with debug information
    const responseData = {
      message: 'Successfully subscribed!',
      totalSubscribers,
      isNew,
      usingDatabase: !!(supabaseClient || sql),
      databaseType: supabaseClient ? 'supabase' : sql ? 'postgres' : 'memory',
      debug: {
        emailStatus,
        emailError,
        emailId,
        hasResend: !!resend,
        hasApiKey: !!process.env.RESEND_API_KEY
      }
    };

    return NextResponse.json(responseData, { status: 200 })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  let totalSubscribers = 0
  let usingDatabase = false
  
  if (supabaseClient) {
    try {
      const { count, error } = await supabaseClient
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
      
      totalSubscribers = count || 0
      usingDatabase = true
    } catch (error) {
      console.error('Supabase count error:', error)
      totalSubscribers = subscribers.length
    }
  } else if (sql) {
    try {
      const countResult = await sql`SELECT COUNT(*) as count FROM subscribers`
      totalSubscribers = parseInt(countResult.rows[0].count)
      usingDatabase = true
    } catch (error) {
      totalSubscribers = subscribers.length
    }
  } else {
    totalSubscribers = subscribers.length
  }
  
  return NextResponse.json({
    totalSubscribers,
    message: 'Liquidfy waitlist API',
    usingDatabase,
    databaseType: supabaseClient ? 'supabase' : sql ? 'postgres' : 'memory'
  })
} 