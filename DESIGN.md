---
name: Vite Proyec
description: Landing cinematografica oscura para una futura plataforma de mensajeria realtime.
colors:
  midnight: "#0b0f19"
  slate-depth: "#111827"
  deep-navy: "#0f172a"
  text: "#f8fafc"
  text-muted: "#cbd5e1"
  text-soft: "#94a3b8"
  primary: "#3b82f6"
  primary-soft: "#60a5fa"
  primary-deep: "#1d4ed8"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(3.25rem, 9vw, 7.35rem)"
    fontWeight: 850
    lineHeight: 0.9
    letterSpacing: "0"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.2rem, 6vw, 4.8rem)"
    fontWeight: 850
    lineHeight: 0.98
    letterSpacing: "0"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  sm: "16px"
  md: "24px"
  lg: "34px"
  pill: "999px"
spacing:
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "52px"
---

# Design System: Vite Proyec

## 1. Overview

**Creative North Star: "The Midnight Signal Room"**

The landing should feel like entering a premium product preview: dark, cinematic, focused and technically refined. It uses depth, blur, soft glow and measured motion to make realtime messaging feel alive before the actual chat engine ships.

This is a product surface with a brand-forward landing. The UI should feel close to Linear, Framer, Stripe, Messenger moderno and Apple product pages, but with its own messaging identity. It must never look like a generic dashboard, school project or Bootstrap template.

**Key Characteristics:**

- Dark cinematic canvas with controlled blue signal light.
- Large confident typography with generous spacing.
- Glassmorphism only where it communicates depth.
- Chat previews, floating notes and timeline sections that explain the product.
- Motion that feels smooth, expensive and restrained.

## 2. Colors

The palette is dark and deep, carried by navy surfaces and restrained blue signal accents.

### Primary

- **Signal Blue** (`primary`): Primary CTAs, active action states, glow and key product accents.
- **Soft Signal Blue** (`primary-soft`): Hover energy, glow edges, icon surfaces and subtle highlights.
- **Deep Signal Blue** (`primary-deep`): Depth under primary elements and darker interaction states.

### Neutral

- **Midnight Canvas** (`midnight`): The main cinematic background.
- **Slate Depth** (`slate-depth`): Raised dark surfaces and floating nav.
- **Deep Navy** (`deep-navy`): Secondary depth layer and chat interior surfaces.
- **Ice Text** (`text`): Primary text on dark backgrounds.
- **Mist Text** (`text-muted`): Paragraphs and navigation text.
- **Soft Metadata** (`text-soft`): Secondary labels, captions and timestamps.

### Named Rules

**The Signal Restraint Rule.** Blue glow is for focus, CTAs, chat energy and motion cues. It must not flood every section.

**The No Gamer Neon Rule.** Dark does not mean neon. Avoid aggressive saturation, electric outlines and noisy effects.

## 3. Typography

**Display Font:** Inter with system UI fallbacks.
**Body Font:** Inter with system UI fallbacks.
**Label/Mono Font:** Inter with system UI fallbacks.

**Character:** Bold, spacious and product-native. Headlines can be cinematic, but labels and body copy must stay crisp and functional.

### Hierarchy

- **Display** (850, `clamp(3.25rem, 9vw, 7.35rem)`, 0.9): Hero only.
- **Headline** (850, `clamp(2.2rem, 6vw, 4.8rem)`, 0.98): Major landing sections and final CTA.
- **Body** (400, `1rem`, 1.75): Supporting copy with generous readability on dark surfaces.
- **Label** (900, `0.78rem`, `0.14em`, uppercase): Kicker labels and product metadata.

### Named Rules

**The Hero Owns Scale Rule.** Massive type belongs to the hero and cinematic CTA. Product details use quieter hierarchy.

## 4. Elevation

Elevation is created with layered translucent surfaces, soft shadows, subtle borders and blue ambient glow. Glassmorphism is allowed only when it supports depth or product preview framing.

### Shadow Vocabulary

- **Soft Depth** (`0 24px 80px rgba(2, 6, 23, 0.36)`): Main panel and mockup elevation.
- **Signal Glow** (`0 20px 80px rgba(59, 130, 246, 0.3)`): Hero device, CTA and important blue surfaces.

### Named Rules

**The Expensive Blur Rule.** Blur must be rare, large and soft. Tiny noisy blur looks cheap.

## 5. Components

### Buttons

- **Shape:** Fully rounded pill controls.
- **Primary:** Signal Blue gradient, Ice Text, 52px height, 22px horizontal padding.
- **Hover / Focus:** Lift by 2px, strengthen blue border and preserve visible focus ring.
- **Secondary:** Transparent dark surface with subtle border and Mist Text.

### Cards / Containers

- **Corner Style:** 24px to 34px radius, never square.
- **Background:** Translucent navy surfaces with soft borders.
- **Shadow Strategy:** Soft Depth for panels, Signal Glow for hero and CTA moments.
- **Internal Padding:** Generous by default, tighter only inside chat bubbles.

### Navigation

- **Style:** Floating sticky pill nav with blur after scroll.
- **Desktop:** Brand left, section links centered, Open Chat right.
- **Mobile:** Brand mark and Open Chat remain. Links collapse away.

### Chat Preview

- **Style:** Dark glass device, message bubbles, attachment row, avatar cluster and composer.
- **Motion:** Messages rise in with opacity, transform and blur only.
- **Purpose:** The preview sells the future chat product before backend features exist.

## 6. Do's and Don'ts

### Do:

- **Do** build on Midnight Canvas, Slate Depth and Deep Navy.
- **Do** use Signal Blue for CTAs, glow, focus and message energy.
- **Do** make the hero cinematic and the rest of the page calm.
- **Do** keep mobile spacing intentional and touch targets large.
- **Do** respect reduced motion.

### Don't:

- **Don't** make it look like dashboard corporativo frio.
- **Don't** use SaaS generico lleno de degradados morados.
- **Don't** use UI vieja estilo Bootstrap.
- **Don't** create interfaz recargada y pesada.
- **Don't** create diseno escolar o de plantilla basica.
- **Don't** drift into diseno gamer exagerado.
- **Don't** create app oscura con demasiados efectos neon.
- **Don't** ship a landing tipica sin identidad visual.
- **Don't** use square basic cards.
- **Don't** use gradient text.
