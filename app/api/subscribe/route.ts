import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// In-memory storage for demo (use a real database in production)
let subscribers: string[] = []

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

    // Check if email already exists
    if (subscribers.includes(email)) {
      return NextResponse.json(
        { message: 'Email already subscribed!' },
        { status: 400 }
      )
    }

    // Add to subscribers list
    subscribers.push(email)

    // Send welcome email using Resend (optional)
    if (resend && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Liquify <hello@liquidfy.app>',
          to: email,
          subject: '🎉 Welcome to Liquify - You\'re on the list!',
          html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%); border-radius: 16px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 24px; font-weight: bold;">L</span>
                </div>
                <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: 800;">Welcome to Liquify!</h1>
              </div>
              
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                <h2 style="color: #4f46e5; margin: 0 0 15px 0; font-size: 20px; font-weight: 700;">🎊 You're officially on the waitlist!</h2>
                <p style="color: #6b7280; margin: 0; line-height: 1.6;">
                  Thank you for joining the exclusive Liquify waitlist! You're now part of an elite group that will get first access to the #1 Ecom Library with 150+ Add-Ons to boost your CVR.
                </p>
              </div>
              
              <div style="margin-bottom: 30px;">
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">What's coming:</h3>
                <ul style="color: #6b7280; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>🚀 <strong>150+ Premium Modules</strong> - Unique Shopify components</li>
                  <li>⚡ <strong>1-Click Installation</strong> - Simple and fast setup</li>
                  <li>🎨 <strong>100% Customizable</strong> - Adapt to your brand</li>
                  <li>📈 <strong>Proven Results</strong> - +27% conversion rate increase</li>
                  <li>🔄 <strong>Lifetime Updates</strong> - Always stay current</li>
                </ul>
              </div>
              
              <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 30px;">
                <p style="color: white; margin: 0; font-weight: 600;">🎁 Early Bird Bonus</p>
                <p style="color: #e0e7ff; margin: 5px 0 0 0; font-size: 14px;">As a waitlist member, you'll get exclusive access and special pricing when we launch!</p>
              </div>
              
              <div style="text-align: center; color: #9ca3af; font-size: 14px;">
                <p style="margin: 0;">Stay tuned for updates - we're launching very soon!</p>
                <p style="margin: 10px 0 0 0;">
                  <a href="https://liquidfy.app" style="color: #4f46e5; text-decoration: none;">Visit liquidfy.app</a>
                </p>
              </div>
            </div>
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
        totalSubscribers: subscribers.length 
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
  return NextResponse.json({
    totalSubscribers: subscribers.length,
    message: 'Liquify waitlist API'
  })
} 