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

    // Send welcome email using Resend (optional)
    if (resend && process.env.RESEND_API_KEY && isNew) {
      try {
        await resend.emails.send({
          from: 'Liquify Team <hello@liquidfy.app>',
          to: email,
          subject: '🚀 Welcome to Liquify - You\'re in the exclusive waitlist!',
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Liquify</title>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
                .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
                .gradient-text { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .shadow { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
                .hover-scale { transition: transform 0.2s ease; }
                .hover-scale:hover { transform: scale(1.02); }
              </style>
            </head>
            <body style="background-color: #f8fafc; margin: 0; padding: 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);">
                      
                      <!-- Header with gradient -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 40px 60px; text-align: center; position: relative;">
                          <!-- Logo -->
                          <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 20px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.3);">
                            <span style="color: white; font-size: 32px; font-weight: 800; font-family: 'Inter', sans-serif;">L</span>
                          </div>
                          <h1 style="color: white; font-size: 32px; font-weight: 800; margin: 0 0 12px; font-family: 'Inter', sans-serif;">Welcome to Liquify!</h1>
                          <p style="color: rgba(255, 255, 255, 0.9); font-size: 18px; margin: 0; font-weight: 500;">You're now part of something amazing 🎉</p>
                        </td>
                      </tr>
                      
                      <!-- Main content -->
                      <tr>
                        <td style="padding: 40px;">
                          
                          <!-- Success message -->
                          <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 16px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #10b981;">
                            <h2 style="color: #065f46; font-size: 20px; font-weight: 700; margin: 0 0 8px; font-family: 'Inter', sans-serif;">🎊 Congratulations!</h2>
                            <p style="color: #047857; margin: 0; line-height: 1.6; font-weight: 500;">
                              You've secured your spot on the exclusive Liquify waitlist. You're subscriber #${totalSubscribers} and you'll be among the first to access our revolutionary e-commerce platform!
                            </p>
                          </div>
                          
                          <!-- What's coming section -->
                          <div style="margin-bottom: 32px;">
                            <h3 style="color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 20px; font-family: 'Inter', sans-serif;">🚀 What's Coming Your Way</h3>
                            
                            <!-- Feature grid -->
                            <div style="display: grid; gap: 16px;">
                              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
                                <h4 style="color: #92400e; font-weight: 600; margin: 0 0 8px; font-size: 16px;">⚡ 150+ Premium Modules</h4>
                                <p style="color: #a16207; margin: 0; font-size: 14px; line-height: 1.5;">Unique Shopify components designed to boost conversions</p>
                              </div>
                              
                              <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
                                <h4 style="color: #1e40af; font-weight: 600; margin: 0 0 8px; font-size: 16px;">🎨 1-Click Installation</h4>
                                <p style="color: #1d4ed8; margin: 0; font-size: 14px; line-height: 1.5;">Simple and fast setup - no coding required</p>
                              </div>
                              
                              <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #ec4899;">
                                <h4 style="color: #be185d; font-weight: 600; margin: 0 0 8px; font-size: 16px;">📈 Proven Results</h4>
                                <p style="color: #be185d; margin: 0; font-size: 14px; line-height: 1.5;">Average +27% conversion rate increase guaranteed</p>
                              </div>
                            </div>
                          </div>
                          
                          <!-- Early bird bonus -->
                          <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); pointer-events: none;"></div>
                            <h3 style="color: white; font-size: 22px; font-weight: 700; margin: 0 0 12px; position: relative;">🎁 Exclusive Early Bird Benefits</h3>
                            <p style="color: #e0e7ff; margin: 0 0 20px; font-size: 16px; line-height: 1.6; position: relative;">As a waitlist member, you'll receive:</p>
                            <ul style="color: #c7d2fe; margin: 0; padding: 0; list-style: none; position: relative;">
                              <li style="margin-bottom: 8px;">✨ 50% OFF launch pricing</li>
                              <li style="margin-bottom: 8px;">🚀 7-day early access</li>
                              <li style="margin-bottom: 8px;">💎 Exclusive bonus modules</li>
                              <li>🎯 Priority support</li>
                            </ul>
                          </div>
                          
                          <!-- CTA Button -->
                          <div style="text-align: center; margin-bottom: 32px;">
                            <a href="https://liquidfy.app" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3); transition: all 0.2s ease;">
                              🌐 Visit Liquify.app
                            </a>
                          </div>
                          
                          <!-- Social proof -->
                          <div style="background: #f9fafb; border-radius: 12px; padding: 24px; text-align: center;">
                            <p style="color: #6b7280; margin: 0 0 12px; font-size: 14px;">Join ${totalSubscribers} other entrepreneurs waiting for launch</p>
                            <div style="display: flex; justify-content: center; gap: 8px; margin-top: 16px;">
                              <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%;"></div>
                              <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%;"></div>
                              <div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%;"></div>
                            </div>
                          </div>
                          
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background: #f8fafc; padding: 32px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                          <p style="color: #6b7280; margin: 0 0 12px; font-size: 14px;">
                            Stay tuned - we're launching very soon! 🚀
                          </p>
                          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                            © 2024 Liquify. All rights reserved.<br>
                            <a href="https://liquidfy.app" style="color: #4f46e5; text-decoration: none;">liquidfy.app</a>
                          </p>
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        })
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError)
        // Don't fail the subscription if email fails
      }
    }

            return NextResponse.json(
          { 
            message: 'Successfully subscribed!',
            totalSubscribers,
            isNew,
            usingDatabase: !!(supabaseClient || sql),
            databaseType: supabaseClient ? 'supabase' : sql ? 'postgres' : 'memory'
          },
          { status: 200 }
        )

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