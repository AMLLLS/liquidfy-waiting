// Configuration d'administration pour les campagnes d'email
// ⚠️ IMPORTANT: Ce mot de passe doit être changé en production

export const ADMIN_CONFIG = {
  // Mot de passe d'accès à l'interface d'administration
  PASSWORD: 'Liquidfy2024!@#',
  
  // Nombre maximum de tentatives de connexion
  MAX_LOGIN_ATTEMPTS: 5,
  
  // Durée de blocage après trop de tentatives (en millisecondes)
  BLOCK_DURATION: 30000, // 30 secondes
  
  // Session storage key
  SESSION_KEY: 'campaigns_auth',
  
  // Headers pour l'authentification API
  API_HEADERS: {
    'x-admin-password': 'Liquidfy2024!@#'
  }
}

// Fonction pour obtenir les headers d'authentification
export function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    ...ADMIN_CONFIG.API_HEADERS
  }
}

// Fonction pour vérifier si l'utilisateur est authentifié
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(ADMIN_CONFIG.SESSION_KEY) === 'true'
}

// Fonction pour définir l'authentification
export function setAuthenticated(value: boolean) {
  if (typeof window === 'undefined') return
  if (value) {
    sessionStorage.setItem(ADMIN_CONFIG.SESSION_KEY, 'true')
  } else {
    sessionStorage.removeItem(ADMIN_CONFIG.SESSION_KEY)
  }
} 