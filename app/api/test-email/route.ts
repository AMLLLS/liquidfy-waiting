import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Read the email template
    const fs = require('fs');
    const path = require('path');
    const templatePath = path.join(process.cwd(), 'email-templates', 'early-bird-launch-email.html');
    
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: 'Template email non trouvé' },
        { status: 500 }
      );
    }

    const emailHtml = fs.readFileSync(templatePath, 'utf8');

    // Send test email
    const { data, error } = await resend.emails.send({
      from: 'Liquidfy <noreply@liquidfy.app>',
      to: [email],
      subject: '🧪 TEST - Votre Module Liquidfy Preview',
      html: emailHtml,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    console.log('✅ Email de test envoyé avec succès à:', email);
    console.log('ID Resend:', data?.id);

    return NextResponse.json({
      success: true,
      message: 'Email de test envoyé avec succès',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 