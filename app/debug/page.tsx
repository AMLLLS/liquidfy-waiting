'use client'

import { useState } from 'react'

export default function DebugPage() {
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('test@example.com')

  const testEmailAPI = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await res.json()
      setResponse(data)
    } catch (error) {
      setResponse({ error: error instanceof Error ? error.message : String(error) })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Debug Email API</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Email Subscription</h2>
          
          <div className="flex gap-4 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email to test"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={testEmailAPI}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test API'}
            </button>
          </div>
        </div>

        {response && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">API Response</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
            
            {response.debug && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">🔍 Debug Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700">Resend Instance</div>
                    <div className={`text-sm ${response.debug.hasResend ? 'text-green-600' : 'text-red-600'}`}>
                      {response.debug.hasResend ? '✅ Available' : '❌ Missing'}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700">API Key</div>
                    <div className={`text-sm ${response.debug.hasApiKey ? 'text-green-600' : 'text-red-600'}`}>
                      {response.debug.hasApiKey ? `✅ ${response.debug.apiKeyPrefix}` : '❌ Missing'}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700">New Subscriber</div>
                    <div className={`text-sm ${response.debug.isNew ? 'text-green-600' : 'text-yellow-600'}`}>
                      {response.debug.isNew ? '✅ Yes' : '⚠️ Duplicate'}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700">Email Status</div>
                    <div className={`text-sm ${
                      response.debug.emailStatus === 'sent' ? 'text-green-600' :
                      response.debug.emailStatus === 'failed' ? 'text-red-600' :
                      response.debug.emailStatus === 'attempting' ? 'text-blue-600' :
                      'text-yellow-600'
                    }`}>
                      {response.debug.emailStatus === 'sent' ? '✅ Sent' :
                       response.debug.emailStatus === 'failed' ? '❌ Failed' :
                       response.debug.emailStatus === 'attempting' ? '🔄 Attempting' :
                       response.debug.emailStatus === 'no_api_key' ? '⚠️ No API Key' :
                       response.debug.emailStatus === 'no_resend_instance' ? '⚠️ No Resend' :
                       response.debug.emailStatus === 'not_new_subscriber' ? '⚠️ Not New' :
                       '❌ Not Attempted'}
                    </div>
                  </div>
                </div>
                
                {response.debug.emailError && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded p-4">
                    <div className="font-medium text-red-800">Email Error:</div>
                    <div className="text-red-700 text-sm mt-1">{response.debug.emailError}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-yellow-800 mb-2">📝 Instructions</h3>
          <ol className="text-yellow-700 text-sm space-y-1">
            <li>1. Entrez un email et cliquez "Test API"</li>
            <li>2. Vérifiez les informations de debug</li>
            <li>3. Si "Email Status" est "Failed", regardez l'erreur</li>
            <li>4. Si "Email Status" est "Sent", vérifiez votre boîte mail</li>
            <li>5. Vérifiez aussi le dashboard Resend pour voir si l'email apparaît</li>
          </ol>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-blue-800 mb-2">🔧 Troubleshooting</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Si "No API Key" → Vérifiez RESEND_API_KEY dans .env.local</li>
            <li>• Si "No Resend" → Problème d'import/configuration</li>
            <li>• Si "Failed" avec erreur → Regardez le message d'erreur spécifique</li>
            <li>• Si "Sent" mais pas reçu → Vérifiez spam + dashboard Resend</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 