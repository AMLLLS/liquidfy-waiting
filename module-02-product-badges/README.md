# Product Badge Set Module

## Overview
A flexible badge system for displaying product highlights, certifications, and key selling points. Perfect for e-commerce product pages and marketing materials.

## Features
- **Responsive Design**: Adapts to different screen sizes with smart text scaling
- **Horizontal Scrolling**: Handles overflow gracefully on mobile devices
- **Hover Effects**: Subtle lift animation for better interactivity
- **Icon Support**: Emoji and symbol integration for visual appeal
- **Multiple Contexts**: 5 different industry variations included

## Variations

### Version 1: Korean Skincare Products
- **Colors**: Rose theme (soft pink backgrounds)
- **Context**: Beauty and skincare products
- **Badges**: Best-selling serum, Korean origin

### Version 2: Fitness & Wellness Products  
- **Colors**: Green theme (natural/organic feel)
- **Context**: Health and fitness supplements
- **Badges**: Protein powder, USA made, natural ingredients

### Version 3: Tech & Software Products
- **Colors**: Purple theme (tech/innovation)
- **Context**: SaaS and software products
- **Badges**: AI-powered, enterprise security

### Version 4: Organic Food Products
- **Colors**: Yellow/amber theme (warm/organic)
- **Context**: Food and beverage products
- **Badges**: Single origin, fair trade certifications

### Version 5: Fashion & Luxury
- **Colors**: Rose/pink theme (luxury feel)
- **Context**: Fashion and luxury goods
- **Badges**: Italian craftsmanship, limited edition

## Usage
Each badge set can be used independently. Simply copy the HTML structure and modify the content and colors as needed.

```html
<div class="badge-container">
    <div class="badge" style="background-color: [color]; color: [text-color];">
        <span class="badge-text">Your Badge Text</span>
    </div>
</div>
```

## Customization
- **Colors**: Modify background and text colors in the style attribute
- **Icons**: Add emoji or replace with SVG icons
- **Content**: Update badge text for your specific products
- **Size**: Adjust padding and font-size for different scales

## Technical Notes
- Uses Flexbox for horizontal layout
- Implements CSS hover states for interactivity
- Mobile-first responsive design with breakpoints
- Overflow handling with horizontal scroll on small screens
- No external dependencies (except Tailwind CDN for demo)