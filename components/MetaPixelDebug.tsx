'use client'

import { useState, useEffect } from 'react'
import { useMetaPixel } from '../hooks/useMetaPixel'
import { isPixelConfigured, PIXEL_SETUP_INSTRUCTIONS } from '../lib/meta-pixel'

export const MetaPixelDebug = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [events, setEvents] = useState<string[]>([])
  const { 
    isPixelLoaded, 
    trackViewContent, 
    trackLead, 
    trackCompleteRegistration,
    trackEmailFormStart,
    trackScrollDepth,
    trackFeatureView
  } = useMetaPixel()

  // Debug mode activé uniquement en développement
  const isDevelopment = process.env.NODE_ENV === 'development'

  useEffect(() => {
    if (!isDevelopment) return
    
    // Afficher automatiquement si le pixel n'est pas configuré
    if (!isPixelConfigured()) {
      setIsVisible(true)
    }

    // Log initial status
    console.log('🎯 Meta Pixel Debug Status:')
    console.log('- Pixel Loaded:', isPixelLoaded())
    console.log('- Pixel Configured:', isPixelConfigured())
    console.log('- Environment:', process.env.NODE_ENV)
  }, [isDevelopment, isPixelLoaded])

  const addEvent = (eventName: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setEvents(prev => [`${timestamp} - ${eventName}`, ...prev.slice(0, 9)])
  }

  const testEvents = [
    { name: 'View Content', action: () => { trackViewContent('Debug Test'); addEvent('ViewContent (Debug)') }},
    { name: 'Lead', action: () => { trackLead('debug@test.com'); addEvent('Lead (Debug)') }},
    { name: 'Registration', action: () => { trackCompleteRegistration('debug@test.com'); addEvent('CompleteRegistration (Debug)') }},
    { name: 'Form Start', action: () => { trackEmailFormStart(); addEvent('EmailFormStart (Debug)') }},
    { name: 'Scroll 50%', action: () => { trackScrollDepth(50); addEvent('ScrollDepth 50% (Debug)') }},
    { name: 'Feature View', action: () => { trackFeatureView('Debug Feature'); addEvent('FeatureView (Debug)') }}
  ]

  if (!isDevelopment && isPixelConfigured()) {
    return null // Ne pas afficher en production si tout est OK
  }

  return (
    <>
      {/* Bouton toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            isPixelConfigured() 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
          }`}
        >
          📊 Meta Pixel {isPixelConfigured() ? '✅' : '⚠️'}
        </button>
      </div>

      {/* Panel de debug */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                📊 Meta Pixel Debug Console
                {isPixelConfigured() ? (
                  <span className="text-green-400 text-sm">✅ Configured</span>
                ) : (
                  <span className="text-red-400 text-sm">⚠️ Not Configured</span>
                )}
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-96">
              {/* Status */}
              <div className="bg-gray-800 rounded-lg p-3">
                <h4 className="text-white font-medium mb-2">Status</h4>
                <div className="text-sm space-y-1">
                  <div className={`${isPixelLoaded() ? 'text-green-400' : 'text-red-400'}`}>
                    {isPixelLoaded() ? '✅' : '❌'} Pixel Loaded: {isPixelLoaded() ? 'Yes' : 'No'}
                  </div>
                  <div className={`${isPixelConfigured() ? 'text-green-400' : 'text-red-400'}`}>
                    {isPixelConfigured() ? '✅' : '❌'} Pixel Configured: {isPixelConfigured() ? 'Yes' : 'No'}
                  </div>
                  <div className="text-gray-400">
                    🌍 Environment: {process.env.NODE_ENV}
                  </div>
                </div>
              </div>

              {/* Configuration Warning */}
              {!isPixelConfigured() && (
                <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3">
                  <h4 className="text-red-400 font-medium mb-2">⚠️ Configuration Required</h4>
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap overflow-x-auto">
                    {PIXEL_SETUP_INSTRUCTIONS}
                  </pre>
                </div>
              )}

              {/* Test Events */}
              <div className="bg-gray-800 rounded-lg p-3">
                <h4 className="text-white font-medium mb-3">Test Events</h4>
                <div className="grid grid-cols-2 gap-2">
                  {testEvents.map((event, index) => (
                    <button
                      key={index}
                      onClick={event.action}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded transition-colors"
                      disabled={!isPixelLoaded()}
                    >
                      {event.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Events */}
              <div className="bg-gray-800 rounded-lg p-3">
                <h4 className="text-white font-medium mb-2">Recent Events</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {events.length === 0 ? (
                    <div className="text-gray-500 text-sm">No events fired yet</div>
                  ) : (
                    events.map((event, index) => (
                      <div key={index} className="text-green-400 text-xs font-mono">
                        {event}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MetaPixelDebug 