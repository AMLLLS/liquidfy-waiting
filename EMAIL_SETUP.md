# 📧 Configuration Email Liquify

## ✅ Status Actuel

### Configuration Resend
- ✅ **API intégrée** : Le système utilise Resend pour l'envoi d'emails
- ✅ **Template professionnel** : Email de bienvenue avec l'identité Liquify
- ✅ **Fallback gracieux** : L'application fonctionne même sans email
- ✅ **Template responsive** : Compatible mobile et desktop

### Variables d'environnement requises
```bash
RESEND_API_KEY="re_..."  # Votre clé API Resend
```

## 🎨 Templates Disponibles

### 1. Email de Bienvenue (Actuel)
**Fichier :** `app/api/subscribe/route.ts` et `components/EmailTemplates.tsx`

**Contenu :**
- Header avec logo Liquify stylisé
- Message de félicitations personnalisé
- Présentation des fonctionnalités (150+ modules, 1-click install, etc.)
- Early Bird Benefits (50% off, early access, etc.)
- Social proof dynamique (nombre d'abonnés)
- CTA vers liquidfy.app

### 2. Email de Rappel de Lancement
**Fichier :** `components/EmailTemplates.tsx` → `LaunchReminderEmailTemplate`

**Usage :**
```typescript
import { LaunchReminderEmailTemplate } from '@/components/EmailTemplates'

const emailHtml = LaunchReminderEmailTemplate({ 
  email: "user@example.com", 
  daysLeft: 7 
})
```

### 3. Email d'Annonce de Lancement
**Fichier :** `components/EmailTemplates.tsx` → `LaunchAnnouncementEmailTemplate`

**Usage :**
```typescript
import { LaunchAnnouncementEmailTemplate } from '@/components/EmailTemplates'

const emailHtml = LaunchAnnouncementEmailTemplate("user@example.com")
```

## 🛠️ Personnalisation

### Modifier l'Email de Bienvenue

**1. Textes et Messages :**
Modifiez dans `app/api/subscribe/route.ts` :
- `subject`: Sujet de l'email
- `from`: Expéditeur (ex: "Liquify Team <hello@liquidfy.app>")
- Contenu HTML du template

**2. Couleurs et Style :**
- **Gradient principal :** `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Couleur CTA :** `linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)`
- **Police :** Inter (Google Fonts)

**3. Fonctionnalités :**
```html
<!-- Exemple de nouvelle fonctionnalité -->
<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #22c55e;">
  <h4 style="color: #15803d; font-weight: 600; margin: 0 0 8px; font-size: 16px;">🆕 Nouvelle Fonctionnalité</h4>
  <p style="color: #166534; margin: 0; font-size: 14px; line-height: 1.5;">Description de votre nouvelle fonctionnalité</p>
</div>
```

### Variables Dynamiques Disponibles

- `${email}` - Email de l'utilisateur
- `${totalSubscribers}` - Nombre total d'abonnés
- Toute variable que vous passez aux templates

## 🚀 Déploiement

### 1. Configuration Vercel
```bash
# Dans votre dashboard Vercel, ajoutez :
RESEND_API_KEY=re_your_api_key_here
```

### 2. Configuration Resend
1. Créez un compte sur [resend.com](https://resend.com)
2. Vérifiez votre domaine `liquidfy.app`
3. Générez une API key
4. Ajoutez la clé dans Vercel

### 3. Test Local
```bash
# Créez .env.local
echo "RESEND_API_KEY=re_your_key" > .env.local

# Testez
npm run build
npm run dev
```

## 📊 Analytics & Suivi

### Métriques Actuelles
- ✅ Nombre d'abonnés total
- ✅ Horodatage des inscriptions
- ✅ IP et User-Agent des abonnés
- ✅ Gestion des doublons

### Métriques Emails (À implémenter)
```typescript
// Exemple pour tracking ouvertures
const trackingPixel = `<img src="https://liquidfy.app/api/track/open?email=${email}&campaign=welcome" style="width:1px;height:1px;" alt="" />`;

// Exemple pour tracking clics
const trackedUrl = `https://liquidfy.app/api/track/click?email=${email}&url=https://liquidfy.app&campaign=welcome`;
```

## 🎯 Campagnes Suggérées

### 1. Séquence de Bienvenue
- **J+0** : Email de bienvenue (✅ Implémenté)
- **J+3** : Email "En coulisses" - développement de Liquify
- **J+7** : Email social proof - témoignages d'early adopters
- **J+14** : Email features preview - aperçu des modules

### 2. Séquence de Lancement
- **J-7** : Email de rappel (✅ Template prêt)
- **J-3** : Email "dernière chance early bird"
- **J-1** : Email "24h avant le lancement"
- **J+0** : Email de lancement (✅ Template prêt)

### 3. Post-Lancement
- **J+1** : Email "comment commencer"
- **J+7** : Email "vos premiers résultats"
- **J+30** : Email feedback et témoignage

## 🔧 API Email Personnalisée

### Envoyer un Email Custom
```typescript
// Dans app/api/send-custom/route.ts
import { Resend } from 'resend'
import { LaunchReminderEmailTemplate } from '@/components/EmailTemplates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { emailType, recipients, customData } = await request.json()
  
  switch(emailType) {
    case 'launch-reminder':
      await resend.emails.send({
        from: 'Liquify Team <hello@liquidfy.app>',
        to: recipients,
        subject: `🚨 ${customData.daysLeft} days until Liquify launch!`,
        html: LaunchReminderEmailTemplate(customData)
      })
      break;
  }
}
```

## 🎨 Exemples de Personnalisation

### Logo Personnalisé
```html
<!-- Remplacez le logo text par une image -->
<img src="https://liquidfy.app/logo-email.png" alt="Liquify" style="width: 80px; height: 80px; border-radius: 20px;" />
```

### Section Témoignage
```html
<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 32px 0; text-align: center; border-left: 4px solid #4f46e5;">
  <p style="color: #4b5563; font-style: italic; font-size: 16px; margin: 0 0 16px;">"Liquify a transformé notre e-commerce. +40% de conversions en 2 semaines!"</p>
  <p style="color: #6b7280; font-size: 14px; margin: 0;"><strong>Sarah Johnson</strong> - CEO, EcoStore</p>
</div>
```

## 🚨 Important

- **Domaine vérifié requis** : Vous devez vérifier `liquidfy.app` dans Resend
- **Respect RGPD** : Les emails incluent des liens de désabonnement
- **Rate limiting** : Resend a des limites d'envoi selon votre plan
- **Fallback** : L'app fonctionne même si l'email échoue

## 🔄 Prochaines Étapes

1. **Vérifier le domaine** dans Resend
2. **Tester l'envoi** avec votre propre email
3. **Configurer les analytics** d'ouverture/clic
4. **Planifier la séquence** de lancement
5. **Créer un dashboard** admin pour gérer les campagnes 