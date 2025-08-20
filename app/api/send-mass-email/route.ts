import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
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

    // Parse request body with better error handling
    let emailList;
    try {
      const body = await request.json();
      emailList = body.emailList;
    } catch (parseError) {
      console.error('Erreur parsing JSON:', parseError);
      return NextResponse.json(
        { error: 'Format de données invalide' },
        { status: 400 }
      );
    }
    
    if (!emailList || !Array.isArray(emailList) || emailList.length === 0) {
      return NextResponse.json(
        { error: 'Liste d\'emails requise' },
        { status: 400 }
      );
    }

    console.log(`📧 Sending Early Bird launch emails to ${emailList.length} subscribers...`);

    // Send emails one by one to avoid batch issues
    const results = [];
    const errors = [];

    for (let i = 0; i < emailList.length; i++) {
      const email = emailList[i];
      
      try {
        // Validate email format
        if (!email || typeof email !== 'string' || !email.includes('@')) {
          errors.push({ email, error: 'Format d\'email invalide' });
          continue;
        }

        const response = await resend.emails.send({
          from: 'Liquidfy Team <hello@liquidfy.app>',
          to: [email],
          subject: '🚀 LIQUIDFY IS NOW LIVE! Your Exclusive Early Bird Access',
          html: emailHtml,
        });

        // Check if response is valid
        if (!response) {
          errors.push({ email, error: 'Réponse vide de l\'API Resend' });
          continue;
        }

        const { data, error } = response;

        if (error) {
          console.error(`Erreur pour ${email}:`, error);
          const errorMessage = typeof error === 'string' ? error : 
                              error?.message || error?.toString() || 'Erreur inconnue';
          errors.push({ email, error: errorMessage });
        } else if (data && data.id) {
          console.log(`✅ Early Bird email sent to ${email} - ID: ${data.id}`);
          results.push({ email, id: data.id });
        } else {
          console.error(`Réponse invalide pour ${email}:`, data);
          errors.push({ email, error: 'Réponse invalide de l\'API' });
        }

        // Add a small delay to avoid rate limiting
        if (i < emailList.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }

      } catch (emailError) {
        console.error(`Erreur critique pour ${email}:`, emailError);
        const errorMessage = emailError instanceof Error ? emailError.message : 'Erreur critique lors de l\'envoi';
        errors.push({ email, error: errorMessage });
      }
    }

    const successCount = results.length;
    const errorCount = errors.length;

    console.log(`📊 Summary: ${successCount} Early Bird emails sent successfully, ${errorCount} errors`);

    return NextResponse.json({
      success: true,
      message: `Early Bird launch emails sent: ${successCount} successful, ${errorCount} errors`,
      results,
      errors,
      totalSent: successCount,
      totalErrors: errorCount
    });

  } catch (error) {
    console.error('Erreur serveur:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      { error: 'Erreur interne du serveur', details: errorMessage },
      { status: 500 }
    );
  }
} 