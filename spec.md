# BillKaro PWA

## Current State
The BillKaro website is a React + Vite app running on the Internet Computer. It has:
- A full promotional site with Three.js hero, Shyama chatbot, features, pricing, testimonials, and contact sections
- Multi-language support (Hindi, English, Marwadi, Gujarati)
- SEO meta tags in index.html
- No PWA support (no manifest, no service worker, no installability)

## Requested Changes (Diff)

### Add
- `manifest.json` in `src/frontend/public/` — PWA web app manifest with BillKaro branding (name, icons, theme color orange, standalone display mode, start_url)
- `sw.js` service worker in `src/frontend/public/` — caches core assets for offline support, serves cached version when offline
- PWA icon at 192x192 and 512x512 in `src/frontend/public/assets/generated/`
- PWA meta tags in `index.html`: `<link rel="manifest">`, `<meta name="theme-color">`, `<meta name="apple-mobile-web-app-capable">`, apple touch icon, mobile app meta tags
- Service worker registration in `main.tsx`

### Modify
- `index.html` — add PWA link/meta tags (manifest, theme-color, apple-mobile-web-app-*)
- `main.tsx` — add service worker registration after app mounts

### Remove
- Nothing removed

## Implementation Plan
1. Generate BillKaro PWA icons at 192x192 and 512x512 (orange/purple gradient with "BK" or BillKaro branding)
2. Create `src/frontend/public/manifest.json` with correct PWA fields
3. Create `src/frontend/public/sw.js` service worker with cache-first strategy for static assets and network-first for API calls
4. Update `src/frontend/index.html` to add all required PWA meta tags and manifest link
5. Update `src/frontend/src/main.tsx` to register the service worker on load
