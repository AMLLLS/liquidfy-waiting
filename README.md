# Liquify Coming Soon Page

A modern, interactive coming soon page for Liquify with email collection and database storage.

## Features

- 🎨 Modern design with animated gradients
- 📱 100% responsive (mobile-first)
- ✉️ Email subscription with database storage
- 🎉 Confetti success animation
- 🔒 Email validation and duplicate prevention
- 📊 Analytics tracking (IP, User Agent)
- 💌 Automated welcome emails via Resend

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom gradients
- **Animations**: Framer Motion
- **Database**: Vercel Postgres (production) / In-memory (fallback)
- **Email**: Resend API
- **Validation**: Zod
- **Forms**: React Hook Form
- **Deployment**: Vercel

## 🚀 Quick Start

1. **Clone and install:**
```bash
git clone <your-repo>
cd liquify-coming-soon
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```

3. **Run development server:**
```bash
npm run dev
```

## 📧 Email Storage Setup (CRITICAL!)

**⚠️ IMPORTANT**: The current setup stores emails in memory, which means they're lost on every deployment. You MUST set up a database for production.

### Option 1: Vercel Postgres (Recommended - FREE)

1. **Deploy to Vercel first:**
   - Push your code to GitHub
   - Connect repository to Vercel
   - Deploy your project

2. **Add Vercel Postgres:**
   - Go to your Vercel dashboard
   - Click "Storage" → "Create Database"
   - Select "Postgres"
   - Choose default configuration
   - Database will auto-connect to your project

3. **Environment variables are auto-injected:**
   ```bash
   POSTGRES_URL="postgres://..."
   POSTGRES_PRISMA_URL="postgres://..."
   POSTGRES_URL_NON_POOLING="postgres://..."
   POSTGRES_USER="..."
   POSTGRES_HOST="..."
   POSTGRES_PASSWORD="..."
   POSTGRES_DATABASE="..."
   ```

4. **Pull environment variables locally:**
   ```bash
   npm install -g vercel@latest
   vercel env pull .env.development.local
   ```

### Option 2: Alternative Free Databases

- **Supabase**: 500MB free, includes auth & dashboard
- **Neon**: 512MB free, PostgreSQL with branching
- **PlanetScale**: MySQL serverless (500MB free)

## 📬 Email Service Setup

### Resend (Recommended - FREE tier)

1. **Sign up**: [resend.com](https://resend.com)
2. **Get API key**: Dashboard → API Keys
3. **Add to environment variables:**
   ```bash
   RESEND_API_KEY="re_..."
   ```
4. **Verify domain** (optional, for custom sender):
   - Add DNS records provided by Resend
   - Use `noreply@yourdomain.com` instead of `noreply@liquidfy.app`

**Free tier**: 3,000 emails/month, 100 emails/day

### Alternative Email Services
- **EmailJS**: Frontend-only, no server needed
- **Mailgun**: 5,000 emails/month free
- **SendGrid**: 25,000 emails/month free (requires phone verification)

## 🗄️ Database Schema

The app automatically creates this table:

```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT
);
```

## 🔧 Environment Variables

Create `.env.local` with:

```bash
# Database (auto-injected by Vercel Postgres)
POSTGRES_URL="postgresql://..."

# Email service
RESEND_API_KEY="re_..."

# Optional: Custom domain for emails
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

## 📱 Responsive Design

- **Mobile**: Optimized clamp() typography, minimal padding
- **Tablet**: Balanced spacing and component sizes  
- **Desktop**: Full animations, hover effects, larger typography
- **Typography**: Fluid scaling with `clamp()` for all screen sizes

## 🎯 Performance

- **Lighthouse Score**: 95+ 
- **Bundle Size**: ~146KB optimized
- **Database**: Connection pooling with fallback
- **Images**: Next.js Image optimization
- **Animations**: Hardware-accelerated with Framer Motion

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy
vercel

# Add database after deployment
# Go to Vercel Dashboard → Storage → Create Database → Postgres
```

### Other Platforms

For other platforms, ensure you:
1. Set up a PostgreSQL database
2. Configure environment variables
3. Install production dependencies

## 📊 Analytics & Monitoring

The app tracks:
- **Email subscriptions**: Count, timestamps
- **User data**: IP addresses, User agents (for analytics)
- **Duplicates**: Prevents duplicate email submissions
- **Database health**: Fallback to memory if DB fails

View subscriber data:
- **Vercel Dashboard**: Storage → Postgres → Data tab
- **API endpoint**: `GET /api/subscribe` (returns total count)

## 🔒 Security Features

- **Input validation**: Zod schema validation
- **SQL injection prevention**: Parameterized queries
- **Rate limiting**: Can be added with Vercel WAF
- **GDPR compliance**: Minimal data collection

## 🐛 Troubleshooting

### "Emails not saving"
- Check `POSTGRES_URL` in environment variables
- Verify database connection in Vercel dashboard
- Check API logs: `/api/subscribe` should return `usingDatabase: true`

### "Welcome emails not sending"
- Verify `RESEND_API_KEY` is set
- Check domain verification in Resend dashboard
- Check API logs for email errors

### "Responsive issues"
- Typography uses `clamp()` for fluid scaling
- Containers use `px-2 md:px-6` for responsive padding
- Slider uses `maskImage` for fade effects

## 📝 TODO for Production

- [ ] Set up Vercel Postgres database
- [ ] Configure Resend API with custom domain
- [ ] Add rate limiting for email submissions
- [ ] Set up monitoring/alerts for database
- [ ] Add unsubscribe functionality
- [ ] Implement GDPR compliance features
- [ ] Add analytics tracking (Google Analytics, etc.)

## 🤝 Contributing

This is a pre-launch page for Liquify. For issues or improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

Private project for Liquify. All rights reserved. 