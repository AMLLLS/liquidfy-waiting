import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Mot de passe admin (même que dans la configuration)
const ADMIN_PASSWORD = 'Liquidfy2024!@#'

// Import database clients
let supabaseClient: any = null
let sql: any = null

try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { createClient } = require('@supabase/supabase-js')
    supabaseClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  } else if (process.env.POSTGRES_URL) {
    const { sql: postgresql } = require('@vercel/postgres')
    sql = postgresql
  }
} catch (error) {
  console.log('Database not available for email campaigns')
}

// Fonction de vérification d'authentification
function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const password = request.headers.get('x-admin-password')
  
  // Vérifier le mot de passe dans les headers
  if (password === ADMIN_PASSWORD) {
    return true
  }
  
  // Vérifier l'authentification Bearer (pour une sécurité supplémentaire)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    if (token === ADMIN_PASSWORD) {
      return true
    }
  }
  
  return false
}

// Email Campaign Templates
const URGENCY_EMAIL_TEMPLATE = (email: string, totalSubscribers: number, daysLeft: number) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🚨 Liquidfy Launch Alert - ${daysLeft} Days Left!</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 10px; background: #f8fafc;">
  <div style="background: #ffffff !important; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e2e8f0; color-scheme: light !important;">
    
    <!-- Header with urgency gradient -->
    <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%) !important; padding: 32px 20px; text-align: center;">
      <div style="margin: 0 auto 18px; text-align: center;">
        <img src="https://liquidfy.app/LOGO.png" alt="Liquidfy Logo" style="width: 72px; height: 72px; border-radius: 16px; border: 2px solid rgba(255,255,255,0.2);">
      </div>
      <h1 style="color: white !important; margin: 0 0 10px; font-size: 36px; font-weight: 800; font-family: 'Inter', sans-serif; letter-spacing: -0.5px;">🚨 ${daysLeft} DAYS LEFT!</h1>
      <p style="color: rgba(255,255,255,0.9) !important; margin: 0; font-size: 18px; font-weight: 500; line-height: 1.4;">Liquidfy launches in ${daysLeft} days - Your early access is about to expire!</p>
    </div>
    
    <!-- Main content -->
    <div style="padding: 32px 20px;">
      
      <!-- Urgency badge -->
      <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%) !important; border-radius: 12px; padding: 20px; margin-bottom: 28px; text-align: center; border: 1px solid #dc2626;">
        <h2 style="color: white !important; margin: 0 0 8px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif;">⏰ TIME IS RUNNING OUT!</h2>
        <p style="color: rgba(255,255,255,0.9) !important; margin: 0; line-height: 1.5; font-weight: 600; font-size: 16px;">You're subscriber #${totalSubscribers + 200} - Don't lose your spot!</p>
      </div>
      
      <!-- Social Proof Section -->
      <div style="background: #f9fafb !important; border-radius: 12px; padding: 24px; margin-bottom: 28px; border-left: 4px solid #10b981;">
        <h3 style="color: #111827 !important; margin: 0 0 16px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif;">🔥 What Other Entrepreneurs Are Saying</h3>
        <div style="background: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #e5e7eb; margin-bottom: 16px;">
          <p style="color: #111827 !important; margin: 0 0 8px; font-size: 15px; line-height: 1.5; font-style: italic;">"I've been waiting for something like Liquidfy for years. The modules are game-changing for my Shopify store."</p>
          <p style="color: #6b7280 !important; margin: 0; font-size: 14px; font-weight: 600;">- Sarah Chen, Fashion Store Owner</p>
        </div>
        <div style="background: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #e5e7eb;">
          <p style="color: #111827 !important; margin: 0 0 8px; font-size: 15px; line-height: 1.5; font-style: italic;">"This is exactly what my store needed. The conversion rate improvements are incredible."</p>
          <p style="color: #6b7280 !important; margin: 0; font-size: 14px; font-weight: 600;">- Mike Rodriguez, Electronics Store</p>
        </div>
      </div>
      
      <!-- What You'll Miss -->
      <div style="margin-bottom: 28px;">
        <h3 style="color: #111827 !important; margin: 0 0 16px; font-size: 22px; font-weight: 700; font-family: 'Inter', sans-serif;">💔 What You'll Miss If You Wait</h3>
        <p style="color: #374151 !important; margin: 0 0 16px; font-size: 16px; line-height: 1.6;">While you're thinking about it, your competitors are already planning their store upgrades. Every day you wait is another day they get ahead.</p>
        
        <div style="background: #fef2f2 !important; border-radius: 10px; padding: 16px; margin-bottom: 12px; border-left: 3px solid #ef4444;">
          <h4 style="color: #dc2626 !important; font-weight: 700; margin: 0 0 6px; font-size: 16px; font-family: 'Inter', sans-serif;">❌ No Early Access Discount</h4>
          <p style="color: #b91c1c !important; margin: 0; font-size: 14px; line-height: 1.4;">50% OFF launch pricing expires in ${daysLeft} days</p>
        </div>
        
        <div style="background: #fef2f2 !important; border-radius: 10px; padding: 16px; margin-bottom: 12px; border-left: 3px solid #ef4444;">
          <h4 style="color: #dc2626 !important; font-weight: 700; margin: 0 0 6px; font-size: 16px; font-family: 'Inter', sans-serif;">❌ No Priority Support</h4>
          <p style="color: #b91c1c !important; margin: 0; font-size: 14px; line-height: 1.4;">Waitlist members get dedicated support and feature requests</p>
        </div>
        
        <div style="background: #fef2f2 !important; border-radius: 10px; padding: 16px; margin-bottom: 0; border-left: 3px solid #ef4444;">
          <h4 style="color: #dc2626 !important; font-weight: 700; margin: 0 0 6px; font-size: 16px; font-family: 'Inter', sans-serif;">❌ No Bonus Modules</h4>
          <p style="color: #b91c1c !important; margin: 0; font-size: 14px; line-height: 1.4;">Exclusive modules only available to early subscribers</p>
        </div>
      </div>
      
      <!-- FOMO Section -->
      <div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%) !important; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
        <h3 style="color: white !important; margin: 0 0 16px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif;">🎯 Don't Let This Opportunity Slip Away</h3>
        <div style="color: #d1d5db !important; font-size: 15px; line-height: 1.6;">
          <div style="margin: 0 0 8px; font-weight: 600; color: #d1d5db !important;">⚡ <strong style="color: #d1d5db !important;">${totalSubscribers + 200} entrepreneurs</strong> are already on the waitlist</div>
          <div style="margin: 0 0 8px; font-weight: 600; color: #d1d5db !important;">💰 <strong style="color: #d1d5db !important;">50% discount</strong> expires in ${daysLeft} days</div>
          <div style="margin: 0; font-weight: 600; color: #d1d5db !important;">🚀 <strong style="color: #d1d5db !important;">7-day early access</strong> before public launch</div>
        </div>
      </div>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 24px;">
        <a href="https://liquidfy.app" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%) !important; color: white !important; text-decoration: none; padding: 18px 36px; border-radius: 10px; font-weight: 700; font-size: 18px; font-family: 'Inter', sans-serif; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);">
          🔥 SECURE YOUR SPOT NOW
        </a>
      </div>
      
      <!-- Countdown -->
      <div style="background: #fef2f2 !important; border-radius: 10px; padding: 16px; text-align: center; border: 2px solid #fecaca;">
        <p style="color: #dc2626 !important; margin: 0; font-size: 16px; font-weight: 700; font-family: 'Inter', sans-serif;">
          ⏰ Launch countdown: ${daysLeft} days, ${24 * daysLeft} hours, ${24 * 60 * daysLeft} minutes
        </p>
      </div>

    </div>
    
    <!-- Footer -->
    <div style="background: #f8fafc !important; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #64748b !important; margin: 0 0 8px; font-size: 14px; font-weight: 600;">
        This is your final reminder - Don't miss out! 🚀
      </p>
      <p style="color: #94a3b8 !important; margin: 0; font-size: 12px;">
        © 2024 Liquidfy. All rights reserved.<br>
        <a href="https://liquidfy.app" style="color: #111827 !important; text-decoration: none; font-weight: 600;">liquidfy.app</a>
      </p>
    </div>
  </div>
