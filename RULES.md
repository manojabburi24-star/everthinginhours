# Everything In Hours: Website Rules

These rules apply to every page, section and component of the Everything In Hours website.
If a change breaks one of these rules, the change is wrong, not the rule.

---

## 1. Responsive rules (non-negotiable)

1. **Mobile-first.** Write the base (no-prefix) Tailwind classes for a 360px phone first, then layer `sm: md: lg: xl:` upward. Never design desktop and "squeeze" it down.
2. **Breakpoints** (Tailwind defaults, do not invent new ones):
   | Token | Min width | Target |
   |---|---|---|
   | base | 0 | Phones (test at 360, 390, 430) |
   | `sm` | 640px | Large phones / small tablets |
   | `md` | 768px | Tablets portrait |
   | `lg` | 1024px | Tablets landscape / small laptops |
   | `xl` | 1280px | Desktop |
   | `2xl` | 1536px | Wide desktop |
3. **Every section must be tested at 360px, 768px, 1024px and 1440px** before it is considered done.
4. **No horizontal scroll, ever.** `body` has `overflow-x: clip`. Decorative shapes that bleed off-screen live inside a parent with `overflow-hidden`.
5. **Container:** content sits in `.container-eih` = `mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10`. 16px gutter on phones minimum.
6. **Fluid type, not fixed jumps.** Headings use `clamp()` so they scale smoothly between breakpoints (see Typography). A headline never wraps to more than 4 lines on a phone or 2 lines per phrase on desktop.
7. **Full-height sections use `min-h-[100dvh]`, never `h-screen` / `100vh`** (iOS Safari address-bar jump).
8. **Grid, not flex math.** Multi-column layouts use CSS Grid (`grid grid-cols-1 md:grid-cols-12`). No `w-[calc(33%-1rem)]`.
9. **Every multi-column layout declares its phone fallback in the same component.** Asymmetric desktop layouts collapse to a single clean column under `md`.
10. **Horizontal timelines / carousels** become vertical stacks or swipeable scroll-snap rows on phones (`snap-x snap-mandatory overflow-x-auto`), never squished columns.
11. **Touch targets are at least 44x44px.** Buttons, nav links, social icons, menu toggles.
12. **Navigation:** single line on desktop (height 64-72px). Below `lg` it becomes a hamburger with a full-screen sheet menu. The menu locks body scroll while open and closes on link tap and `Esc`.
13. **Images and media** always reserve their space (`aspect-[4/3]`, `width`/`height` attrs) so nothing jumps while loading (CLS < 0.1). Use `loading="lazy"` below the fold.
14. **One overlay only:** the hero is the single sticky layer in `OverlayStack`; the rest of the page slides up over it. Do not add more overlay layers. Every later section is wrapped in `SectionMotion` (opens from an inset rounded card to full width on scroll) and keeps a solid background.
15. **Hover is a bonus, not a requirement.** Anything revealed on hover must also be visible or reachable on touch (use `@media (hover: hover)` for hover-only effects).

## 2. Brand rules

### Colors (exact, no substitutes)
| Name | Hex | Use |
|---|---|---|
| Coral Red | `#E94B4B` | Primary accent, primary CTA, the word **BRAND** |
| Cornflower Blue | `#5B7CFA` | Secondary accent, links, the word **HOURS** |
| Buttercream | `#FFE7A3` | Warm background blocks, highlights, tags |
| Charcoal | `#1A1A1A` | All primary text, dark blocks, footer |
| White | `#FFFFFF` | Main background, cards |

- Backgrounds: White and Buttercream (with tints like `#FFF6DA`). Text: Charcoal. Accents: Coral and Cornflower only.
- No other hues (no purple, no teal, no green). Neutrals are tints of Charcoal only.
- Gradients may only blend brand colors, and stay subtle.
- Shadows are tinted Charcoal at low opacity, never pure black.
- Body text contrast meets WCAG AA (4.5:1). White text on Coral is used only at large/bold sizes (18px+ bold).

### Logo
- Use the supplied files in `public/brand/` exactly. **Never redraw, recolor, stretch, rotate or add effects to the logo.**
- `logo-light-bg.png` (dark text) on White/Buttercream. `logo-dark-bg.png` (white text) on Charcoal.
- Keep clear space around the logo of at least the height of the yellow triangle.
- The three-triangle mark (`mark.png`) can be used alone for favicon, loaders and motion motifs.

