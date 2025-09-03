import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Read the email template
    const fs = require('fs');
    const path = require('path');
    const templatePath = path.join(process.cwd(), 'email-templates', 'early-bird-final-reminder.html');
    
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: 'Email template not found' },
        { status: 500 }
      );
    }

    const emailHtml = fs.readFileSync(templatePath, 'utf8');

    // Parse request body with better error handling
    let emailList;
    try {
      const body = await request.json();
      emailList = body.emailList;
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }
    
    if (!emailList || !Array.isArray(emailList) || emailList.length === 0) {
      return NextResponse.json(
        { error: 'Email list is required' },
        { status: 400 }
      );
    }

    // Send emails one by one to avoid batch issues
    const results: Array<{ email: string; id: string }> = [];
    const errors: Array<{ email: string; error: string }> = [];

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const isRetryable = (message: string) => {
      const m = message.toLowerCase();
      return (
        m.includes('rate limit') ||
        m.includes('too many requests') ||
        m.includes('timeout') ||
        m.includes('timed out') ||
        m.includes('temporarily unavailable') ||
        m.includes('service unavailable') ||
        m.includes('bad gateway') ||
        m.includes('gateway timeout') ||
        m.includes('5xx')
      );
    };

    const sendWithRetry = async (email: string, maxRetries = 3) => { 
      let attempt = 0;
      while (attempt < maxRetries) {
        try {
          const response = await resend.emails.send({
            from: 'Liquidfy Team <hello@liquidfy.app>',
            to: [email],
            subject: '🎯 Your Early Bird Access - Final Reminder',
            html: emailHtml,
            text: 'Final reminder: Your Early Bird access to Liquidfy ($99 instead of $199) is still available. Code: EARLYBIRD99. Claim now: https://liquidfy.app'
          });

          if (response?.data?.id) {
            results.push({ email, id: response.data.id });
            return true;
          }

          const providerError = response?.error as any;
          const message = typeof providerError === 'string'
            ? providerError
            : providerError?.message || 'Unknown provider error';

          if (attempt < maxRetries - 1 && isRetryable(message)) {
            await delay(2000 * Math.pow(2, attempt));
            attempt++;
            continue;
          }

          errors.push({ email, error: message });
          return false;
        } catch (e) {
          const message = e instanceof Error ? e.message : 'Unknown error';
          if (attempt < maxRetries - 1 && isRetryable(message)) {
            await delay(2000 * Math.pow(2, attempt));
            attempt++;
            continue;
          }
          errors.push({ email, error: message });
          return false;
        }
      }
      return false;
    };

    // Process sequentially with a safe base delay to avoid rate limiting
    for (let i = 0; i < emailList.length; i++) {
      const email = emailList[i];

      if (!email || typeof email !== 'string' || !email.includes('@')) {
        errors.push({ email, error: 'Invalid email format' });
        continue;
      }

      await sendWithRetry(email, 3);

      // Base delay between sends (2s) to reduce rate limiting likelihood
      if (i < emailList.length - 1) {
        await delay(2000);
      }
    }

    const successCount = results.length;
    const errorCount = errors.length;

    return NextResponse.json({
      success: true,
      message: `Early Bird reminder emails sent: ${successCount} successful, ${errorCount} errors`,
      results,
      errors,
      totalSent: successCount,
      totalErrors: errorCount,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
} 