</body>
</html>
`

const LAUNCH_EMAIL_TEMPLATE = (email: string, totalSubscribers: number) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🚀 LIQUIDFY IS LIVE - Your Early Access Starts NOW!</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 10px; background: #f8fafc;">
  <div style="background: #ffffff !important; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e2e8f0; color-scheme: light !important;">
    
    <!-- Header with success gradient -->
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; padding: 32px 20px; text-align: center;">
      <div style="margin: 0 auto 18px; text-align: center;">
        <img src="https://liquidfy.app/LOGO.png" alt="Liquidfy Logo" style="width: 72px; height: 72px; border-radius: 16px; border: 2px solid rgba(255,255,255,0.2);">
      </div>
      <h1 style="color: white !important; margin: 0 0 10px; font-size: 40px; font-weight: 800; font-family: 'Inter', sans-serif; letter-spacing: -0.5px;">🚀 WE'RE LIVE!</h1>
      <p style="color: rgba(255,255,255,0.9) !important; margin: 0; font-size: 20px; font-weight: 500; line-height: 1.4;">Liquidfy is officially launched - Your early access starts NOW!</p>
    </div>
    
    <!-- Main content -->
    <div style="padding: 32px 20px;">
      
      <!-- Success badge -->
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; border-radius: 12px; padding: 20px; margin-bottom: 28px; text-align: center; border: 1px solid #059669;">
        <h2 style="color: white !important; margin: 0 0 8px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif;">🎉 CONGRATULATIONS!</h2>
        <p style="color: rgba(255,255,255,0.9) !important; margin: 0; line-height: 1.5; font-weight: 600; font-size: 16px;">You're subscriber #${totalSubscribers + 200} - Your early access is ACTIVE!</p>
      </div>
      
      <!-- Discount Code Section -->
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; border-radius: 12px; padding: 24px; margin-bottom: 28px; border-left: 4px solid #f59e0b;">
        <h3 style="color: #92400e !important; margin: 0 0 16px; font-size: 22px; font-weight: 700; font-family: 'Inter', sans-serif;">🎁 YOUR 50% LAUNCH DISCOUNT IS ACTIVE!</h3>
        <div style="background: #ffffff; border-radius: 8px; padding: 20px; border: 2px dashed #f59e0b; text-align: center; margin-bottom: 16px;">
          <p style="color: #92400e !important; margin: 0 0 8px; font-size: 18px; font-weight: 600;">Use Code:</p>
          <p style="color: #92400e !important; margin: 0 0 8px; font-size: 32px; font-weight: 800; font-family: 'Inter', sans-serif; letter-spacing: 2px;">EARLY50</p>
          <p style="color: #a16207 !important; margin: 0; font-size: 14px; font-weight: 600;">⏰ Valid for the next 48 hours only</p>
        </div>
        <p style="color: #a16207 !important; margin: 0; font-size: 16px; line-height: 1.6; font-weight: 600;">This exclusive discount is only available to waitlist members like you!</p>
      </div>
      
      <!-- What You Get Now -->
      <div style="margin-bottom: 28px;">
        <h3 style="color: #111827 !important; margin: 0 0 16px; font-size: 22px; font-weight: 700; font-family: 'Inter', sans-serif;">🎯 What You Get Access To Right Now</h3>
        
        <div style="background: #f0f9ff !important; border-radius: 10px; padding: 16px; margin-bottom: 12px; border-left: 3px solid #3b82f6;">
          <h4 style="color: #1e40af !important; font-weight: 700; margin: 0 0 6px; font-size: 16px; font-family: 'Inter', sans-serif;">🛒 100+ Premium Modules</h4>
          <p style="color: #1d4ed8 !important; margin: 0; font-size: 14px; line-height: 1.4;">Product carousels, comparison tables, trust badges, urgency timers, upsell widgets</p>
        </div>
        
        <div style="background: #f0f9ff !important; border-radius: 10px; padding: 16px; margin-bottom: 12px; border-left: 3px solid #3b82f6;">
          <h4 style="color: #1e40af !important; font-weight: 700; margin: 0 0 6px; font-size: 16px; font-family: 'Inter', sans-serif;">🎨 120+ Shopify Sections</h4>
          <p style="color: #1d4ed8 !important; margin: 0; font-size: 14px; line-height: 1.4;">Ready-to-use .liquid sections for any theme: hero banners, product grids, testimonials</p>
        </div>
        
        <div style="background: #f0f9ff !important; border-radius: 10px; padding: 16px; margin-bottom: 0; border-left: 3px solid #3b82f6;">
          <h4 style="color: #1e40af !important; font-weight: 700; margin: 0 0 6px; font-size: 16px; font-family: 'Inter', sans-serif;">💰 Revenue Optimization</h4>
          <p style="color: #1d4ed8 !important; margin: 0; font-size: 14px; line-height: 1.4;">Cart abandonment recovery, social proof widgets, discount displays</p>
        </div>
      </div>
      
      <!-- FOMO Section -->
      <div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%) !important; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
        <h3 style="color: white !important; margin: 0 0 16px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif;">⚡ Don't Wait - Others Are Already Getting Started</h3>
        <div style="color: #d1d5db !important; font-size: 15px; line-height: 1.6;">
          <div style="margin: 0 0 8px; font-weight: 600; color: #d1d5db !important;">🔥 <strong style="color: #d1d5db !important;">${totalSubscribers + 200} entrepreneurs</strong> are already upgrading their stores</div>
          <div style="margin: 0 0 8px; font-weight: 600; color: #d1d5db !important;">⏰ <strong style="color: #d1d5db !important;">48-hour discount</strong> expires soon</div>
          <div style="margin: 0; font-weight: 600; color: #d1d5db !important;">🚀 <strong style="color: #d1d5db !important;">7-day early access</strong> before public pricing</div>
        </div>
      </div>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 24px;">
        <a href="https://liquidfy.app/login" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; color: white !important; text-decoration: none; padding: 20px 40px; border-radius: 10px; font-weight: 700; font-size: 18px; font-family: 'Inter', sans-serif; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
          🎯 ACCESS LIQUIDFY NOW
        </a>
      </div>
      
      <!-- Urgency -->
      <div style="background: #fef2f2 !important; border-radius: 10px; padding: 16px; text-align: center; border: 2px solid #fecaca;">
        <p style="color: #dc2626 !important; margin: 0; font-size: 16px; font-weight: 700; font-family: 'Inter', sans-serif;">
          ⏰ 48-HOUR DISCOUNT EXPIRES SOON - ACT NOW!
        </p>
      </div>

    </div>
    
    <!-- Footer -->
    <div style="background: #f8fafc !important; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #64748b !important; margin: 0 0 8px; font-size: 14px; font-weight: 600;">
        Thank you for being part of this journey from day one! 🚀
      </p>
      <p style="color: #94a3b8 !important; margin: 0; font-size: 12px;">
        © 2024 Liquidfy. All rights reserved.<br>
        <a href="https://liquidfy.app" style="color: #111827 !important; text-decoration: none; font-weight: 600;">liquidfy.app</a>
      </p>
    </div>
  </div>
</body>
</html>
`

