# BillKaro — Version 14

## Current State
A promotional website for BillKaro grocery billing app with:
- Hero section with Particle.js canvas animation
- Features, Pricing, Testimonials, Walkthrough, Contact, Footer sections
- Shyama AI chatbot with Hindi/English language toggle
- Translations file supports `en` and `hi` (Lang type)
- index.html has no SEO meta tags
- No WhatsApp "Get Demo" CTA
- No limited time offer banner/section
- No push notification opt-in
- Pricing section shows ₹1/invoice but no monthly bundle offer

## Requested Changes (Diff)

### Add
1. **SEO meta tags** in `index.html`: title, description, keywords (kirana billing, GST invoice app, grocery billing India, free GST app Rajasthan), Open Graph tags, canonical URL
2. **Structured data** (JSON-LD schema) for SoftwareApplication in index.html
3. **Limited time Sunday offer banner** — sticky top announcement bar or prominent hero section badge: "50 Free Credits for First 50 Customers — Sunday Offer!", countdown timer to Sunday midnight, claim via WhatsApp CTA
4. **Clear pricing calculator/highlight** in Pricing section: "Generate 100 invoices/month = Pay only ₹100" with a visual calculator slider or highlight card
5. **WhatsApp "Get Demo" CTA** — floating or section-level button that opens WhatsApp with pre-filled message: "Hi, I want a BillKaro demo"
6. **Rajasthani (raj) and Gujarati (gu) languages** — add to Lang type and translations.ts, add language buttons to Navbar
7. **Push notification opt-in** — on page load (after 3 seconds), show a non-intrusive bottom bar asking user to opt in for offer notifications; uses browser Notification API; stores preference in localStorage; shows toast confirmation

### Modify
- `translations.ts`: add `raj` and `gu` keys with all existing strings translated
- `Navbar.tsx`: extend language toggle to show 4 options (EN / HI / RAJ / GUJ)
- `Pricing.tsx`: add monthly bundle highlight card
- `Hero.tsx`: add Sunday offer badge/banner
- `index.html`: add full SEO meta tags

### Remove
- Nothing removed

## Implementation Plan
1. Update `index.html` with SEO meta tags, Open Graph, JSON-LD structured data
2. Update `translations.ts` — add `raj` (Rajasthani) and `gu` (Gujarati) language objects with all keys
3. Update `App.tsx` — extend Lang type import handling
4. Update `Navbar.tsx` — 4-language toggle (EN/HI/RAJ/GUJ)
5. Create `OfferBanner.tsx` — sticky top announcement bar with countdown to next Sunday midnight, "50 Free Credits" offer, WhatsApp claim CTA
6. Create `PushNotificationBar.tsx` — bottom opt-in bar appearing after 3s delay, uses Notification API, saves preference to localStorage
7. Update `Pricing.tsx` — add "100 invoices = ₹100" highlight box/calculator
8. Add `WhatsAppDemoButton.tsx` — floating WhatsApp "Get Demo" button (bottom-right), opens wa.me link with pre-filled message
9. Wire all new components into `App.tsx`
