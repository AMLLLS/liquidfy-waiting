import { useEffect } from 'react'
import { META_PIXEL_CONFIG, isPixelConfigured } from '../lib/meta-pixel'

// Déclaration des types pour Facebook Pixel
declare global {
  interface Window {
    fbq: (...args: any[]) => void
  }
}

export const useMetaPixel = () => {
  // Vérifier si le pixel est chargé
  const isPixelLoaded = () => {
    return typeof window !== 'undefined' && window.fbq
  }

  // Événement personnalisé générique
  const track = (eventName: string, parameters?: Record<string, any>) => {
    console.log(`🔍 TRACK DEBUG - Event: ${eventName}`)
    console.log(`🔍 TRACK DEBUG - Pixel Loaded: ${isPixelLoaded()}`)
    console.log(`🔍 TRACK DEBUG - Pixel Configured: ${isPixelConfigured()}`)
    console.log(`🔍 TRACK DEBUG - Window.fbq exists: ${typeof window !== 'undefined' && !!window.fbq}`)
    
    if (isPixelLoaded()) {
      // Vérifier si le pixel est configuré
      if (!isPixelConfigured()) {
        console.warn('⚠️ Meta Pixel not configured! Replace YOUR_PIXEL_ID_HERE with your real Pixel ID')
        return
      }
      
      // Merger avec les paramètres par défaut
      const finalParams = { ...META_PIXEL_CONFIG.DEFAULT_PARAMS, ...parameters }
      
      console.log(`🔍 TRACK DEBUG - About to call fbq('track', '${eventName}', finalParams)`)
      window.fbq('track', eventName, finalParams)
      console.log(`📊 Meta Pixel: ${eventName}`, finalParams)
    } else {
      console.error('❌ Meta Pixel not loaded! Cannot track event:', eventName)
    }
  }

  // Événement personnalisé avec nom custom
  const trackCustom = (eventName: string, parameters?: Record<string, any>) => {
    console.log(`🔍 TRACK CUSTOM DEBUG - Event: ${eventName}`)
    
    if (isPixelLoaded()) {
      if (!isPixelConfigured()) {
        console.warn('⚠️ Meta Pixel not configured! Replace YOUR_PIXEL_ID_HERE with your real Pixel ID')
        return
      }
      
      const finalParams = { ...META_PIXEL_CONFIG.DEFAULT_PARAMS, ...parameters }
      
      console.log(`🔍 TRACK CUSTOM DEBUG - About to call fbq('trackCustom', '${eventName}', finalParams)`)
      window.fbq('trackCustom', eventName, finalParams)
      console.log(`📊 Meta Pixel Custom: ${eventName}`, finalParams)
    } else {
      console.error('❌ Meta Pixel not loaded! Cannot track custom event:', eventName)
    }
  }

  // Événements spécifiques pour Liquidfy
  const trackViewContent = (contentName?: string) => {
    track('ViewContent', {
      content_name: contentName || 'Liquidfy Landing Page',
      content_category: 'SaaS Landing Page'
    })
  }

  const trackLead = (email?: string) => {
    track('Lead', {
      content_name: 'Liquidfy Waitlist Signup',
      content_category: 'Email Signup',
      value: 1,
      currency: 'USD'
    })
  }

  const trackCompleteRegistration = (email?: string) => {
    track('CompleteRegistration', {
      content_name: 'Liquidfy Early Access',
      registration_method: 'email',
      value: 1,
      currency: 'USD'
    })
  }

  const trackInitiateCheckout = () => {
    track('InitiateCheckout', {
      content_name: 'Liquidfy Interest',
      content_category: 'SaaS Product',
      value: 1,
      currency: 'USD'
    })
  }

  // Événements personnalisés Liquidfy
  const trackScrollDepth = (percentage: number) => {
    trackCustom('ScrollDepth', {
      scroll_percentage: percentage,
      page_type: 'landing_page'
    })
  }

  const trackFeatureView = (featureName: string) => {
    trackCustom('FeatureView', {
      feature_name: featureName,
      page_section: 'features'
    })
  }

  const trackEmailFormStart = () => {
    trackCustom('EmailFormStart', {
      form_location: 'main_cta',
      page_type: 'landing_page'
    })
  }

  const trackEmailFormError = (errorType: string) => {
    trackCustom('EmailFormError', {
      error_type: errorType,
      form_location: 'main_cta'
    })
  }

  return {
    track,
    trackCustom,
    trackViewContent,
    trackLead,
    trackCompleteRegistration,
    trackInitiateCheckout,
    trackScrollDepth,
    trackFeatureView,
    trackEmailFormStart,
    trackEmailFormError,
    isPixelLoaded
  }
} 