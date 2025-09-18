import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Interface pour les utilisateurs
interface FreeUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  lastLoginAt: Date;
  createdAt: Date;
  plan: 'free';
  hasEverPurchased: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { targetAudience, emailTemplate } = await request.json();

    // Validation des paramètres
    if (!targetAudience || !emailTemplate) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    // Récupérer le template email
    const templatePath = path.join(process.cwd(), 'email-templates', `${emailTemplate}.html`);
    
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: 'Template email non trouvé' },
        { status: 404 }
      );
    }

    const emailHtml = fs.readFileSync(templatePath, 'utf-8');

    // Simuler la récupération des utilisateurs free depuis la base de données
    // En production, cela viendrait de votre base de données
    const freeUsers = await getFreeUsers(targetAudience);

    if (freeUsers.length === 0) {
      return NextResponse.json(
        { error: 'Aucun utilisateur trouvé pour cette audience' },
        { status: 404 }
      );
    }

    // Préparer les emails
    const emailPromises = freeUsers.map(async (user) => {
      // Personnaliser le template pour chaque utilisateur
      const personalizedHtml = emailHtml
        .replace(/\[PRENOM\]/g, user.firstName || 'Ami entrepreneur')
        .replace(/\[EMAIL\]/g, user.email)
        .replace(/\[USER_ID\]/g, user.id);

      // Envoyer l'email via Resend
      return resend.emails.send({
        from: 'Early Bird <noreply@liquidfy.app>',
        to: user.email,
        subject: '⚡ DERNIÈRES 48H - Early Bird à 99€ avant 249€ (Économisez 150€)',
        html: personalizedHtml,
        tags: [
          {
            name: 'campaign',
            value: 'free-user-early-bird-conversion'
          },
          {
            name: 'audience',
            value: targetAudience
          },
          {
            name: 'user_plan',
            value: 'free'
          }
        ]
      });
    });

    // Envoyer tous les emails
    const results = await Promise.allSettled(emailPromises);
    
    // Analyser les résultats
    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    // Calculer les métriques
    const estimatedConversionRate = 0.175; // 17.5% conversion rate estimé
    const pricePerConversion = 99;
    const expectedConversions = Math.round(successful * estimatedConversionRate);
    const estimatedRevenue = expectedConversions * pricePerConversion;

    // Log pour analytics
    console.log(`📧 CAMPAGNE FREE USER CONVERSION:
    - Audience: ${targetAudience}
    - Emails envoyés: ${successful}
    - Emails échoués: ${failed}
    - Conversions attendues: ${expectedConversions}
    - Revenus estimés: ${estimatedRevenue}€`);

    return NextResponse.json({
      success: true,
      emailsSent: successful,
      emailsFailed: failed,
      expectedConversions,
      estimatedRevenue,
      details: {
        targetAudience,
        template: emailTemplate,
        conversionRate: estimatedConversionRate,
        pricePerUser: pricePerConversion
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de la campagne:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de l\'envoi' },
      { status: 500 }
    );
  }
}

// Fonction pour récupérer les utilisateurs free selon l'audience
async function getFreeUsers(targetAudience: string): Promise<FreeUser[]> {
  // SIMULATION - En production, remplacer par une vraie requête DB
  // Par exemple: const users = await db.users.findMany({ where: { plan: 'free', hasEverPurchased: false } });
  
  const mockUsers: FreeUser[] = [];
  const now = new Date();
  
  // Générer des utilisateurs mock pour la démo
  for (let i = 1; i <= 1247; i++) {
    const user: FreeUser = {
      id: `user_${i}`,
      email: `user${i}@example.com`,
      firstName: `User${i}`,
      lastName: 'Test',
      lastLoginAt: new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Derniers 30 jours
      createdAt: new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Derniers 90 jours
      plan: 'free',
      hasEverPurchased: false
    };
    mockUsers.push(user);
  }

  // Filtrer selon l'audience sélectionnée
  switch (targetAudience) {
    case 'active':
      // Utilisateurs connectés dans les 30 derniers jours
      return mockUsers.filter(user => 
        now.getTime() - user.lastLoginAt.getTime() <= 30 * 24 * 60 * 60 * 1000
      ).slice(0, 892);
      
    case 'recent':
      // Utilisateurs connectés dans les 24 dernières heures
      return mockUsers.filter(user => 
        now.getTime() - user.lastLoginAt.getTime() <= 24 * 60 * 60 * 1000
      ).slice(0, 334);
      
    case 'all':
    default:
      // Tous les utilisateurs free
      return mockUsers;
  }
}

// Fonction utilitaire pour envoyer un email de test
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  if (action === 'test') {
    // Envoyer un email de test
    try {
      const templatePath = path.join(process.cwd(), 'email-templates', 'free-user-early-bird-conversion.html');
      const emailHtml = fs.readFileSync(templatePath, 'utf-8');
      
      const testHtml = emailHtml
        .replace(/\[PRENOM\]/g, 'Test User')
        .replace(/\[EMAIL\]/g, 'test@liquidfy.app')
        .replace(/\[USER_ID\]/g, 'test_user_123');

      const result = await resend.emails.send({
        from: 'Early Bird Test <noreply@liquidfy.app>',
        to: 'test@liquidfy.app', // Remplacer par votre email de test
        subject: '🧪 TEST - Early Bird Conversion Email',
        html: testHtml,
        tags: [
          {
            name: 'campaign',
            value: 'test-free-user-conversion'
          }
        ]
      });

      return NextResponse.json({
        success: true,
        message: 'Email de test envoyé',
        result
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du test', details: error },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    message: 'API Free User Conversion',
    endpoints: {
      'POST /': 'Envoyer la campagne',
      'GET /?action=test': 'Envoyer un email de test'
    }
  });
}