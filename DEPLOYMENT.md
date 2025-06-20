# 🚀 Deployment Guide - Liquify Coming Soon

## Quick Deploy to Vercel (Recommended)

### 1. **Connect to Vercel**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure everything

### 2. **Environment Variables** (Optional)
If you want email functionality:
1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
2. Get your API key from Resend dashboard
3. In Vercel project settings, add:
   - `RESEND_API_KEY` = your_resend_api_key

### 3. **Deploy**
- Vercel will automatically deploy on every push to main branch
- Your site will be live at `https://your-project.vercel.app`

## Alternative Deployment Options

### Netlify
1. Connect GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Railway
1. Connect GitHub repo to Railway
2. Railway auto-detects Next.js
3. Add environment variables in Railway dashboard

## Email Service Setup (Optional)

### Using Resend (Recommended)
- **Free tier**: 3,000 emails/month
- **Setup**: Sign up → Get API key → Add to environment variables
- **Features**: Welcome emails, tracking, analytics

### Alternative Email Services
You can replace Resend with:
- **Mailgun**: Update `app/api/subscribe/route.ts`
- **SendGrid**: Update `app/api/subscribe/route.ts`
- **AWS SES**: Update `app/api/subscribe/route.ts`

## Database Integration (Production)

For production, replace the in-memory storage with a real database:

### Supabase (Free tier available)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// In your API route:
const { data, error } = await supabase
  .from('subscribers')
  .insert([{ email }])
```

### PlanetScale (MySQL)
```typescript
import { PlanetScaleDatabase } from 'drizzle-orm/planetscale-serverless'

// Add to your API route
```

## Performance Optimizations

### Already Included
- ✅ Next.js 14 with App Router
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Font optimization (Inter)
- ✅ CSS optimization with Tailwind

### Additional Optimizations
- Add analytics (Vercel Analytics, Google Analytics)
- Add error monitoring (Sentry)
- Add performance monitoring

## Custom Domain

### Vercel
1. Go to project settings
2. Add your domain
3. Configure DNS records as shown

### Other Platforms
Follow platform-specific domain configuration guides.

## Monitoring & Analytics

### Vercel Analytics (Recommended)
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Security Considerations

### Already Implemented
- ✅ Input validation with Zod
- ✅ Rate limiting (Next.js built-in)
- ✅ CSRF protection
- ✅ Environment variable security

### Additional Security
- Add Helmet for security headers
- Implement proper CORS if needed
- Add request rate limiting for API routes

## Backup & Recovery

### Email List Backup
- Export subscriber data regularly
- Store in secure location
- Consider automated backups

### Code Backup
- GitHub repository (already done)
- Regular commits
- Tag releases

## Troubleshooting

### Common Issues
1. **Build fails**: Check dependencies in `package.json`
2. **API not working**: Verify environment variables
3. **Emails not sending**: Check Resend API key and domain verification
4. **Styling issues**: Verify Tailwind CSS configuration

### Debug Mode
```bash
npm run dev
```
Check browser console and terminal for errors.

## Support

- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Resend**: [resend.com/docs](https://resend.com/docs)
- **Tailwind**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

**🎉 Ready to launch your Liquify coming soon page!** 