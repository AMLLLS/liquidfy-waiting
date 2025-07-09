# Email Campaign System Guide

## Overview

The new Email Campaign System provides a complete solution for managing email marketing campaigns with a professional template library, visual editor, and campaign management interface. The system is designed to convert waitlist subscribers into paying customers through strategic email sequences.

## Features

### 🎨 Professional Template Library
- **4 Pre-designed Templates**: Early Access, Urgency, Launch, and Follow-up campaigns
- **Minimalist Design**: Inspired by Shopify, Framer, and StoreConversionKit
- **Responsive Layout**: Optimized for all email clients
- **Variable Support**: Dynamic content with subscriber count and countdown timers

### 📧 Template Categories

#### 1. Early Access Announcement
- **Purpose**: Announce early access opening
- **Timing**: When early access goes live
- **Key Elements**: Exclusivity, feature highlights, social proof
- **Variables**: `totalSubscribers`, `daysLeft`

#### 2. Urgency Campaign
- **Purpose**: Create FOMO and urgency
- **Timing**: 3-4 days before launch
- **Key Elements**: Countdown, social proof, what they'll miss
- **Variables**: `totalSubscribers`, `daysLeft`

#### 3. Launch Campaign
- **Purpose**: Official launch announcement
- **Timing**: Day of launch
- **Key Elements**: Discount code, congratulations, immediate CTA
- **Variables**: `totalSubscribers`

#### 4. Follow-up Campaign
- **Purpose**: Final reminder for non-responders
- **Timing**: 24 hours before access expires
- **Key Elements**: Last chance offer, increased discount
- **Variables**: `totalSubscribers`

### 🔧 Campaign Management Interface

#### Dashboard Features
- **Campaign Overview**: List all campaigns with status and performance
- **Template Library**: Browse and preview all available templates
- **Campaign Creation**: Step-by-step campaign setup
- **Performance Tracking**: Open rates, click rates, and delivery stats

#### Security Features
- **Password Protection**: Admin-only access
- **API Authentication**: Secure headers for all operations
- **Confirmation Dialogs**: Prevent accidental sends
- **Isolated Access**: Separate from public landing page

## Usage Instructions

### 1. Accessing the Campaign Manager

1. Navigate to `/campaigns` in your browser
2. Enter the admin password (configured in `lib/admin-config.ts`)
3. You'll be redirected to the campaign dashboard

### 2. Creating a New Campaign

1. **Click "Create New Campaign"** on the dashboard
2. **Browse Templates**: Use the template library to find the right template
3. **Preview Template**: Click "Preview" to see how the email looks
4. **Customize**: Edit the HTML code if needed
5. **Configure Campaign**:
   - Campaign name
   - Subject line (pre-filled from template)
   - Recipient count
   - Schedule date (optional)
6. **Create Campaign**: Click "Create Campaign" to save

### 3. Sending Campaigns

1. **Review Campaign**: Check all details before sending
2. **Send Campaign**: Click "Send" on draft campaigns
3. **Confirmation**: Confirm the action in the dialog
4. **Monitor**: Track sending progress and results

### 4. Template Customization

#### Visual Editor
- **Preview Tab**: See how the email looks
- **Code Tab**: Edit HTML directly
- **Settings Tab**: Configure variables and metadata

#### Custom Variables
Each template supports dynamic variables:
- `totalSubscribers`: Number of subscribers (auto-calculated)
- `daysLeft`: Days until launch (for urgency campaigns)

#### HTML Editing
- Templates use inline CSS for maximum compatibility
- Responsive design with mobile optimization
- Professional styling inspired by top SaaS companies

## API Integration

### Sending Campaigns via API

```javascript
// Example API call
const response = await fetch('/api/email-campaign', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-admin-password': 'your-admin-password'
  },
  body: JSON.stringify({
    templateId: 'urgency-campaign',
    subject: 'Custom Subject Line',
    variables: {
      daysLeft: 3
    },
    recipientCount: 1000
  })
})
```

### API Endpoints

#### GET /api/email-campaign
- **Purpose**: Get subscriber count
- **Headers**: `x-admin-password` required
- **Response**: `{ totalSubscribers: number }`

#### POST /api/email-campaign
- **Purpose**: Send email campaign
- **Headers**: `x-admin-password` required
- **Body**:
  ```json
  {
    "templateId": "string",
    "customHtml": "string (optional)",
    "subject": "string (optional)",
    "variables": "object (optional)",
    "recipientCount": "number (optional)"
  }
  ```

## Campaign Strategy

### Recommended Sequence

1. **Early Access Announcement** (Day 0)
   - Welcome subscribers to early access
   - Highlight exclusivity and benefits
   - Drive immediate engagement

2. **Urgency Campaign** (Day -3)
   - Create FOMO with countdown
   - Show social proof and testimonials
   - Emphasize what they'll miss

3. **Launch Campaign** (Day 0)
   - Official launch announcement
   - Provide discount code
   - Strong call-to-action

4. **Follow-up Campaign** (Day +1)
   - Target non-responders
   - Offer increased discount
   - Final opportunity

### Best Practices

#### Timing
- Send emails between 9 AM - 11 AM or 2 PM - 4 PM
- Consider your target audience's timezone
- Space campaigns 2-3 days apart

#### Content
- Keep subject lines under 50 characters
- Use emojis strategically for visual appeal
- Include clear call-to-action buttons
- Test on multiple email clients

#### Personalization
- Use subscriber count for social proof
- Include countdown timers for urgency
- Reference their waitlist position

## Technical Setup

### Environment Variables

```env
# Email Service
RESEND_API_KEY=your_resend_api_key

# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key

# Admin Security
ADMIN_PASSWORD=your_secure_password
```

### Database Tables

#### subscribers
```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### email_campaigns
```sql
CREATE TABLE email_campaigns (
  id SERIAL PRIMARY KEY,
  template_id VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  recipient_count INTEGER NOT NULL,
  sent_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'draft',
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Security Considerations

### Password Protection
- Change default password in production
- Use strong, unique passwords
- Store passwords securely in environment variables

### API Security
- All API endpoints require authentication
- Use HTTPS in production
- Monitor API usage for suspicious activity

### Data Protection
- Subscriber emails are stored securely
- Campaign data is logged for analytics
- No sensitive data is exposed in client-side code

## Troubleshooting

### Common Issues

#### Campaign Not Sending
- Check Resend API key configuration
- Verify database connection
- Ensure admin password is correct

#### Template Not Rendering
- Check template ID exists
- Verify variable names match template
- Test HTML in email client

#### Performance Issues
- Reduce batch size for large campaigns
- Add delays between batches
- Monitor API rate limits

### Error Messages

- **"Template not found"**: Check template ID spelling
- **"No subscribers found"**: Verify database has subscribers
- **"Unauthorized"**: Check admin password
- **"Failed to send campaign"**: Check email service configuration

## Support

For technical support or questions about the email campaign system:

1. Check the error logs in your application
2. Verify all environment variables are set
3. Test with a small recipient list first
4. Review the API documentation

## Future Enhancements

### Planned Features
- A/B testing for subject lines
- Advanced segmentation
- Email analytics dashboard
- Template builder interface
- Automated campaign sequences

### Integration Opportunities
- CRM integration
- Analytics platforms
- Marketing automation tools
- Customer support systems 