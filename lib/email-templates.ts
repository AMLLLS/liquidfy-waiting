// Bibliothèque de templates d'email pour Liquidfy
// Style : Minimaliste, élégant, professionnel (inspiré de Shopify, Framer, StoreConversionKit)

export interface EmailTemplate {
  id: string
  name: string
  description: string
  category: 'early-access' | 'urgency' | 'launch' | 'follow-up'
  variables: string[]
  subject: string
  html: (data: any) => string
}

// Template 1: Early Access Announcement
export const EARLY_ACCESS_TEMPLATE: EmailTemplate = {
  id: 'early-access-announcement',
  name: 'Early Access Announcement',
  description: 'Annonce l\'ouverture de l\'early access avec exclusivité',
  category: 'early-access',
  variables: ['totalSubscribers', 'daysLeft'],
  subject: '🎯 Early Access Now Open - Liquidfy Waitlist',
  html: (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Early Access Now Open - Liquidfy</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #fafafa; color: #1a1a1a;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 48px 32px; text-align: center;">
      <div style="width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
        <span style="color: white; font-size: 28px; font-weight: 700;">L</span>
      </div>
      <h1 style="color: white; font-size: 32px; font-weight: 600; margin: 0 0 12px; letter-spacing: -0.5px;">Early Access is Live</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0; font-weight: 400;">You're among the first to experience Liquidfy</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 48px 32px;">
      
      <!-- Welcome Section -->
      <div style="text-align: center; margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin: 0 0 16px;">Welcome to the Future of E-commerce</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #666; margin: 0; max-width: 480px; margin: 0 auto;">
          You're subscriber #${data.totalSubscribers + 200} and you now have exclusive access to our revolutionary platform before anyone else.
        </p>
      </div>

      <!-- Features Grid -->
      <div style="display: grid; gap: 24px; margin-bottom: 48px;">
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border-left: 4px solid #667eea;">
          <h3 style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px;">100+ Premium Modules</h3>
          <p style="font-size: 14px; color: #666; margin: 0; line-height: 1.5;">Conversion-optimized components designed by e-commerce experts</p>
        </div>
        
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border-left: 4px solid #667eea;">
          <h3 style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px;">120+ Shopify Sections</h3>
          <p style="font-size: 14px; color: #666; margin: 0; line-height: 1.5;">Ready-to-use .liquid sections for any theme</p>
        </div>
        
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border-left: 4px solid #667eea;">
          <h3 style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px;">Revenue Optimization</h3>
          <p style="font-size: 14px; color: #666; margin: 0; line-height: 1.5;">Proven strategies to increase your store's conversion rate</p>
        </div>
      </div>

      <!-- CTA Section -->
      <div style="text-align: center; margin-bottom: 48px;">
        <a href="https://liquidfy.app/early-access" style="display: inline-block; background: #667eea; color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 500; font-size: 16px; transition: background-color 0.2s;">
          Access Liquidfy Now
        </a>
      </div>

      <!-- Social Proof -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 32px; text-align: center;">
        <p style="font-size: 14px; color: #666; margin: 0 0 16px;">Join ${data.totalSubscribers + 200} entrepreneurs already upgrading their stores</p>
        <div style="display: flex; justify-content: center; gap: 8px;">
          <div style="width: 6px; height: 6px; background: #667eea; border-radius: 50%;"></div>
          <div style="width: 6px; height: 6px; background: #667eea; border-radius: 50%;"></div>
          <div style="width: 6px; height: 6px; background: #667eea; border-radius: 50%;"></div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 14px; color: #666; margin: 0 0 8px;">Thank you for being part of this journey</p>
      <p style="font-size: 12px; color: #999; margin: 0;">
        © 2024 Liquidfy. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
  `
}

// Template 2: Urgency Campaign (Redesigned)
export const URGENCY_TEMPLATE: EmailTemplate = {
  id: 'urgency-campaign',
  name: 'Urgency Campaign',
  description: 'Crée de l\'urgence avec FOMO et social proof',
  category: 'urgency',
  variables: ['totalSubscribers', 'daysLeft'],
  subject: '⏰ ${daysLeft} Days Left - Your Early Access Expires Soon',
  html: (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Early Access Expires Soon - Liquidfy</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #fafafa; color: #1a1a1a;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 48px 32px; text-align: center;">
      <div style="width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
        <span style="color: white; font-size: 28px; font-weight: 700;">L</span>
      </div>
      <h1 style="color: white; font-size: 32px; font-weight: 600; margin: 0 0 12px; letter-spacing: -0.5px;">${data.daysLeft} Days Left</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0; font-weight: 400;">Your early access is about to expire</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 48px 32px;">
      
      <!-- Urgency Message -->
      <div style="text-align: center; margin-bottom: 48px;">
        <div style="background: #fef2f2; border-radius: 12px; padding: 24px; border-left: 4px solid #ef4444; margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #dc2626; margin: 0 0 8px;">Time is Running Out</h2>
          <p style="font-size: 14px; color: #991b1b; margin: 0;">You're subscriber #${data.totalSubscribers + 200} - Don't lose your exclusive access</p>
        </div>
        
        <h3 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin: 0 0 16px;">What You'll Miss</h3>
        <p style="font-size: 16px; line-height: 1.6; color: #666; margin: 0; max-width: 480px; margin: 0 auto;">
          While you're thinking about it, your competitors are already planning their store upgrades. Every day you wait is another day they get ahead.
        </p>
      </div>

      <!-- Social Proof -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 32px; margin-bottom: 48px;">
        <h3 style="font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 24px; text-align: center;">What Other Entrepreneurs Are Saying</h3>
        
        <div style="display: grid; gap: 20px;">
          <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
            <p style="font-size: 14px; color: #1a1a1a; margin: 0 0 8px; font-style: italic; line-height: 1.5;">
              "I've been waiting for something like Liquidfy for years. The modules are game-changing for my Shopify store."
            </p>
            <p style="font-size: 12px; color: #666; margin: 0; font-weight: 500;">— Sarah Chen, Fashion Store Owner</p>
          </div>
          
          <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
            <p style="font-size: 14px; color: #1a1a1a; margin: 0 0 8px; font-style: italic; line-height: 1.5;">
              "This is exactly what my store needed. The conversion rate improvements are incredible."
            </p>
            <p style="font-size: 12px; color: #666; margin: 0; font-weight: 500;">— Mike Rodriguez, Electronics Store</p>
          </div>
        </div>
      </div>

      <!-- FOMO Section -->
      <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 48px;">
        <h3 style="color: white; font-size: 20px; font-weight: 600; margin: 0 0 16px;">Don't Let This Opportunity Slip Away</h3>
        <div style="color: #d1d5db; font-size: 14px; line-height: 1.6;">
          <div style="margin-bottom: 8px;">⚡ <strong>${data.totalSubscribers + 200} entrepreneurs</strong> are already on the waitlist</div>
          <div style="margin-bottom: 8px;">💰 <strong>50% discount</strong> expires in ${data.daysLeft} days</div>
          <div>🚀 <strong>7-day early access</strong> before public launch</div>
        </div>
      </div>

      <!-- CTA Section -->
      <div style="text-align: center;">
        <a href="https://liquidfy.app/early-access" style="display: inline-block; background: #ef4444; color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 500; font-size: 16px; transition: background-color 0.2s;">
          Secure Your Spot Now
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 14px; color: #666; margin: 0 0 8px;">This is your final reminder - Don't miss out!</p>
      <p style="font-size: 12px; color: #999; margin: 0;">
        © 2024 Liquidfy. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
  `
}

// Template 3: Launch Campaign (Redesigned)
export const LAUNCH_TEMPLATE: EmailTemplate = {
  id: 'launch-campaign',
  name: 'Launch Campaign',
  description: 'Annonce officielle du lancement avec code de réduction',
  category: 'launch',
  variables: ['totalSubscribers'],
  subject: '🚀 Liquidfy is Live - Your Early Access Starts NOW!',
  html: (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Liquidfy is Live - Early Access</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #fafafa; color: #1a1a1a;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 48px 32px; text-align: center;">
      <div style="width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
        <span style="color: white; font-size: 28px; font-weight: 700;">L</span>
      </div>
      <h1 style="color: white; font-size: 32px; font-weight: 600; margin: 0 0 12px; letter-spacing: -0.5px;">We're Live!</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0; font-weight: 400;">Your early access starts now</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 48px 32px;">
      
      <!-- Success Message -->
      <div style="text-align: center; margin-bottom: 48px;">
        <div style="background: #f0fdf4; border-radius: 12px; padding: 24px; border-left: 4px solid #10b981; margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #059669; margin: 0 0 8px;">Congratulations!</h2>
          <p style="font-size: 14px; color: #047857; margin: 0;">You're subscriber #${data.totalSubscribers + 200} - Your early access is active</p>
        </div>
        
        <h3 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin: 0 0 16px;">The moment you've been waiting for</h3>
        <p style="font-size: 16px; line-height: 1.6; color: #666; margin: 0; max-width: 480px; margin: 0 auto;">
          Liquidfy is now officially live! As a valued waitlist member, you now have exclusive access to our complete library of premium e-commerce modules.
        </p>
      </div>

      <!-- Discount Code -->
      <div style="background: #fef3c7; border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 48px;">
        <h3 style="font-size: 20px; font-weight: 600; color: #92400e; margin: 0 0 16px;">Your 50% Launch Discount is Active</h3>
        <div style="background: white; border-radius: 8px; padding: 24px; border: 2px dashed #f59e0b; margin-bottom: 16px;">
          <p style="font-size: 14px; color: #92400e; margin: 0 0 8px; font-weight: 500;">Use Code:</p>
          <p style="font-size: 28px; font-weight: 700; color: #92400e; margin: 0 0 8px; letter-spacing: 2px;">EARLY50</p>
          <p style="font-size: 12px; color: #a16207; margin: 0; font-weight: 500;">Valid for the next 48 hours only</p>
        </div>
        <p style="font-size: 14px; color: #a16207; margin: 0; font-weight: 500;">This exclusive discount is only available to waitlist members like you!</p>
      </div>

      <!-- Features -->
      <div style="display: grid; gap: 24px; margin-bottom: 48px;">
        <div style="background: #f0f9ff; border-radius: 12px; padding: 24px; border-left: 4px solid #3b82f6;">
          <h4 style="font-size: 16px; font-weight: 600; color: #1e40af; margin: 0 0 8px;">100+ Premium Modules</h4>
          <p style="font-size: 14px; color: #1d4ed8; margin: 0; line-height: 1.5;">Product carousels, comparison tables, trust badges, urgency timers</p>
        </div>
        
        <div style="background: #f0f9ff; border-radius: 12px; padding: 24px; border-left: 4px solid #3b82f6;">
          <h4 style="font-size: 16px; font-weight: 600; color: #1e40af; margin: 0 0 8px;">120+ Shopify Sections</h4>
          <p style="font-size: 14px; color: #1d4ed8; margin: 0; line-height: 1.5;">Ready-to-use .liquid sections for any theme</p>
        </div>
        
        <div style="background: #f0f9ff; border-radius: 12px; padding: 24px; border-left: 4px solid #3b82f6;">
          <h4 style="font-size: 16px; font-weight: 600; color: #1e40af; margin: 0 0 8px;">Revenue Optimization</h4>
          <p style="font-size: 14px; color: #1d4ed8; margin: 0; line-height: 1.5;">Cart abandonment recovery, social proof widgets</p>
        </div>
      </div>

      <!-- FOMO Section -->
      <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 48px;">
        <h3 style="color: white; font-size: 20px; font-weight: 600; margin: 0 0 16px;">Don't Wait - Others Are Already Getting Started</h3>
        <div style="color: #d1d5db; font-size: 14px; line-height: 1.6;">
          <div style="margin-bottom: 8px;">🔥 <strong>${data.totalSubscribers + 200} entrepreneurs</strong> are already upgrading their stores</div>
          <div style="margin-bottom: 8px;">⏰ <strong>48-hour discount</strong> expires soon</div>
          <div>🚀 <strong>7-day early access</strong> before public pricing</div>
        </div>
      </div>

      <!-- CTA Section -->
      <div style="text-align: center;">
        <a href="https://liquidfy.app/login" style="display: inline-block; background: #10b981; color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 500; font-size: 16px; transition: background-color 0.2s;">
          Access Liquidfy Now
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 14px; color: #666; margin: 0 0 8px;">Thank you for being part of this journey from day one!</p>
      <p style="font-size: 12px; color: #999; margin: 0;">
        © 2024 Liquidfy. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
  `
}

// Template 4: Follow-up Campaign
export const FOLLOW_UP_TEMPLATE: EmailTemplate = {
  id: 'follow-up-campaign',
  name: 'Follow-up Campaign',
  description: 'Rappel pour les non-ouverts avec nouvelle offre',
  category: 'follow-up',
  variables: ['totalSubscribers'],
  subject: 'Last Chance: 24 Hours Left for Early Access',
  html: (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Last Chance - Early Access Expires</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #fafafa; color: #1a1a1a;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 48px 32px; text-align: center;">
      <div style="width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
        <span style="color: white; font-size: 28px; font-weight: 700;">L</span>
      </div>
      <h1 style="color: white; font-size: 32px; font-weight: 600; margin: 0 0 12px; letter-spacing: -0.5px;">Last Chance</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0; font-weight: 400;">24 hours left for early access</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 48px 32px;">
      
      <!-- Urgency Message -->
      <div style="text-align: center; margin-bottom: 48px;">
        <div style="background: #fef3c7; border-radius: 12px; padding: 24px; border-left: 4px solid #f59e0b; margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #92400e; margin: 0 0 8px;">Final Reminder</h2>
          <p style="font-size: 14px; color: #a16207; margin: 0;">This is your last opportunity to secure early access</p>
        </div>
        
        <h3 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin: 0 0 16px;">Don't Miss Out on This Opportunity</h3>
        <p style="font-size: 16px; line-height: 1.6; color: #666; margin: 0; max-width: 480px; margin: 0 auto;">
          We noticed you haven't accessed your early access yet. In 24 hours, this exclusive offer will be gone forever.
        </p>
      </div>

      <!-- Special Offer -->
      <div style="background: #fef3c7; border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 48px;">
        <h3 style="font-size: 20px; font-weight: 600; color: #92400e; margin: 0 0 16px;">Special Last-Minute Offer</h3>
        <div style="background: white; border-radius: 8px; padding: 24px; border: 2px dashed #f59e0b; margin-bottom: 16px;">
          <p style="font-size: 14px; color: #92400e; margin: 0 0 8px; font-weight: 500;">Use Code:</p>
          <p style="font-size: 28px; font-weight: 700; color: #92400e; margin: 0 0 8px; letter-spacing: 2px;">LAST24</p>
          <p style="font-size: 12px; color: #a16207; margin: 0; font-weight: 500;">60% OFF - Valid for 24 hours only</p>
        </div>
        <p style="font-size: 14px; color: #a16207; margin: 0; font-weight: 500;">This is our final offer - don't let it slip away!</p>
      </div>

      <!-- What You Get -->
      <div style="display: grid; gap: 20px; margin-bottom: 48px;">
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border-left: 4px solid #667eea;">
          <h4 style="font-size: 16px; font-weight: 600; color: #1e40af; margin: 0 0 8px;">Complete Module Library</h4>
          <p style="font-size: 14px; color: #1d4ed8; margin: 0; line-height: 1.5;">Access to all 100+ premium modules and 120+ sections</p>
        </div>
        
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border-left: 4px solid #667eea;">
          <h4 style="font-size: 16px; font-weight: 600; color: #1e40af; margin: 0 0 8px;">Priority Support</h4>
          <p style="font-size: 14px; color: #1d4ed8; margin: 0; line-height: 1.5;">Dedicated support and feature requests</p>
        </div>
        
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border-left: 4px solid #667eea;">
          <h4 style="font-size: 16px; font-weight: 600; color: #1e40af; margin: 0 0 8px;">Lifetime Access</h4>
          <p style="font-size: 14px; color: #1d4ed8; margin: 0; line-height: 1.5;">One-time payment, lifetime access to all updates</p>
        </div>
      </div>

      <!-- Final CTA -->
      <div style="text-align: center;">
        <a href="https://liquidfy.app/final-chance" style="display: inline-block; background: #f59e0b; color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 500; font-size: 16px; transition: background-color 0.2s;">
          Claim Your 60% Discount
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 14px; color: #666; margin: 0 0 8px;">This is truly your last chance - act now!</p>
      <p style="font-size: 12px; color: #999; margin: 0;">
        © 2024 Liquidfy. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
  `
}

// Export all templates
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  EARLY_ACCESS_TEMPLATE,
  URGENCY_TEMPLATE,
  LAUNCH_TEMPLATE,
  FOLLOW_UP_TEMPLATE
]

// Helper function to get template by ID
export function getTemplateById(id: string): EmailTemplate | undefined {
  return EMAIL_TEMPLATES.find(template => template.id === id)
}

// Helper function to get templates by category
export function getTemplatesByCategory(category: string): EmailTemplate[] {
  return EMAIL_TEMPLATES.filter(template => template.category === category)
}

// Helper function to render template with data
export function renderTemplate(templateId: string, data: any): string {
  const template = getTemplateById(templateId)
  if (!template) {
    throw new Error(`Template not found: ${templateId}`)
  }
  return template.html(data)
} 