# BillKaro

## Current State
- Full promotional website with Hero, WhySection, Features, Screenshots, WalkthroughDemo, FlipbookDemo, Pricing, Contact, Footer, ShyamaAI sections
- Screenshots.tsx: 7 scrollable phone-frame screenshots with blur overlays
- FlipbookDemo.tsx: 3D animated flipbook with touch/drag support, text-only pages
- Hero.tsx: gradient hero with floating phone image, no particle effects
- WalkthroughDemo.tsx: animated walkthrough with CartoonCharacter (has a 'store' screen step)
- No testimonials section exists

## Requested Changes (Diff)

### Add
- ParticleJS (tsparticles) in Hero section — particles should match the orange-purple gradient theme (orange/pink/purple colors, medium density, floating/connecting particles effect)
- Testimonials section with animated carousel — shows only: star rating (1-5 stars), person's name, and their message. No company names, no logos, no designations. Auto-scrolling carousel with smooth CSS/motion animation.
- Animated text carousel in testimonials or as a standalone marquee/crossoul section showing BillKaro feature highlights or taglines cycling through

### Modify
- App.tsx: remove Screenshots and FlipbookDemo imports and usage
- WalkthroughDemo: remove any reference to real screenshot images in store configuration screen — replace with illustrated/SVG mockup (no real screenshots)
- Hero.tsx: add tsparticles canvas behind content

### Remove
- Screenshots.tsx section entirely (remove from App.tsx)
- FlipbookDemo.tsx section entirely (remove from App.tsx)
- Store configuration screenshot from WalkthroughDemo (replace with illustrated screen)

## Implementation Plan
1. Install @tsparticles/react and @tsparticles/slim packages
2. Update Hero.tsx to add tsparticles canvas with orange/purple/pink theme
3. Create Testimonials.tsx with animated auto-scrolling carousel showing rating stars + name + message only
4. Create animated text crossoul (marquee) of BillKaro feature highlights
5. Remove Screenshots component from App.tsx
6. Remove FlipbookDemo component from App.tsx  
7. In WalkthroughDemo, replace store config screenshot (real image) with an SVG/illustrated mockup screen
8. Add Testimonials section in App.tsx between WalkthroughDemo and Pricing
