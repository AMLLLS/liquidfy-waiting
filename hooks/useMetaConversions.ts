'use client'

import { useCallback } from 'react'

interface MetaConversionEvent {
  eventName: string
  email?: string
  userAgent?: string
  eventSourceUrl?: string
  customData?: {
    currency?: string
    value?: string
    content_name?: string
    content_category?: string
    content_type?: string
    content_ids?: string[]
  }
}

export function useMetaConversions() {
  const sendEvent = useCallback(async (event: MetaConversionEvent) => {
    try {
      const response = await fetch('/api/meta-conversions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          userAgent: event.userAgent || navigator.userAgent,
          eventSourceUrl: event.eventSourceUrl || window.location.href,
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        console.log('✅ Meta Conversions API Event sent:', event.eventName, result)
        return { success: true, data: result }
      } else {
        console.error('❌ Meta Conversions API Event failed:', event.eventName, result)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('❌ Meta Conversions API Error:', error)
      return { success: false, error }
    }
  }, [])

  // Predefined event functions
  const trackPageView = useCallback((email?: string) => {
    return sendEvent({
      eventName: 'PageView',
      email,
      customData: {
        content_name: 'Liquidfy Landing Page',
        content_category: 'Landing Page',
        content_type: 'website'
      }
    })
  }, [sendEvent])

  const trackEmailFormStart = useCallback((email?: string) => {
    return sendEvent({
      eventName: 'EmailFormStart',
      email,
      customData: {
        content_name: 'Email Form',
        content_category: 'Lead Generation',
        content_type: 'form'
      }
    })
  }, [sendEvent])

  const trackEmailFormError = useCallback((error: string, email?: string) => {
    return sendEvent({
      eventName: 'EmailFormError',
      email,
      customData: {
        content_name: 'Email Form Error',
        content_category: 'Error',
        content_type: 'form',
        value: '0'
      }
    })
  }, [sendEvent])

  const trackCompleteRegistration = useCallback((email: string) => {
    return sendEvent({
      eventName: 'CompleteRegistration',
      email,
      customData: {
        content_name: 'Email Registration',
        content_category: 'Lead Generation',
        content_type: 'registration',
        value: '99.00',
        currency: 'USD'
      }
    })
  }, [sendEvent])

  const trackLead = useCallback((email: string) => {
    return sendEvent({
      eventName: 'Lead',
      email,
      customData: {
        content_name: 'Early Access Lead',
        content_category: 'Lead Generation',
        content_type: 'lead',
        value: '99.00',
        currency: 'USD'
      }
    })
  }, [sendEvent])

  const trackContentView = useCallback((contentName: string, email?: string) => {
    return sendEvent({
      eventName: 'ViewContent',
      email,
      customData: {
        content_name: contentName,
        content_category: 'Content',
        content_type: 'product'
      }
    })
  }, [sendEvent])

  const trackScrollDepth = useCallback((depth: number, email?: string) => {
    return sendEvent({
      eventName: 'ScrollDepth',
      email,
      customData: {
        content_name: 'Page Scroll',
        content_category: 'Engagement',
        content_type: 'scroll',
        value: depth.toString()
      }
    })
  }, [sendEvent])

  const trackProspect = useCallback((email: string) => {
    return sendEvent({
      eventName: 'Prospect',
      email,
      customData: {
        content_name: 'Early Access Prospect',
        content_category: 'Lead Generation',
        content_type: 'prospect',
        value: '99.00',
        currency: 'USD'
      }
    })
  }, [sendEvent])

  return {
    sendEvent,
    trackPageView,
    trackEmailFormStart,
    trackEmailFormError,
    trackCompleteRegistration,
    trackLead,
    trackContentView,
    trackScrollDepth,
    trackProspect
  }
} 