// Get all subscribers from database
async function getAllSubscribers() {
  const subscribers: string[] = []
  
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('subscribers')
        .select('email')
      
      if (data) {
        data.forEach((row: any) => subscribers.push(row.email))
      }
    } catch (error) {
      console.error('Error fetching subscribers from Supabase:', error)
    }
  } else if (sql) {
    try {
      const result = await sql`SELECT email FROM subscribers`
      result.rows.forEach((row: any) => subscribers.push(row.email))
    } catch (error) {
      console.error('Error fetching subscribers from SQL:', error)
    }
  }
  
  return subscribers
}

// Send email campaign
async function sendEmailCampaign(emails: string[], subject: string, htmlContent: string) {
  if (!resend) {
    throw new Error('Resend not configured')
  }

  const results = []
  const batchSize = 10 // Send in batches to avoid rate limits
  
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize)
    
    const promises = batch.map(async (email) => {
      try {
        const result = await resend.emails.send({
          from: 'Liquidfy Team <hello@liquidfy.app>',
          to: email,
          subject: subject,
          html: htmlContent,
        })
        return { email, success: true, id: result.data?.id }
      } catch (error: any) {
        return { email, success: false, error: error.message }
      }
    })
    
    const batchResults = await Promise.all(promises)
    results.push(...batchResults)
    
    // Wait between batches to avoid rate limits
    if (i + batchSize < emails.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  return results
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { campaignType, daysLeft } = body
    
    if (!campaignType) {
      return NextResponse.json(
        { message: 'Campaign type is required' },
        { status: 400 }
      )
    }
    
    // Get all subscribers
    const subscribers = await getAllSubscribers()
    
    if (subscribers.length === 0) {
      return NextResponse.json(
        { message: 'No subscribers found' },
        { status: 404 }
      )
    }
    
    let subject = ''
    let htmlContent = ''
    
    // Generate email content based on campaign type
    switch (campaignType) {
      case 'urgency':
        subject = `🚨 ${daysLeft || 3} Days Left - Liquidfy Launch Alert!`
        htmlContent = URGENCY_EMAIL_TEMPLATE('', subscribers.length, daysLeft || 3)
        break
        
      case 'launch':
        subject = '🚀 LIQUIDFY IS LIVE - Your Early Access Starts NOW!'
        htmlContent = LAUNCH_EMAIL_TEMPLATE('', subscribers.length)
        break
        
      default:
        return NextResponse.json(
          { message: 'Invalid campaign type. Use "urgency" or "launch"' },
          { status: 400 }
        )
    }
    
    // Send the campaign
    const results = await sendEmailCampaign(subscribers, subject, htmlContent)
    
    const successCount = results.filter(r => r.success).length
    const failureCount = results.filter(r => !r.success).length
    
    return NextResponse.json({
      message: `Campaign sent successfully`,
      totalSubscribers: subscribers.length,
      sent: successCount,
      failed: failureCount,
      results: results.slice(0, 10) // Return first 10 results for debugging
    })
    
  } catch (error: any) {
    console.error('Email campaign error:', error)
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access' },
        { status: 401 }
      )
    }

    const subscribers = await getAllSubscribers()
    
    return NextResponse.json({
      totalSubscribers: subscribers.length,
      subscribers: subscribers.slice(0, 10) // Return first 10 for debugging
    })
  } catch (error: any) {
    console.error('Get subscribers error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 