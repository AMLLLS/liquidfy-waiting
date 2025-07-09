import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { getAuthHeaders } from '@/lib/admin-config'
import { getTemplateById, renderTemplate } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface CampaignRequest {
  templateId: string
  customHtml?: string
  subject?: string
  variables?: Record<string, any>
  recipientCount?: number
}

interface CampaignResult {
  email: string
  success: boolean
  id?: string
  error?: string
}

interface CampaignResponse {
  message: string
  totalSubscribers: number
  sent: number
  failed: number
  results: CampaignResult[]
}

// Verify authentication
function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('x-admin-password')
  return authHeader === process.env.ADMIN_PASSWORD
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get total subscribers count
    const { count, error } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })

    if (error) {
      throw error
    }

    return NextResponse.json({
      message: 'Subscribers retrieved successfully',
      totalSubscribers: count || 0
    })
  } catch (error) {
    console.error('Error getting subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to get subscribers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body: CampaignRequest = await request.json()
    const { templateId, customHtml, subject, variables = {}, recipientCount } = body

    // Validate template
    const template = getTemplateById(templateId)
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 400 }
      )
    }

    // Get subscribers from database
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email')
      .limit(recipientCount || 1000)

    if (error) {
      throw error
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No subscribers found' },
        { status: 400 }
      )
    }

    // Prepare campaign data
    const campaignData = {
      totalSubscribers: subscribers.length,
      ...variables
    }

    // Generate email content
    const emailHtml = customHtml || template.html(campaignData)
    const emailSubject = subject || template.subject

    // Send emails in batches
    const batchSize = 10
    const results: CampaignResult[] = []
    let sent = 0
    let failed = 0

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize)
      
      const batchPromises = batch.map(async (subscriber) => {
        try {
          const { data, error } = await resend.emails.send({
            from: 'Liquidfy <noreply@liquidfy.app>',
            to: subscriber.email,
            subject: emailSubject,
            html: emailHtml,
          })

          if (error) {
            failed++
            return {
              email: subscriber.email,
              success: false,
              error: error.message
            }
          }

          sent++
          return {
            email: subscriber.email,
            success: true,
            id: data?.id
          }
        } catch (error: any) {
          failed++
          return {
            email: subscriber.email,
            success: false,
            error: error.message
          }
        }
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)

      // Add delay between batches to avoid rate limiting
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    // Log campaign to database
    try {
      await supabase
        .from('email_campaigns')
        .insert({
          template_id: templateId,
          subject: emailSubject,
          recipient_count: subscribers.length,
          sent_count: sent,
          failed_count: failed,
          status: 'completed',
          sent_at: new Date().toISOString()
        })
    } catch (dbError) {
      console.error('Error logging campaign to database:', dbError)
      // Don't fail the entire request if logging fails
    }

    const response: CampaignResponse = {
      message: `Campaign sent successfully. ${sent} emails sent, ${failed} failed.`,
      totalSubscribers: subscribers.length,
      sent,
      failed,
      results
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error sending campaign:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send campaign' },
      { status: 500 }
    )
  }
} 