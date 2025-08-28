"use client";

import { useState } from "react";

export default function SendEarlyBirdReminder() {
  const [emails, setEmails] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState(false);

  const parsedEmails = emails
    .split("\n")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);

  const handleSend = async () => {
    if (parsedEmails.length === 0) {
      setError("Please enter at least one email address");
      return;
    }
    setShowConfirm(true);
  };

  const confirmSend = async () => {
    setIsLoading(true);
    setError("");
    setResult(null);
    setShowConfirm(false);

    try {
      const res = await fetch("/api/send-early-bird-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails: parsedEmails }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to send reminder emails");
      }
    } catch {
      setError("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            ⏰ Send Last-Chance Reminder (Early Bird)
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Email Template Preview
            </h2>
            <div className="bg-gray-100 rounded-lg p-4">
              <iframe
                src="/api/send-early-bird-reminder"
                className="w-full h-96 border-0 rounded"
                title="Reminder Email Template Preview"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recipients
            </h2>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email addresses (one per line)
            </label>
            <textarea
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder={"john@example.com\njane@example.com"}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="mt-2 text-xs text-gray-500">
              {parsedEmails.length} recipients
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={isLoading || parsedEmails.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isLoading ? "Sending..." : "Send Last-Chance Reminder"}
          </button>

          {showConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-lg font-semibold text-red-900 mb-4">
                  Final Confirmation
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to send the last-chance reminder to {" "}
                  <strong>{parsedEmails.length}</strong> recipients?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={confirmSend}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    Yes, send
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">Error: {error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-green-800 font-semibold mb-2">Results</h3>
              <p className="text-sm text-green-700">
                Sent: {result.sent} • Failed: {result.failed}
              </p>
              {result.errors?.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-yellow-800">Errors:</p>
                  <ul className="text-sm text-yellow-700 list-disc list-inside max-h-40 overflow-auto">
                    {result.errors.slice(0, 10).map((e: any, i: number) => (
                      <li key={i}>{e.email}: {e.error}</li>
                    ))}
                    {result.errors.length > 10 && (
                      <li>...and {result.errors.length - 10} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Notes</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Subject: "⏰ Last Chance: Your Early Bird Access Expires Soon"</li>
              <li>• Offer: Unlimited access for $99, code EARLYBIRD99</li>
              <li>• Template: early-bird-last-chance-email.html</li>
              <li>• Delay: 500ms between emails to avoid rate limiting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 