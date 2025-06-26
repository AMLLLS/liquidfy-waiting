interface WelcomeEmailProps {
  email: string;
  totalSubscribers: number;
}

export const WelcomeEmailTemplate = ({ email, totalSubscribers }: WelcomeEmailProps) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Liquidfy</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .gradient-text { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .shadow { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
        .hover-scale { transition: transform 0.2s ease; }
        .hover-scale:hover { transform: scale(1.02); }
      </style>
    </head>
    <body style="background-color: #f8fafc; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);">
              
              <!-- Header with gradient -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 40px 60px; text-align: center; position: relative;">
                  <!-- Logo -->
                  <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 20px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.3);">
                    <span style="color: white; font-size: 32px; font-weight: 800; font-family: 'Inter', sans-serif;">L</span>
                  </div>
                  <h1 style="color: white; font-size: 32px; font-weight: 800; margin: 0 0 12px; font-family: 'Inter', sans-serif;">Welcome to Liquidfy!</h1>
                  <p style="color: rgba(255, 255, 255, 0.9); font-size: 18px; margin: 0; font-weight: 500;">You're now part of something amazing 🎉</p>
                </td>
              </tr>
              
              <!-- Main content -->
              <tr>
                <td style="padding: 40px;">
                  
                  <!-- Success message -->
                  <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 16px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #10b981;">
                    <h2 style="color: #065f46; font-size: 20px; font-weight: 700; margin: 0 0 8px; font-family: 'Inter', sans-serif;">🎊 Congratulations!</h2>
                    <p style="color: #047857; margin: 0; line-height: 1.6; font-weight: 500;">
                      You've secured your spot on the exclusive Liquidfy waitlist. You're subscriber #${totalSubscribers} and you'll be among the first to access our revolutionary e-commerce platform!
                    </p>
                  </div>
                  
                  <!-- What's coming section -->
                  <div style="margin-bottom: 32px;">
                    <h3 style="color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 20px; font-family: 'Inter', sans-serif;">🚀 What's Coming Your Way</h3>
                    
                    <!-- Feature grid -->
                    <div style="display: grid; gap: 16px;">
                      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
                        <h4 style="color: #92400e; font-weight: 600; margin: 0 0 8px; font-size: 16px;">⚡ 150+ Premium Modules</h4>
                        <p style="color: #a16207; margin: 0; font-size: 14px; line-height: 1.5;">Unique Shopify components designed to boost conversions</p>
                      </div>
                      
                      <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
                        <h4 style="color: #1e40af; font-weight: 600; margin: 0 0 8px; font-size: 16px;">🎨 1-Click Installation</h4>
                        <p style="color: #1d4ed8; margin: 0; font-size: 14px; line-height: 1.5;">Simple and fast setup - no coding required</p>
                      </div>
                      
                      <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #ec4899;">
                        <h4 style="color: #be185d; font-weight: 600; margin: 0 0 8px; font-size: 16px;">📈 Proven Results</h4>
                        <p style="color: #be185d; margin: 0; font-size: 14px; line-height: 1.5;">Average +27% conversion rate increase guaranteed</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Early bird bonus -->
                  <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); pointer-events: none;"></div>
                    <h3 style="color: white; font-size: 22px; font-weight: 700; margin: 0 0 12px; position: relative;">🎁 Exclusive Early Bird Benefits</h3>
                    <p style="color: #e0e7ff; margin: 0 0 20px; font-size: 16px; line-height: 1.6; position: relative;">As a waitlist member, you'll receive:</p>
                    <ul style="color: #c7d2fe; margin: 0; padding: 0; list-style: none; position: relative;">
                      <li style="margin-bottom: 8px;">✨ 50% OFF launch pricing</li>
                      <li style="margin-bottom: 8px;">🚀 7-day early access</li>
                      <li style="margin-bottom: 8px;">💎 Exclusive bonus modules</li>
                      <li>🎯 Priority support</li>
                    </ul>
                  </div>
                  
                  <!-- CTA Button -->
                  <div style="text-align: center; margin-bottom: 32px;">
                    <a href="https://liquidfy.app" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3); transition: all 0.2s ease;">
                      🌐 Visit Liquidfy.app
                    </a>
                  </div>
                  
                  <!-- Social proof -->
                  <div style="background: #f9fafb; border-radius: 12px; padding: 24px; text-align: center;">
                    <p style="color: #6b7280; margin: 0 0 12px; font-size: 14px;">Join ${totalSubscribers} other entrepreneurs waiting for launch</p>
                    <div style="display: flex; justify-content: center; gap: 8px; margin-top: 16px;">
                      <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%;"></div>
                      <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%;"></div>
                      <div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%;"></div>
                    </div>
                  </div>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background: #f8fafc; padding: 32px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="color: #6b7280; margin: 0 0 12px; font-size: 14px;">
                    Stay tuned - we're launching very soon! 🚀
                  </p>
                  <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                    © 2024 Liquidfy. All rights reserved.<br>
                    <a href="https://liquidfy.app" style="color: #4f46e5; text-decoration: none;">liquidfy.app</a>
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Template pour email de rappel de lancement
interface LaunchReminderEmailProps {
  email: string;
  daysLeft: number;
}

