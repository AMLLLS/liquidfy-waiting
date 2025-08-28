import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { emails } = await request.json();

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: 'Emails array is required' }, { status: 400 });
    }

    const templatePath = path.join(process.cwd(), 'email-templates', 'early-bird-last-chance-email.html');
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json({ error: 'Email template not found' }, { status: 500 });
    }
    const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

    const results: Array<{ email: string; id?: string }> = [];
    const errors: Array<{ email: string; error: string }> = [];

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const isRetryable = (message: string) => {
      const m = (message || '').toLowerCase();
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
            to: email,
            subject: '⏰ Last Chance: Your Early Bird Access Expires Soon',
            html: emailTemplate,
          });

          if (response?.data?.id) {
            results.push({ email, id: response.data.id });
            return true;
          }

          const providerError = response?.error as any;
          const message = typeof providerError === 'string' ? providerError : providerError?.message || 'Unknown provider error';
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

    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      if (typeof email !== 'string' || !email.includes('@')) {
        errors.push({ email, error: 'Invalid email format' });
        continue;
      }

      await sendWithRetry(email, 3);

      if (i < emails.length - 1) {
        await delay(2000);
      }
    }

    return NextResponse.json({
      success: true,
      sent: results.length,
      failed: errors.length,
      results,
      errors,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const templatePath = path.join(process.cwd(), 'email-templates', 'early-bird-last-chance-email.html');
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json({ error: 'Email template not found' }, { status: 404 });
    }
    const emailTemplate = fs.readFileSync(templatePath, 'utf-8');
    return new NextResponse(emailTemplate, { headers: { 'Content-Type': 'text/html' } });
  } catch (e) {
    return NextResponse.json({ error: 'Unable to load template' }, { status: 500 });
  }
} 