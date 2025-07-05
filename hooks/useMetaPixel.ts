import { useEffect } from 'react'
import { META_PIXEL_CONFIG, isPixelConfigured } from '../lib/meta-pixel'
import { useMetaConversions } from './useMetaConversions'

// Déclaration des types pour Facebook Pixel
declare global {
  interface Window {
    fbq: (...args: any[]) => void
  }
}

export const useMetaPixel = () => {
  // Initialize Meta Conversions API
  const metaConversions = useMetaConversions()
  
  // Vérifier si le pixel est chargé
  const isPixelLoaded = () => {
    return typeof window !== 'undefined' && window.fbq
  }

  // Événement personnalisé générique
  const track = (eventName: string, parameters?: Record<string, any>) => {
    if (isPixelLoaded()) {
      // Vérifier si le pixel est configuré
      if (!isPixelConfigured()) {
        console.warn('⚠️ Meta Pixel not configured! Replace YOUR_PIXEL_ID_HERE with your real Pixel ID')
        return
      }
      
      // Merger avec les paramètres par défaut
      const finalParams = { ...META_PIXEL_CONFIG.DEFAULT_PARAMS, ...parameters }
      
      window.fbq('track', eventName, finalParams)
      
      // Log simplifié pour production
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 Meta Pixel: ${eventName}`, finalParams)
      }
    }
  }

  // Événement personnalisé avec nom custom
  const trackCustom = (eventName: string, parameters?: Record<string, any>) => {
    if (isPixelLoaded()) {
      if (!isPixelConfigured()) {
        console.warn('⚠️ Meta Pixel not configured! Replace YOUR_PIXEL_ID_HERE with your real Pixel ID')
        return
      }
      
      const finalParams = { ...META_PIXEL_CONFIG.DEFAULT_PARAMS, ...parameters }
      
      window.fbq('trackCustom', eventName, finalParams)
      
      // Log simplifié pour production
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 Meta Pixel Custom: ${eventName}`, finalParams)
      }
    }
  }

  // Événements spécifiques pour Liquidfy
  const trackViewContent = (contentName?: string) => {
    track('ViewContent', {
      content_name: contentName || 'Liquidfy Landing Page',
      content_category: 'SaaS Landing Page'
    })
    
    // Also send to Meta Conversions API
    metaConversions.trackContentView(contentName || 'Liquidfy Landing Page')
  }

  const trackLead = (email?: string) => {
    track('Lead', {
      content_name: 'Liquidfy Waitlist Signup',
      content_category: 'Email Signup',
      value: 1,
      currency: 'USD'
    })
    
    // Also send to Meta Conversions API
    if (email) {
      metaConversions.trackLead(email)
    }
  }

  const trackCompleteRegistration = (email?: string) => {
    track('CompleteRegistration', {
      content_name: 'Liquidfy Early Access',
      registration_method: 'email',
      value: 1,
      currency: 'USD'
    })
    
    // Also send to Meta Conversions API
    if (email) {
      metaConversions.trackCompleteRegistration(email)
    }
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
    
    // Also send to Meta Conversions API
    metaConversions.trackScrollDepth(percentage)
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
    
    // Also send to Meta Conversions API
    metaConversions.trackEmailFormStart()
  }

  const trackEmailFormError = (errorType: string) => {
    trackCustom('EmailFormError', {
      error_type: errorType,
      form_location: 'main_cta'
    })
    
    // Also send to Meta Conversions API
    metaConversions.trackEmailFormError(errorType)
  }

  const trackProspect = (email?: string) => {
    track('Lead', {
      content_name: 'Liquidfy Prospect',
      content_category: 'Prospect',
      value: 1,
      currency: 'USD'
    })
    
    // Also send to Meta Conversions API
    if (email) {
      metaConversions.trackProspect(email)
    }
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
    trackProspect,
    isPixelLoaded
  }
} 