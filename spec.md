# BillKaro – Animation Upgrade (Version 21)

## Current State
- Hero section has Three.js with floating thermal invoice cards + starfield + glowing spheres (motion/react for initial entrance)
- Features section has basic `fade-in-up` IntersectionObserver scroll reveal
- Pricing section has basic `fade-in-up` IntersectionObserver scroll reveal
- Testimonials section has motion/react viewport reveal on the heading only
- CTA buttons are plain with hover scale/opacity
- Navbar is static dark bar
- ShyamaAI chatbot button exists but has no pulsing attention animation
- WhySection, WalkthroughDemo, Contact components have minimal or no scroll animations

## Requested Changes (Diff)

### Add
1. **Scroll-triggered stagger reveals** across all sections: WhySection, Features cards (staggered), WalkthroughDemo, Testimonials cards, Pricing cards, Contact — each element fades + slides in with a stagger delay as it enters the viewport (use IntersectionObserver with motion/react `whileInView`)
2. **Hero invoice card parallax**: as user scrolls down, the Three.js camera or card positions shift slightly to create a 3D parallax depth illusion
3. **Invoice card glow pulse**: each floating invoice card has a breathing orange/purple soft glow in the Three.js scene
4. **Mouse-tracking tilt**: the hero overlay responds to mouse cursor position with a subtle perspective tilt using CSS `transform: perspective(800px) rotateX() rotateY()`
5. **Pricing number counter**: the pricing calculator number animates/counts up from 0 when the section scrolls into view
6. **Interactive pricing slider**: a draggable slider in the Pricing section where dragging changes invoice count (0–500) and the price updates in real time (₹1 per invoice)
7. **Feature card hover effects**: cards lift on hover with colored shadow + icon bounces using CSS animation
8. **Rotating gradient border** on feature card hover (orange → purple → pink)
9. **CTA button shimmer**: the primary download CTA button has a periodic shimmer/shine sweep animation every ~4s
10. **CTA button ripple**: click ripple effect on both hero CTA buttons
11. **Typewriter hero headline**: the hero headline types itself out character by character on mount
12. **Glowing hero title**: the word "BillKaro" in the hero headline glows orange on appearance
13. **Shyama chatbot pulsing ring**: the floating chatbot open button has a pulsing ring animation to draw attention
14. **Shyama speaking glow**: when Shyama is speaking (audio playing), her avatar has a soft orange glow halo

### Modify
- `Hero.tsx`: add typewriter effect to headline text, glow on "BillKaro" word, mouse tilt for the hero content div, shimmer + ripple on CTA buttons, scroll-based parallax for Three.js invoice cards
- `Features.tsx`: upgrade fade-in-up to staggered `whileInView` with framer-motion, add hover lift + bounce icon + rotating gradient border
- `Pricing.tsx`: add animated counter for the "100 invoices = ₹100" highlight, add interactive invoice count slider with real-time price update
- `Testimonials.tsx`: stagger the section entry with whileInView
- `ShyamaAI.tsx`: add pulsing ring to chat open button, add speaking glow to Shyama avatar during TTS
- `WhySection.tsx`: add scroll-triggered stagger reveal on cards
- `WalkthroughDemo.tsx`: add scroll-triggered fade-in reveal
- `Contact.tsx`: add scroll-triggered fade-in reveal
- `index.css`: add shimmer keyframe, gradient border rotation keyframe, glow pulse keyframe, ripple keyframe

### Remove
- Nothing removed — purely additive

## Implementation Plan
1. Update `index.css` with new keyframes: `shimmer`, `rotate-gradient`, `glow-pulse`, `ripple`, `tilt-enter`
2. Update `Hero.tsx`:
   - Typewriter hook for headline
   - Mouse move handler → CSS perspective tilt on hero content
   - Shimmer class on primary CTA button
   - Ripple effect onClick for both CTA buttons
   - Scroll listener → update Three.js camera Y or invoice group Y offset for parallax
   - Orange glow on "BillKaro" text in headline
3. Update `Features.tsx`:
   - Replace IntersectionObserver with `motion.div` `whileInView` stagger
   - Add hover CSS: `group-hover:shadow-[0_8px_30px_rgba(255,138,0,0.35)] group-hover:-translate-y-2`
   - Add icon bounce on hover
   - Rotating gradient border on card hover via pseudo-element or wrapper div
4. Update `Pricing.tsx`:
   - Add `useCountUp` hook for the bundle highlight number (triggers on whileInView)
   - Add `<input type="range">` slider (0–500 invoices), state-driven real-time price display
5. Update `WhySection.tsx`, `WalkthroughDemo.tsx`, `Contact.tsx`:
   - Wrap sections/cards in `motion.div` with `whileInView={{ opacity: 1, y: 0 }}` and stagger
6. Update `ShyamaAI.tsx`:
   - Add `animate-pulse-ring` CSS class to the chatbot FAB button
   - When `isSpeaking` state is true, add an orange glow ring around the Shyama avatar
