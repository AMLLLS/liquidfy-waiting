'use client';

import { useState } from 'react';

export default function SendEarlyBirdLaunch() {
  const [emails, setEmails] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSendEmails = async () => {
    if (!emails.trim()) {
      setError('Please enter email addresses');
      return;
    }

    const emailList = emails.split('\n').map(email => email.trim()).filter(email => email);
    
    if (emailList.length === 0) {
      setError('Please enter valid email addresses');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/send-early-bird-launch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails: emailList }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to send emails');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/send-early-bird-launch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails: ['test@example.com'] }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to send test email');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🚀 Send Early Bird Launch Email
          </h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Email Template Preview
            </h2>
            <div className="bg-gray-100 rounded-lg p-4">
              <iframe 
                src="/api/send-early-bird-launch" 
                className="w-full h-96 border-0 rounded"
                title="Email Template Preview"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Send to Waiting List
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Addresses (one per line)
              </label>
              <textarea
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="Enter email addresses, one per line..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSendEmails}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                {isLoading ? 'Sending...' : 'Send Early Bird Launch Email'}
              </button>
              
              <button
                onClick={handleTestEmail}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                {isLoading ? 'Sending...' : 'Send Test Email'}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">Error: {error}</p>
            </div>
          )}

          {result && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-green-800 font-semibold mb-2">Results:</h3>
              <div className="text-sm text-green-700">
                <p><strong>Successfully sent:</strong> {result.sent}</p>
                <p><strong>Failed:</strong> {result.failed}</p>
                
                {result.errors && result.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Failed emails:</p>
                    <ul className="list-disc list-inside">
                      {result.errors.map((err: any, index: number) => (
                        <li key={index}>{err.email}: {err.error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-yellow-800 font-semibold mb-2">⚠️ Important Notes:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• This email announces the app launch to all waiting list subscribers</li>
              <li>• Early Bird plan: $99 one-time payment for unlimited access</li>
              <li>• Access code: <strong>EARLYBIRD99</strong></li>
              <li>• Regular price after launch: $199/month</li>
              <li>• Emails are sent with 1-second delay to avoid rate limiting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 