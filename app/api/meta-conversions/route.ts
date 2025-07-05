import { NextRequest, NextResponse } from 'next/server'

// Meta Conversions API Configuration
const META_ACCESS_TOKEN = 'EAAMTtSZBdsmcBPNk80nwzLuL9Uh5zYm1ujt47fxyzTsylqXBFPgi0VyU8ded6WrssWjZCWRRzisRaalV0a7Hn4WtZASOUblIimYGURsN3XBjB8N8Y4kc2bIyteRGZBDDKHgJbbT2iMlfNADy9hZACOi2AyRyZBofdVVc3CAoAHFvJNAG10dqhudL0LwYutpwZDZD'
const PIXEL_ID = '720945630867893' // Liquidfy Meta Pixel ID
const API_VERSION = 'v18.0'

// Utility function to hash email for privacy
function hashEmail(email: string): string {
  const crypto = require('crypto')
  return crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex')
}

// Utility function to get current timestamp
function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000)
}

// Interface for event data
interface EventData {
  event_name: string
  event_time: number
  action_source: string
  user_data: {
    em?: string[]
    ph?: string[]
    client_user_agent?: string
  }
  custom_data?: {
    currency?: string
    value?: string
    content_name?: string
    content_category?: string
    content_type?: string
    content_ids?: string[]
  }
  event_source_url?: string
}

// Function to send event to Meta Conversions API
async function sendEventToMeta(eventData: EventData) {
  try {
    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`
    
    const payload = {
      data: [eventData]
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Meta Conversions API Error:', errorData)
      return { success: false, error: errorData }
    }

    const result = await response.json()
    console.log('Meta Conversions API Success:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Meta Conversions API Error:', error)
    return { success: false, error: error }
  }
}

// POST handler for Meta Conversions API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventName, email, userAgent, eventSourceUrl, customData } = body

    // Validate required fields
    if (!eventName) {
      return NextResponse.json({ error: 'eventName is required' }, { status: 400 })
    }

    // Prepare user data
    const userData: any = {
      client_user_agent: userAgent || request.headers.get('user-agent') || ''
    }

    // Add email if provided
    if (email) {
      userData.em = [hashEmail(email)]
    }

    // Prepare event data
    const eventData: EventData = {
      event_name: eventName,
      event_time: getCurrentTimestamp(),
      action_source: 'website',
      user_data: userData,
      event_source_url: eventSourceUrl || request.headers.get('referer') || 'https://liquidfy.app'
    }

    // Add custom data if provided
    if (customData) {
      eventData.custom_data = customData
    }

    // Send event to Meta
    const result = await sendEventToMeta(eventData)

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: `Event ${eventName} sent successfully to Meta Conversions API`,
        metaResponse: result.data 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to send event to Meta Conversions API',
        details: result.error 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Meta Conversions API Route Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

// GET handler for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Meta Conversions API is running',
    pixelId: PIXEL_ID,
    apiVersion: API_VERSION
  })
} 