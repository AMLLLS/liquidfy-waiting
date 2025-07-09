'use client'

import { useState, useEffect } from 'react'
import EmailCampaignManager from '../../components/EmailCampaignManager'
import { ADMIN_CONFIG, isAuthenticated as checkAuth, setAuthenticated } from '../../lib/admin-config'

export default function CampaignsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)

  // Vérifier si déjà authentifié
  useEffect(() => {
    const authStatus = checkAuth()
    if (authStatus) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === ADMIN_CONFIG.PASSWORD) {
      setIsAuthenticated(true)
      setAuthenticated(true)
      setError('')
      setAttempts(0)
    } else {
      setAttempts(attempts + 1)
      setError('Mot de passe incorrect')
      
      // Bloquer après trop de tentatives
      if (attempts >= ADMIN_CONFIG.MAX_LOGIN_ATTEMPTS - 1) {
        setError('Trop de tentatives. Réessayez plus tard.')
        setTimeout(() => {
          setAttempts(0)
          setError('')
        }, ADMIN_CONFIG.BLOCK_DURATION)
      }
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAuthenticated(false)
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">L</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès Administrateur</h1>
              <p className="text-gray-600">Gestion des campagnes d'email</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Entrez le mot de passe"
                  disabled={attempts >= 5}
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={attempts >= 5}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {attempts >= 5 ? 'Bloqué temporairement' : 'Se connecter'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Accès réservé aux administrateurs Liquidfy
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header avec bouton de déconnexion */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📧 Gestion des Campagnes</h1>
            <p className="text-gray-600">Interface d'administration sécurisée</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            🔒 Se déconnecter
          </button>
        </div>
        
        <EmailCampaignManager />
      </div>
    </div>
  )
} 