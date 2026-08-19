---
name: Studio Aura
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#121212'
  on-primary-container: '#7e7d7d'
  inverse-primary: '#5f5e5e'
  secondary: '#e9c176'
  on-secondary: '#412d00'
  secondary-container: '#604403'
  on-secondary-container: '#dab36a'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#121212'
  on-tertiary-container: '#7e7d7d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
  champagne-gold: '#C5A059'
  matte-black: '#0A0A0A'
  warm-gray: '#8C8C8C'
  off-white: '#F5F5F5'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '300'
    lineHeight: 24px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.2em
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
spacing:
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 24px
  section-padding: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is centered on the concept of "Discreet Luxury"—a philosophy that prioritizes atmospheric quality and architectural precision over loud ornamentation. Drawing inspiration from high-end boutique hotels and modern art galleries, the UI acts as a silent, sophisticated frame for the interior design portfolio.

The aesthetic follows a **Minimalist / Art Gallery** movement. It utilizes expansive negative space (white space), a dark-mode-first approach to create a sense of intimacy and exclusivity, and razor-thin structural elements. The experience should feel curated, calm, and deliberate, evoking the quiet confidence of a premium service where "less is more."

## Colors

This design system utilizes a **Dark Mode** foundation to create a cinematic and immersive experience. 

- **Primary Canvas:** The background is anchored in `Matte Black` (#0A0A0A) and `Deep Charcoal` (#121212). This provides the necessary depth to make high-resolution project photography pop.
- **Accents:** `Champagne Gold` is used sparingly for high-value interactions, thin borders, and subtle focus states. It represents the "Aura" of the brand—a glow within the dark.
- **Typography & Details:** Secondary text uses `Warm Gray` to reduce visual vibration against the black background, ensuring a soft, readable contrast that feels more sophisticated than pure white.

## Typography

The typographic hierarchy relies on the tension between a high-contrast Serif and a functional, geometric Sans-Serif.

- **Headlines:** Uses `Playfair Display`. These should be set with generous line height and tight letter-spacing for large titles. Headlines represent the "Art" side of the studio.
- **Body & Interface:** Uses `Montserrat` at lighter weights (300). This provides a technical, clean counterpoint to the serif titles.
- **Micro-copy:** Labels and navigation items should frequently use the `label-caps` style with increased letter-spacing (0.2em) to evoke the feel of architectural blueprints or gallery plaques.

## Layout & Spacing

The layout philosophy is based on a **Fixed-Grid Gallery** model. Content is contained within a centered 1440px max-width container to maintain focus.

- **Rhythm:** Spacing is intentionally "oversized." Section padding (120px+) is used to isolate projects, forcing the user to focus on one piece of design at a time.
- **Grid:** A 12-column grid is used for desktop, but elements frequently offset by 1 or 2 columns to create an asymmetrical, editorial feel.
- **Responsiveness:** On mobile, margins reduce to 24px, and typography scales down aggressively. Vertical stacks should prioritize whitespace over density.

## Elevation & Depth

In a luxury dark-mode system, traditional shadows are replaced by **Tonal Layering** and **Fine Outlines**.

- **Surfaces:** Depth is created by stepping up from `#0A0A0A` (Base) to `#121212` (Cards/Containers).
- **Outlines:** Instead of shadows, use 0.5px or 1px solid borders in `Champagne Gold` (at 20-30% opacity) or `Neutral` (#262626) to define the edges of interactive elements.
- **Glassmorphism:** For overlays like navigation bars, use a heavy backdrop blur (20px) with a semi-transparent `#0A0A0A` fill (80% opacity) to maintain the sense of depth and architectural layering.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Luxury in interior design is often associated with the precision of lines and architectural structure. Therefore, all buttons, image containers, cards, and input fields should have 90-degree corners. This evokes a sense of custom-built craftsmanship and distinguishes the system from more "consumer-grade" rounded interfaces.

## Components

- **Buttons:** Primary buttons are outlined with a 1px `Champagne Gold` border. Text is `label-caps`. The hover state should involve a subtle fill transition or a slight increase in border opacity.
- **Inputs:** Minimalist bottom-border only. Labels use `label-caps` placed above the field in `Warm Gray`.
- **Cards:** No shadows. Cards use a slightly lighter background (#1A1A1A) and thin 1px borders. Images within cards should have a "zoom-in" transition on hover.
- **Navigation:** Top-fixed, minimal. Links should have a subtle gold underline that appears on hover.
- **Project Lists:** Use large-scale imagery with text overlays that appear only on interaction, keeping the initial view clean and purely visual.
- **Media Containers:** High-quality video backgrounds should be used for hero sections, framed with significant internal padding to act as a "window" into the studio's work.