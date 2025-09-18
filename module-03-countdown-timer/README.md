# Countdown Timer Module

## Overview
A responsive countdown timer component perfect for creating urgency in sales, launches, and time-limited offers. Features multiple color themes and contexts for different use cases.

## Features
- **Real-time Countdown**: Live JavaScript countdown functionality
- **Responsive Design**: Adapts seamlessly to all screen sizes
- **Hover Effects**: Interactive elements with smooth animations
- **Multiple Themes**: 5 different color schemes and contexts
- **Accessibility**: Clear typography and high contrast ratios
- **Customizable**: Easy to modify colors, text, and timing

## Variations

### Version 1: Welcome Offer (Original)
- **Colors**: Rose/red theme (#FFE5E5, #8E1919)
- **Context**: Welcome discounts and new user offers
- **Icon**: None (clean text focus)

### Version 2: Flash Sale
- **Colors**: Green theme (#D1FAE5, #064E3B)
- **Context**: Quick sales and limited-time promotions
- **Icon**: ⚡ Lightning bolt for urgency

### Version 3: Software Launch
- **Colors**: Purple theme (#EDE9FE, #3730A3)
- **Context**: Product launches and tech releases
- **Icon**: 🚀 Rocket for launch excitement

### Version 4: Early Bird Special
- **Colors**: Blue theme (#DBEAFE, #1E3A8A)
- **Context**: Pre-launch and early access offers
- **Icon**: 🐦 Bird for early bird concept

### Version 5: Black Friday
- **Colors**: Dark theme (#1F2937, #F59E0B)
- **Context**: Major sales events and holidays
- **Icon**: 🖤 Heart for Black Friday branding

## Usage
Each countdown timer is self-contained and can be used independently:

```html
<div class="countdown-announcement-bar" style="background: [bg-color]; color: [text-color];">
    <div class="countdown-content">
        <div class="countdown-text">Your Message Here</div>
        <div class="countdown-wrapper">
            <!-- Time units here -->
        </div>
    </div>
</div>
```

## JavaScript Functionality
The included JavaScript provides:
- Automatic countdown decrementing every second
- Proper time format handling (HH:MM:SS)
- Multiple independent timers on same page
- Automatic reset when reaching zero

## Customization Options

### Colors
- Modify `background` and `color` in the style attributes
- Update `border-color` for the time units
- Ensure sufficient contrast for accessibility

### Content
- Change the countdown message text
- Add or remove emoji icons
- Adjust initial time values

### Styling
- Modify border-radius for different corner styles
- Adjust padding and font sizes
- Update hover effects and animations

## Technical Notes
- Uses CSS Flexbox for responsive layout
- JavaScript setInterval for real-time updates
- Mobile-first responsive breakpoints
- No external dependencies (except Tailwind CDN for demo)
- Cross-browser compatible time formatting

## Integration Tips
- Set actual target date/time for production use
- Consider timezone handling for global audiences
- Add callback functions for when countdown reaches zero
- Implement server-side validation for actual offer expiry