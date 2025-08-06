import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { emails } = await request.json();

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json({ error: 'Emails array is required' }, { status: 400 });
    }

    // Read the email template
    const templatePath = path.join(process.cwd(), 'email-templates', 'early-bird-launch-email.html');
    const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

    const results = [];
    const errors = [];

    // Send emails with rate limiting
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      
      try {
        const result = await resend.emails.send({
          from: 'Liquidfy Team <hello@liquidfy.app>',
          to: email,
          subject: '🚀 LIQUIDFY IS NOW LIVE! Your Exclusive Early Bird Access',
          html: emailTemplate,
        });

        results.push({ email, success: true, id: result.data?.id });
        
        // Rate limiting: wait 1 second between emails
        if (i < emails.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
        errors.push({ email, error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }

    return NextResponse.json({
      success: true,
      sent: results.length,
      failed: errors.length,
      results,
      errors
    });

  } catch (error) {
    console.error('Error sending early bird launch emails:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

// GET endpoint to test the email template
export async function GET() {
  try {
    const templatePath = path.join(process.cwd(), 'email-templates', 'early-bird-launch-email.html');
    const emailTemplate = fs.readFileSync(templatePath, 'utf-8');
    
    return new NextResponse(emailTemplate, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }
} 