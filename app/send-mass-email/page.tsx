'use client';

import { useState } from 'react';

export default function MassEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailList, setEmailList] = useState('');
  const [result, setResult] = useState<{ 
    success: boolean; 
    message: string; 
    totalSent?: number;
    totalErrors?: number;
    results?: Array<{email: string, id: string}>;
    errors?: Array<{email: string, error: string}>;
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSendMassEmail = async () => {
    // Validate email list
    const emails = emailList.split('\n').map(email => email.trim()).filter(email => email.length > 0);
    
    if (emails.length === 0) {
      setResult({ 
        success: false, 
        message: '❌ Please enter at least one email address' 
      });
      return;
    }

    setShowConfirmation(true);
  };

  const confirmSend = async () => {
    setIsLoading(true);
    setShowConfirmation(false);
    setResult(null);

    try {
      // Parse email list
      const emails = emailList.split('\n').map(email => email.trim()).filter(email => email.length > 0);
      
      const response = await fetch('/api/send-mass-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailList: emails
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ 
          success: true, 
          message: `✅ Sending complete: ${data.totalSent} successes, ${data.totalErrors} errors`,
          totalSent: data.totalSent,
          totalErrors: data.totalErrors,
          results: data.results,
          errors: data.errors
        });
      } else {
        setResult({ 
          success: false, 
          message: `❌ Error: ${data.error || 'Could not send email'}` 
        });
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: '❌ Connection error. Please check your internet connection.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSend = () => {
    setShowConfirmation(false);
  };

  const loadSampleEmails = () => {
    setEmailList(`amael.lelaisant@gmail.com
patrice.lelaisant@gmail.com
test@example.com`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">📧 Early Bird Launch - Mass Email</h1>
          <p className="text-gray-600">
            Send the exclusive Early Bird launch email to all selected subscribers
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-medium text-yellow-900 mb-2">⚠️ Warning</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• This will send the Early Bird launch email to ALL listed addresses</li>
              <li>• Irreversible action</li>
              <li>• Double-check the template and code before sending</li>
              <li>• Make sure your list is correct</li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📧 Email list (one per line)
            </label>
            <textarea
              value={emailList}
              onChange={(e) => setEmailList(e.target.value)}
              placeholder="amael.lelaisant@gmail.com&#10;patrice.lelaisant@gmail.com&#10;..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="mt-2 flex justify-between items-center">
              <button
                onClick={loadSampleEmails}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Charger des exemples
              </button>
              <span className="text-xs text-gray-500">
                {emailList.split('\n').filter(email => email.trim().length > 0).length} emails
              </span>
            </div>
          </div>

          <button
            onClick={handleSendMassEmail}
            disabled={isLoading || emailList.trim().length === 0}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : '🚀 Send Early Bird Emails'}
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-green-900 mb-4">
                ⚠️ Final Confirmation
              </h3>
              <p className="text-gray-600 mb-6">
                Are you ABSOLUTELY sure you want to send the <b>Early Bird launch email</b> to <strong>{emailList.split('\n').filter(email => email.trim().length > 0).length} subscribers</strong>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={confirmSend}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700"
                >
                  Yes, send
                </button>
                <button
                  onClick={cancelSend}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Result Message */}
        {result && (
          <div className={`mt-6 p-4 rounded-lg ${
            result.success 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <p className="text-sm font-medium">{result.message}</p>
            {result.totalSent !== undefined && (
              <p className="text-xs mt-2 opacity-75">
                Number of subscribers affected: {result.totalSent}
                {result.totalErrors && result.totalErrors > 0 && ` (${result.totalErrors} errors)`}
              </p>
            )}
            
            {/* Detailed Results */}
            {result.success && result.errors && result.errors.length > 0 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-xs font-medium text-yellow-800 mb-2">Errors detected:</p>
                <div className="max-h-32 overflow-y-auto">
                  {result.errors.slice(0, 5).map((error, index) => (
                    <p key={index} className="text-xs text-yellow-700">
                      {error.email}: {error.error}
                    </p>
                  ))}
                  {result.errors.length > 5 && (
                    <p className="text-xs text-yellow-600 italic">
                      ... and {result.errors.length - 5} other errors
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">ℹ️ Information</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Email: "🚀 LIQUIDFY IS NOW LIVE! Your Exclusive Early Bird Access"</li>
            <li>• Offer: Unlimited access for $99, one-time payment, code <b>EARLYBIRD99</b></li>
            <li>• Template: <b>early-bird-launch-email.html</b> (optimized for all email clients)</li>
            <li>• This offer will never be repeated. Only for pre-registered users.</li>
            <li>• Logs: Available in Resend dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 