# 🛠️ Guide d'Implémentation - Séquence Email Liquidfy

## 📋 Checklist de Préparation

### ✅ Prérequis
- [ ] Compte Resend configuré avec API key
- [ ] Base de données des abonnés accessible
- [ ] Templates HTML testés
- [ ] Landing page prête pour le lancement

### ✅ Tests Nécessaires
- [ ] Templates testés sur Gmail, Outlook, Apple Mail
- [ ] Liens et images fonctionnels
- [ ] Responsive design vérifié
- [ ] Spam score optimisé

## 🚀 Méthodes d'Envoi

### Option 1: Resend API (Recommandé)

#### Étape 1: Créer une nouvelle route API
```javascript
// app/api/send-email-sequence/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, template, subscriberCount } = await request.json()
    
    let subject, html
    
    if (template === 'preview') {
      subject = '🎯 Your Exclusive Liquidfy Preview is Ready!'
      html = previewSnippetTemplate // Import du template
    } else if (template === 'launch') {
      subject = '🚀 LIQUIDFY IS NOW LIVE! Get 50% OFF Today Only'
      html = launchTemplate // Import du template
    }
    
    const result = await resend.emails.send({
      from: 'Liquidfy Team <hello@liquidfy.app>',
      to: email,
      subject: subject,
      html: html
    })
    
    return NextResponse.json({ success: true, id: result.data?.id })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

#### Étape 2: Script d'envoi en lot
```javascript
// scripts/send-email-sequence.js
const fs = require('fs')
const path = require('path')

async function sendEmailSequence() {
  // 1. Récupérer la liste des abonnés
  const subscribers = await getSubscribersFromDatabase()
  
  // 2. Envoyer Email #2 (Preview)
  for (const subscriber of subscribers) {
    await fetch('/api/send-email-sequence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: subscriber.email,
        template: 'preview',
        subscriberCount: subscriber.id
      })
    })
    
    // Pause entre les envois pour éviter le rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

sendEmailSequence()
```

### Option 2: Service d'Email Marketing

#### Mailchimp
1. **Créer une campagne**
   - Nouvelle campagne → Email
   - Sélectionner l'audience des abonnés

2. **Importer le template**
   - Design → Code personnalisé
   - Coller le HTML du template
   - Sauvegarder

3. **Programmer l'envoi**
   - Date et heure souhaitées
   - Fuseau horaire optimal

#### ConvertKit
1. **Créer un template**
   - Templates → Nouveau template
   - Mode HTML
   - Coller le code

2. **Créer une séquence**
   - Automations → Nouvelle séquence
   - Ajouter les délais
   - Connecter les templates

### Option 3: Cron Job avec Vercel

#### Étape 1: Créer une fonction serverless
```javascript
// app/api/cron/send-emails/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  // Vérifier le secret pour la sécurité
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    // Logique d'envoi automatique
    const subscribers = await getSubscribersForEmailSequence()
    
    for (const subscriber of subscribers) {
      await sendEmailToSubscriber(subscriber)
    }
    
    return NextResponse.json({ success: true, sent: subscribers.length })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

#### Étape 2: Configurer Vercel Cron
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/send-emails",
      "schedule": "0 10 * * *"
    }
  ]
}
```

## 📊 Tracking et Analytics

### Configuration UTM Parameters
```javascript
// Ajouter aux liens dans les templates
const utmParams = new URLSearchParams({
  utm_source: 'email',
  utm_medium: 'sequence',
  utm_campaign: 'launch',
  utm_content: 'preview-snippet' // ou 'launch-announcement'
})

const trackingUrl = `https://liquidfy.app?${utmParams.toString()}`
```

### Métriques à Suivre
```javascript
// Exemple de tracking avec Google Analytics
gtag('event', 'email_open', {
  'email_template': 'preview-snippet',
  'subscriber_id': subscriberId
})

