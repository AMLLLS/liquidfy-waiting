'use client'

import { useState } from 'react'
import { getAuthHeaders } from '../lib/admin-config'

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

export default function EmailCampaignManager() {
  const [campaignType, setCampaignType] = useState<'urgency' | 'launch'>('urgency')
  const [daysLeft, setDaysLeft] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CampaignResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sendCampaign = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/email-campaign', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          campaignType,
          daysLeft: campaignType === 'urgency' ? daysLeft : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send campaign')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getSubscribers = async () => {
    try {
      const response = await fetch('/api/email-campaign', {
        headers: getAuthHeaders(),
      })
      const data = await response.json()
      
      if (response.ok) {
        setResult({
          message: 'Subscribers retrieved successfully',
          totalSubscribers: data.totalSubscribers,
          sent: 0,
          failed: 0,
          results: []
        })
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📧 Email Campaign Manager</h1>
        <p className="text-gray-600">Send strategic email campaigns to convert your waitlist into customers</p>
      </div>

      {/* Campaign Configuration */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaign Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Type
            </label>
            <select
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value as 'urgency' | 'launch')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="urgency">🚨 Urgency Campaign (3-4 days before launch)</option>
              <option value="launch">🚀 Launch Campaign (Day of launch)</option>
            </select>
          </div>

          {/* Days Left (only for urgency campaign) */}
          {campaignType === 'urgency' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days Until Launch
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={daysLeft}
                onChange={(e) => setDaysLeft(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          )}
        </div>

        {/* Campaign Preview */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Campaign Preview</h3>
          <div className="text-sm text-gray-600">
            {campaignType === 'urgency' ? (
              <div>
                <p><strong>Subject:</strong> 🚨 {daysLeft} Days Left - Liquidfy Launch Alert!</p>
                <p><strong>Content:</strong> Urgency email with social proof, FOMO elements, and countdown timer</p>
                <p><strong>Goal:</strong> Create urgency and drive pre-launch engagement</p>
              </div>
            ) : (
              <div>
                <p><strong>Subject:</strong> 🚀 LIQUIDFY IS LIVE - Your Early Access Starts NOW!</p>
                <p><strong>Content:</strong> Launch announcement with discount code, benefits, and strong CTA</p>
                <p><strong>Goal:</strong> Convert waitlist members into paying customers</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={getSubscribers}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          📊 Check Subscriber Count
        </button>
        
        <button
          onClick={sendCampaign}
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Campaign...
            </span>
          ) : (
            `📧 Send ${campaignType === 'urgency' ? 'Urgency' : 'Launch'} Campaign`
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">Campaign Results</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-600">{result.totalSubscribers}</div>
              <div className="text-sm text-green-700">Total Subscribers</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-600">{result.sent}</div>
              <div className="text-sm text-green-700">Emails Sent</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-red-600">{result.failed}</div>
              <div className="text-sm text-red-700">Failed</div>
            </div>
          </div>

          {result.results.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-green-800 mb-2">Recent Results:</h4>
              <div className="bg-white rounded-lg border border-green-200 max-h-40 overflow-y-auto">
                {result.results.map((item, index) => (
                  <div key={index} className="p-3 border-b border-green-100 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 truncate">{item.email}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.success 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.success ? 'Sent' : 'Failed'}
                      </span>
                    </div>
                    {item.error && (
                      <div className="text-xs text-red-600 mt-1">{item.error}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Campaign Strategy Tips */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">🎯 Campaign Strategy</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span><strong>Urgency Campaign:</strong> Send 3-4 days before launch to create FOMO and social proof</span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span><strong>Launch Campaign:</strong> Send on launch day with discount code and immediate CTA</span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span><strong>Timing:</strong> Best sent between 9 AM - 11 AM or 2 PM - 4 PM in your target timezone</span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span><strong>Follow-up:</strong> Monitor open rates and consider a follow-up email for non-openers</span>
          </div>
        </div>
      </div>
    </div>
  )
} 