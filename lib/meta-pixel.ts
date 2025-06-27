// Configuration du Meta Pixel pour Liquidfy
export const META_PIXEL_CONFIG = {
  // Remplace par ton véritable Pixel ID depuis Facebook Business Manager
  PIXEL_ID: '720945630867893',
  
  // Configuration des événements
  EVENTS: {
    // Événements standards Facebook
    PAGE_VIEW: 'PageView',
    VIEW_CONTENT: 'ViewContent',
    LEAD: 'Lead',
    COMPLETE_REGISTRATION: 'CompleteRegistration',
    INITIATE_CHECKOUT: 'InitiateCheckout',
    
    // Événements personnalisés Liquidfy
    SCROLL_DEPTH: 'ScrollDepth',
    FEATURE_VIEW: 'FeatureView',
    EMAIL_FORM_START: 'EmailFormStart',
    EMAIL_FORM_ERROR: 'EmailFormError',
    DEMO_REQUEST: 'DemoRequest',
    PRICING_VIEW: 'PricingView'
  },
  
  // Paramètres par défaut
  DEFAULT_PARAMS: {
    content_name: 'Liquidfy SaaS Platform',
    content_category: 'SaaS Landing Page',
    currency: 'USD',
    value: 1
  }
}

// Fonction utilitaire pour vérifier si le pixel est configuré
export const isPixelConfigured = (): boolean => {
  return META_PIXEL_CONFIG.PIXEL_ID !== 'YOUR_PIXEL_ID_HERE'
}

// Instructions de configuration pour le développeur
export const PIXEL_SETUP_INSTRUCTIONS = `
🎯 CONFIGURATION DU META PIXEL - LIQUIDFY

1. Va sur Facebook Business Manager (business.facebook.com)
2. Accède à "Data Sources" > "Pixels"
3. Copie ton Pixel ID (format: 123456789012345)
4. Remplace 'YOUR_PIXEL_ID_HERE' par ton véritable Pixel ID dans:
   - /lib/meta-pixel.ts (ligne 3)
   - /app/layout.tsx (ligne 23 et 33)

5. Événements trackés automatiquement:
   ✅ PageView - Chargement de la page
   ✅ ViewContent - Visualisation du contenu
   ✅ Lead - Début de saisie email
   ✅ CompleteRegistration - Email envoyé avec succès
   ✅ ScrollDepth - Scroll à 25%, 50%, 75%, 100%
   ✅ EmailFormStart - Focus sur le champ email
   ✅ EmailFormError - Erreur de soumission

6. Test ta configuration:
   - Utilise l'extension "Meta Pixel Helper" sur Chrome
   - Vérifie les événements dans Facebook Events Manager
   - Regarde la console pour les logs "📊 Meta Pixel:"

💡 IMPORTANT: Remplace l'ID avant de déployer en production!
` 