export const LaunchReminderEmailTemplate = ({ email, daysLeft }: LaunchReminderEmailProps) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Liquidfy Launch Coming Soon</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    </head>
    <body style="background-color: #f8fafc; margin: 0; padding: 0; font-family: 'Inter', sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px; text-align: center;">
                  <h1 style="color: white; font-size: 36px; font-weight: 800; margin: 0 0 12px;">🚨 ${daysLeft} Days Left!</h1>
                  <p style="color: rgba(255, 255, 255, 0.9); font-size: 18px; margin: 0;">Liquidfy launches in ${daysLeft} days - Are you ready?</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px; text-align: center;">
                  <h2 style="color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 20px;">The Wait Is Almost Over! 🎉</h2>
                  <p style="color: #6b7280; margin: 0 0 32px; line-height: 1.6;">
                    Liquidfy launches in just ${daysLeft} days, and as a waitlist member, you'll be among the first to access our 150+ premium e-commerce modules.
                  </p>
                  
                  <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 16px; padding: 32px; margin-bottom: 32px;">
                    <h3 style="color: white; font-size: 20px; font-weight: 700; margin: 0 0 12px;">🎁 Your Early Access Benefits</h3>
                    <ul style="color: #c7d2fe; margin: 0; padding: 0; list-style: none; text-align: left; display: inline-block;">
                      <li style="margin-bottom: 8px;">✨ 50% OFF launch pricing</li>
                      <li style="margin-bottom: 8px;">🚀 7-day exclusive early access</li>
                      <li style="margin-bottom: 8px;">💎 Bonus premium modules</li>
                      <li>🎯 Priority customer support</li>
                    </ul>
                  </div>
                  
                  <a href="https://liquidfy.app" style="display: inline-block; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);">
                    🔥 Get Ready at Liquidfy.app
                  </a>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Template pour email de lancement officiel
export const LaunchAnnouncementEmailTemplate = (email: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>🚀 Liquidfy is LIVE!</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    </head>
    <body style="background-color: #f8fafc; margin: 0; padding: 0; font-family: 'Inter', sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center;">
                  <h1 style="color: white; font-size: 40px; font-weight: 800; margin: 0 0 12px;">🚀 WE'RE LIVE!</h1>
                  <p style="color: rgba(255, 255, 255, 0.9); font-size: 20px; margin: 0;">Liquidfy is officially launched - Your early access starts NOW!</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px; text-align: center;">
                  <h2 style="color: #111827; font-size: 28px; font-weight: 700; margin: 0 0 20px;">The moment you've been waiting for... 🎉</h2>
                  <p style="color: #6b7280; margin: 0 0 32px; line-height: 1.6; font-size: 16px;">
                    Liquidfy is now officially live! As a valued waitlist member, you now have exclusive access to our complete library of 150+ premium e-commerce modules.
                  </p>
                  
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 16px; padding: 32px; margin-bottom: 32px; border-left: 4px solid #f59e0b;">
                    <h3 style="color: #92400e; font-size: 22px; font-weight: 700; margin: 0 0 12px;">🎁 Your 50% Launch Discount is Active!</h3>
                    <p style="color: #a16207; margin: 0 0 16px; font-size: 16px;">Use code: <strong>EARLY50</strong></p>
                    <p style="color: #a16207; margin: 0; font-size: 14px;">⏰ Valid for the next 48 hours only</p>
                  </div>
                  
                  <a href="https://liquidfy.app/login" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; padding: 20px 40px; border-radius: 12px; font-weight: 700; font-size: 18px; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3); margin-bottom: 24px;">
                    🎯 Access Liquidfy Now
                  </a>
                  
                  <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                    Thank you for being part of this journey from day one!
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}; 