### Typography
- **Headings:** Montserrat ExtraBold (800), tight tracking (`-0.03em`), leading 0.95-1.05.
- **Body:** Inter Regular / Medium (400/500), leading 1.6, max line length 65ch.
- Fonts are self-hosted (`@fontsource`), `font-display: swap`.
- Fluid scale:
  - Display (hero): `clamp(2.75rem, 8vw, 7.5rem)`
  - H2: `clamp(2.25rem, 5.5vw, 4.75rem)`
  - H3: `clamp(1.25rem, 2vw, 1.625rem)`
  - Body: `1rem` phone, `1.125rem` desktop for lead paragraphs
- Emphasis inside a headline = color change (Coral/Cornflower) or italic of the same font. Never mix in a different font family.

## 3. Gen Z / modern design rules

1. **Type is the hero.** Oversized, bold, confident headlines. "Business To Brand. Everything In Hours." is always the strongest element on the page.
2. **Asymmetry over symmetry.** Off-grid compositions, overlapping layers, tilted stickers and chips. Never a centered-text-over-gradient hero, never three identical cards in a row.
3. **Sticker energy.** Rounded pills, tilted badges, playful rotated labels, chunky outlines (2px Charcoal borders), hard offset shadows (`4px 4px 0 #1A1A1A`) on interactive elements.
4. **Shape system (locked):**
   - Buttons, chips, tags: full pill (`rounded-full`)
   - Cards and media: `rounded-[28px]` (phones `rounded-3xl`)
   - Inputs: `rounded-2xl`
5. **Each section uses a different layout family** (split hero, bento, sticky list, masonry grid, horizontal timeline, full-bleed CTA). No two sections look the same.
6. **Motion has a purpose:** entrance reveal for hierarchy, hover feedback on everything clickable, scroll storytelling on the process timeline. Springs and `cubic-bezier(0.16, 1, 0.3, 1)`, never linear.
7. **Only animate `transform` and `opacity`.** No layout-property animation.
8. **`prefers-reduced-motion` is always respected.** Loops, parallax, marquee, tilt and overlay scaling stop.
9. **One marquee per page, max.**
10. **Copy:** short, punchy, human. Headlines up to 8 words, supporting text up to 25 words. No em-dashes anywhere. No filler words ("elevate", "seamless", "unleash", "revolutionize").
11. **One label per intent.** Contact intent = "Start Your Growth" (nav, hero) and "Let's Get Started" (final CTA) both open the contact form. Portfolio intent = "Explore Our Work".
12. **Icons:** Phosphor Icons only (`@phosphor-icons/react`), `weight="duotone"` or `"bold"`. No hand-drawn SVG icons, no emoji in UI.

## 4. Accessibility and SEO rules

- One `<h1>` per page (the hero headline). Sections use `<section>` with `aria-labelledby` pointing at their `<h2>`.
- All images have meaningful `alt` text (decorative ones get `alt=""`).
- Visible focus rings on every interactive element (`focus-visible:outline-2 outline-offset-4`).
- Skip-to-content link as the first focusable element.
- Meta title, description, Open Graph, Twitter card, canonical, favicon and `Organization` JSON-LD in `index.html`.
- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav aria-label>`.

## 5. Performance rules

- LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Continuous values (pointer, scroll) use motion values (`useMotionValue`, `useScroll`, `useTransform`), never React state.
- Images are compressed (WebP where possible), lazy-loaded below the fold.
- No `window.addEventListener('scroll')`. Use Motion `useScroll`, IntersectionObserver or CSS.

## 6. Tech stack

- React + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`), brand tokens defined in `src/index.css` under `@theme`
- **Framer Motion (`motion/react`) for all animation.** No WebGL / 3D libraries. Key pieces:
  - `OverlayStack`: used once, so the page slides up over the hero (sticky + scale + dim). The hero anchor `#top` comes from its `anchors` prop; all other sections keep their own `id`.
  - `SectionMotion`: scroll-linked clip-path entrance for every section after Services. Wrap new sections in it.
  - `HeroVisual`: brand mark with pointer 3D tilt, draggable floating sticker tiles.
  - `MaskReveal` for section headlines, `Reveal` for content, `PillButton` is magnetic.
  - `Marquee` reacts to scroll velocity. Navbar hides on scroll down and shows a progress bar.
- Contact enquiries go to WhatsApp **+91 90635 02404** (`src/site.ts`). Never change this number without the owner's say-so.
- Phosphor Icons

## 7. Done checklist (run before shipping any change)

- [ ] Looks right at 360 / 768 / 1024 / 1440px, no horizontal scroll
- [ ] Only brand colors used; logo untouched
- [ ] Montserrat ExtraBold headings, Inter body
- [ ] No em-dashes, no duplicate CTA labels for the same intent
- [ ] Hover states have touch equivalents
- [ ] Reduced-motion tested
- [ ] Keyboard navigable with visible focus
- [ ] `npm run build` passes with no errors
