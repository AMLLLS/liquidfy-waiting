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

    // Debug info for troubleshooting
    const debugInfo: any = {
      hasResend: !!resend,
      hasApiKey: !!process.env.RESEND_API_KEY,
      apiKeyPrefix: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 6) + '...' : 'MISSING',
      isNew,
      emailToSend: email
    };

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
            from: 'Liquify Team <hello@liquidfy.app>',
            to: email,
            subject: '🚀 Welcome to Liquify - You\'re in the exclusive waitlist!',
                  html: `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 10px; background: #f1f5f9;">
            <div style="background: #fefefe !important; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e2e8f0; color-scheme: light !important;">
              
              <!-- Header with gradient -->
              <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%) !important; padding: 30px 15px; text-align: center;">
                <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.15) !important; border-radius: 12px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white !important; font-size: 24px; font-weight: 800; font-family: 'Inter', sans-serif;">L</span>
                </div>
                <h1 style="color: white !important; margin: 0 0 8px; font-size: 28px; font-weight: 700; font-family: 'Inter', sans-serif;">Welcome to Liquify!</h1>
                <p style="color: rgba(255,255,255,0.9) !important; margin: 0; font-size: 16px; font-weight: 500;">You're now part of something amazing 🎉</p>
              </div>
              
              <!-- Main content -->
              <div style="padding: 24px 15px;">
                <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%) !important; border-radius: 8px; padding: 16px; margin-bottom: 24px; border-left: 4px solid #10b981;">
                  <h2 style="color: #065f46 !important; margin: 0 0 6px; font-size: 18px; font-weight: 700; font-family: 'Inter', sans-serif;">🎊 Congratulations!</h2>
                  <p style="color: #047857 !important; margin: 0; line-height: 1.5; font-weight: 500; font-size: 14px;">You're subscriber #${totalSubscribers} on the exclusive Liquify waitlist!</p>
                </div>
                
                <h3 style="color: #0f172a !important; margin: 0 0 16px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif;">🚀 What's Coming Your Way</h3>
                
                <!-- Feature cards -->
                <div style="margin-bottom: 24px;">
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; border-radius: 8px; padding: 12px; margin-bottom: 12px; border-left: 3px solid #f59e0b;">
                    <h4 style="color: #92400e !important; font-weight: 600; margin: 0 0 4px; font-size: 14px; font-family: 'Inter', sans-serif;">⚡ 150+ Premium Modules</h4>
                    <p style="color: #a16207 !important; margin: 0; font-size: 12px; line-height: 1.4;">Unique Shopify components designed to boost conversions</p>
                  </div>
                  
                  <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%) !important; border-radius: 8px; padding: 12px; margin-bottom: 12px; border-left: 3px solid #3b82f6;">
                    <h4 style="color: #1e40af !important; font-weight: 600; margin: 0 0 4px; font-size: 14px; font-family: 'Inter', sans-serif;">🎨 1-Click Installation</h4>
                    <p style="color: #1d4ed8 !important; margin: 0; font-size: 12px; line-height: 1.4;">Simple and fast setup - no coding required</p>
                  </div>
                  
                  <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%) !important; border-radius: 8px; padding: 12px; margin-bottom: 0; border-left: 3px solid #ec4899;">
                    <h4 style="color: #be185d !important; font-weight: 600; margin: 0 0 4px; font-size: 14px; font-family: 'Inter', sans-serif;">📈 Proven Results</h4>
                    <p style="color: #be185d !important; margin: 0; font-size: 12px; line-height: 1.4;">Average +27% conversion rate increase guaranteed</p>
                  </div>
                </div>
                
                <!-- Early bird section -->
                <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%) !important; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 20px;">
                  <h3 style="color: white !important; margin: 0 0 12px; font-size: 18px; font-weight: 700; font-family: 'Inter', sans-serif;">🎁 Exclusive Early Bird Benefits</h3>
                  <div style="color: #e0e7ff !important; font-size: 13px; line-height: 1.4;">
                    <div style="margin: 0 0 6px; font-weight: 500;">✨ 50% OFF launch pricing</div>
                    <div style="margin: 0 0 6px; font-weight: 500;">🚀 7-day exclusive early access</div>
                    <div style="margin: 0; font-weight: 500;">💎 Exclusive bonus modules</div>
                  </div>
                </div>
                
                <!-- CTA Button -->
                <div style="text-align: center; margin-bottom: 20px;">
                  <a href="https://liquidfy.app" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%) !important; color: white !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; font-family: 'Inter', sans-serif;">
                    🌐 Visit Liquify.app
                  </a>
                </div>
            
              
              <!-- Footer -->
              <div style="background: #f1f5f9 !important; padding: 16px 15px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b !important; margin: 0 0 6px; font-size: 12px; font-weight: 500;">
                  Stay tuned - we're launching very soon! 🚀
                </p>
                <p style="color: #94a3b8 !important; margin: 0; font-size: 11px;">
                  © 2024 Liquify. All rights reserved.<br>
                  <a href="https://liquidfy.app" style="color: #6366f1 !important; text-decoration: none; font-weight: 600;">liquidfy.app</a>
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

    // Return response with debug info
    const responseData = {
      message: 'Successfully subscribed!',
      totalSubscribers,
      isNew,
      usingDatabase: !!(supabaseClient || sql),
      databaseType: supabaseClient ? 'supabase' : sql ? 'postgres' : 'memory',
      // Debug info (remove in production)
      debug: {
        ...debugInfo,
        emailStatus,
        emailError,
        emailId,
        timestamp: new Date().toISOString()
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
    message: 'Liquify waitlist API',
    usingDatabase,
    databaseType: supabaseClient ? 'supabase' : sql ? 'postgres' : 'memory'
  })
} 