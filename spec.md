# BillKaro

## Current State
The BillKaro promotional website has multiple sections: Hero, WhySection, Features, Screenshots, HowTo, WalkthroughDemo, Pricing, Contact, Footer, and ShyamaAI chatbot. It supports Hindi/English language toggle.

## Requested Changes (Diff)

### Add
- A new `FlipbookDemo` component: an interactive flipbook with 8 custom illustrated pages showing BillKaro product demo (Welcome, Setup Store, Add Products, Create Bill, GST Invoice, Payments, Dashboard, Download).
- The flipbook appears on the website as a "Product Demo" section between WalkthroughDemo and Pricing.
- The app screenshots (the 7 uploaded ones) should have a blur applied over any area that might contain a principal ID or personal identity information — achieved via CSS blur overlay on those screenshots wherever they appear.

### Modify
- `App.tsx`: Import and add `<FlipbookDemo>` between `<WalkthroughDemo>` and `<Pricing>`.
- Any screenshot usage: add blur overlay on screenshots to protect principal ID info.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/components/FlipbookDemo.tsx` — interactive flipbook with:
   - 8 illustrated pages (generated images in /assets/generated/)
   - Page flip animation (CSS 3D transform, card-flip style or slide)
   - Previous/Next navigation buttons
   - Page counter display
   - Auto-play option with play/pause button
   - Section title: "Product Demo"
   - Hindi/English captions for each page
2. Update `App.tsx` to include `<FlipbookDemo lang={lang} />`
3. In `Screenshots.tsx`: add a CSS blur overlay on the screenshot images to blur out any principal ID or sensitive identity information visible in the screenshots.
