'use client';

import { useState } from 'react';

export default function TestEmailPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setResult({ success: false, message: 'Veuillez entrer une adresse email valide.' });
      return;
    }
    setShowConfirmation(true);
  };

  const confirmSend = async () => {
    setIsLoading(true);
    setShowConfirmation(false);
    setResult(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ 
          success: true, 
          message: `✅ Email envoyé avec succès à ${email}! Vérifiez votre boîte de réception.` 
        });
        setEmail('');
      } else {
        setResult({ 
          success: false, 
          message: `❌ Erreur: ${data.error || 'Impossible d\'envoyer l\'email'}` 
        });
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: '❌ Erreur de connexion. Vérifiez votre connexion internet.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSend = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">🧪 Test Email Liquidfy</h1>
          <p className="text-gray-600">
            Envoyez le mail de preview à une adresse spécifique pour tester
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse Email de Test
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre-email@exemple.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Envoi en cours...' : '📧 Envoyer Email de Test'}
          </button>
        </form>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ⚠️ Confirmation d'envoi
              </h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir envoyer l'email de test à <strong>{email}</strong> ?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={confirmSend}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700"
                >
                  Oui, envoyer
                </button>
                <button
                  onClick={cancelSend}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400"
                >
                  Annuler
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
            <p className="text-sm">{result.message}</p>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">ℹ️ Informations</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Email envoyé uniquement à l'adresse spécifiée</li>
            <li>• Pas d'impact sur la base de données Resend</li>
            <li>• Test du rendu et de la délivrabilité</li>
            <li>• Module "Popular Product Notification" inclus</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 