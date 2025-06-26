import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const { emailId } = await request.json()
    
    if (!resend) {
      return NextResponse.json(
        { error: 'Resend not configured' },
        { status: 500 }
      )
    }

    if (!emailId) {
      return NextResponse.json(
        { error: 'Email ID required' },
        { status: 400 }
      )
    }

    // Get email status from Resend
    try {
      const emailInfo = await resend.emails.get(emailId)
      
      return NextResponse.json({
        success: true,
        emailInfo,
        status: emailInfo?.data ? 'found' : 'not_found'
      })
    } catch (error: any) {
      return NextResponse.json({
        success: false,
        error: error.message,
        emailId
      })
    }

  } catch (error) {
    console.error('Verify email error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    if (!resend) {
      return NextResponse.json(
        { error: 'Resend not configured' },
        { status: 500 }
      )
    }

    // Simple health check
    return NextResponse.json({
      systemHealthy: true,
      message: 'Resend API is configured and ready'
    })
  } catch (error: any) {
    console.error('Get emails error:', error)
    return NextResponse.json({
      error: error.message,
      systemHealthy: false
    })
  }
} 