gtag('event', 'email_click', {
  'email_template': 'preview-snippet',
  'link_text': 'Visit Liquidfy.app'
})
```

## 🎯 Personnalisation Avancée

### Variables Dynamiques
```javascript
// Fonction de remplacement des variables
function replaceVariables(template, subscriber) {
  return template
    .replace(/\[FirstName\]/g, subscriber.firstName || 'there')
    .replace(/\[SubscriberNumber\]/g, subscriber.id)
    .replace(/\[DaysUntilLaunch\]/g, calculateDaysUntilLaunch())
    .replace(/\[DiscountCode\]/g, 'LIQUIDFY50')
}
```

### Segmentation par Engagement
```javascript
// Logique de segmentation
function segmentSubscribers(subscribers) {
  return {
    engaged: subscribers.filter(s => s.openRate > 0.3),
    moderate: subscribers.filter(s => s.openRate > 0.1 && s.openRate <= 0.3),
    inactive: subscribers.filter(s => s.openRate <= 0.1)
  }
}
```

## ⚡ Optimisations de Performance

### Rate Limiting
```javascript
// Limiter les envois pour éviter le spam
const RATE_LIMIT = 100 // emails par heure
const DELAY_BETWEEN_EMAILS = 1000 // ms

async function sendWithRateLimit(emails) {
  for (let i = 0; i < emails.length; i++) {
    await sendEmail(emails[i])
    
    if (i % RATE_LIMIT === 0) {
      await new Promise(resolve => setTimeout(resolve, 3600000)) // 1 heure
    } else {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_EMAILS))
    }
  }
}
```

### Gestion des Erreurs
```javascript
// Retry logic pour les échecs
async function sendEmailWithRetry(email, template, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await resend.emails.send({
        from: 'Liquidfy Team <hello@liquidfy.app>',
        to: email,
        subject: template.subject,
        html: template.html
      })
      
      console.log(`✅ Email sent to ${email}`)
      return result
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed for ${email}:`, error)
      
      if (attempt === maxRetries) {
        console.error(`❌ All attempts failed for ${email}`)
        // Log pour suivi manuel
        await logFailedEmail(email, template, error)
      } else {
        // Attendre avant de réessayer
        await new Promise(resolve => setTimeout(resolve, attempt * 5000))
      }
    }
  }
}
```

## 🔧 Scripts Utiles

### Script de Test
```javascript
// scripts/test-email-templates.js
const testEmails = [
  'test1@gmail.com',
  'test2@outlook.com',
  'test3@yahoo.com'
]

async function testTemplates() {
  for (const email of testEmails) {
    // Test Email #2
    await sendTestEmail(email, 'preview-snippet')
    
    // Test Email #3
    await sendTestEmail(email, 'launch-announcement')
    
    console.log(`✅ Test emails sent to ${email}`)
  }
}
```

### Script de Nettoyage
```javascript
// scripts/cleanup-subscribers.js
async function cleanupSubscribers() {
  // Supprimer les emails invalides
  const invalidEmails = await findInvalidEmails()
  
  for (const email of invalidEmails) {
    await removeSubscriber(email)
    console.log(`🗑️ Removed invalid email: ${email}`)
  }
}
```

## 📞 Support et Dépannage

### Problèmes Courants
1. **Emails non reçus** : Vérifier le dossier spam
2. **Images non affichées** : Vérifier les URLs absolues
3. **Liens cassés** : Tester tous les liens avant envoi
4. **Rate limiting** : Espacer les envois

### Contacts Utiles
- **Resend Support** : support@resend.com
- **Vercel Support** : support@vercel.com
- **Documentation** : https://resend.com/docs

## 🎯 Checklist Finale

### Avant l'Envoi
- [ ] Templates testés sur 3+ clients email
- [ ] Tous les liens fonctionnels
- [ ] Images optimisées et accessibles
- [ ] Base de données à jour
- [ ] Rate limiting configuré
- [ ] Tracking UTM configuré

### Après l'Envoi
- [ ] Vérifier les taux d'ouverture
- [ ] Analyser les clics
- [ ] Suivre les conversions
- [ ] Ajuster la stratégie si nécessaire
- [ ] Préparer les emails de suivi

---

**💡 Conseil** : Commencez par un test avec un petit groupe d'abonnés avant l'envoi en masse pour valider que tout fonctionne parfaitement ! 