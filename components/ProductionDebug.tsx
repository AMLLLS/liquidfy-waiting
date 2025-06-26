'use client'

import { useState } from 'react'

interface DebugInfo {
  emailStatus?: string
  emailError?: string
  emailId?: string
  hasResend?: boolean
  hasApiKey?: boolean
  isNew?: boolean
}

interface ProductionDebugProps {
  debugInfo: DebugInfo | null
}

export default function ProductionDebug({ debugInfo }: ProductionDebugProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!debugInfo) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
        title="Email Debug Info"
      >
        🐛
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white text-black p-4 rounded-lg shadow-xl border min-w-80 max-w-sm">
          <h3 className="font-bold mb-2">🔍 Email Debug</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={`font-mono ${
                debugInfo.emailStatus === 'sent' ? 'text-green-600' :
                debugInfo.emailStatus === 'failed' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {debugInfo.emailStatus || 'unknown'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Resend:</span>
              <span className={debugInfo.hasResend ? 'text-green-600' : 'text-red-600'}>
                {debugInfo.hasResend ? '✅' : '❌'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>API Key:</span>
              <span className={debugInfo.hasApiKey ? 'text-green-600' : 'text-red-600'}>
                {debugInfo.hasApiKey ? '✅' : '❌'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>New User:</span>
              <span className={debugInfo.isNew ? 'text-green-600' : 'text-yellow-600'}>
                {debugInfo.isNew ? '✅' : '🔄'}
              </span>
            </div>
            
            {debugInfo.emailId && (
              <div className="pt-2 border-t">
                <span className="text-xs text-gray-600">Email ID:</span>
                <div className="font-mono text-xs break-all">{debugInfo.emailId}</div>
              </div>
            )}
            
            {debugInfo.emailError && (
              <div className="pt-2 border-t">
                <span className="text-xs text-red-600">Error:</span>
                <div className="text-xs text-red-700 break-words">{debugInfo.emailError}</div>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
} 