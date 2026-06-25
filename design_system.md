---
name: Artisan Harvest
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#5d3f3c'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#926f6b'
  outline-variant: '#e7bdb8'
  surface-tint: '#c00014'
  primary: '#ba0013'
  on-primary: '#ffffff'
  primary-container: '#e31e24'
  on-primary-container: '#fffafa'
  inverse-primary: '#ffb4ab'
  secondary: '#006e25'
  on-secondary: '#ffffff'
  secondary-container: '#7cfd89'
  on-secondary-container: '#007528'
  tertiary: '#5c5b58'
  on-tertiary: '#ffffff'
  tertiary-container: '#757470'
  on-tertiary-container: '#fefbf6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000d'
  secondary-fixed: '#7cfd89'
  secondary-fixed-dim: '#5fe070'
  on-secondary-fixed: '#002106'
  on-secondary-fixed-variant: '#00531a'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is crafted for a premium e-commerce experience that bridges the gap between traditional heritage and modern organic purity. The brand personality is **authoritative, vibrant, and wholesome**, targeting health-conscious epicureans who value the provenance and quality of their food.

The visual style follows a **Modern Minimalist** approach with **Tactile** accents. It utilizes generous white space to allow high-fidelity product photography to serve as the primary visual driver. Subtle natural textures, such as fine paper grains or linen backgrounds, are used sparingly to evoke a sense of physical craftsmanship. The goal is to create an interface that feels as fresh and high-quality as the organic nuts and spices it showcases.

## Colors

The palette is derived directly from the core brand identity, refined for a high-end digital environment. 

- **Primary (Energetic Red):** A bold, high-chroma red used for primary calls to action, promotional highlights, and critical brand touchpoints. It represents energy and the intensity of flavor.
- **Secondary (Leaf Green):** A fresh, natural green used for organic certifications, "in stock" indicators, and secondary UI elements. It anchors the brand in the world of nature and health.
- **Tertiary (Parchment):** A warm, off-white neutral used for background sections to reduce eye strain and add a sophisticated, paper-like quality to the interface.
- **Neutral (Carbon):** A deep, near-black for typography and borders, ensuring high legibility and a grounded, professional feel.

The default mode is **Light**, emphasizing cleanliness and the "organic" narrative.

## Typography

This design system employs a sophisticated typographic pairing to balance heritage with clarity. 

**Playfair Display** is used for headlines and display text. Its high-contrast serifs reflect the "Alan" blackletter influence while remaining legible and elegant. It communicates quality, tradition, and premium positioning.

**Work Sans** serves as the functional workhorse for body text, UI labels, and data. It is a neutral, professional sans-serif with excellent readability at small sizes, ensuring the e-commerce shopping experience is effortless.

For mobile, headlines are scaled down slightly to ensure they do not dominate the viewport, maintaining a balanced hierarchy on smaller screens.

## Layout & Spacing

The layout philosophy uses a **Fixed Grid** system for desktop to maintain a boutique, curated feel, transitioning to a **Fluid Grid** for mobile devices. 

- **Desktop:** 12-column grid with a max-width of 1280px. Gutters are fixed at 24px to provide enough breathing room between product cards.
- **Mobile:** 4-column fluid grid with 16px side margins. 

The spacing rhythm is based on a 4px baseline, but leans heavily towards larger increments (`lg` and `xl`) to create the "luxury" sense of space and focus. Content should be grouped logically with `md` spacing, while distinct sections are separated by `xl` spacing to allow the eye to rest.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Ambient Shadows**. 

1. **Base Level:** The background (Tertiary Parchment) acts as the foundation.
2. **Surface Level:** Product cards and interactive modules use a pure white background to pop against the parchment.
3. **Elevated Level:** On hover or for active modals, a very soft, diffused shadow is applied (0px 12px 24px rgba(0,0,0, 0.04)). This creates a subtle "lift" that feels tactile and high-end without the clutter of heavy borders.
4. **Interactive Depth:** Buttons use a subtle inner-shadow when pressed to simulate physical feedback, reinforcing the organic, "real-world" brand ethos.

## Shapes

The design system uses a **Soft** shape language. A corner radius of `0.25rem` (4px) is applied to most UI components like input fields and small buttons. Larger components like product cards and primary hero banners use a `0.5rem` (8px) radius. 

This subtle rounding removes the clinical sharpness of a 0px radius while maintaining a structured, professional, and architectural feel that aligns with premium packaging design.

## Components

### Buttons
- **Primary:** Solid Red (`#E31E24`) with white text. High contrast, sharp but slightly softened corners.
- **Secondary:** Transparent with a 1px Leaf Green (`#2BB34A`) border and Green text. 
- **Tertiary/Ghost:** No border, Carbon text with an underline on hover.

### Product Cards
Cards are the heart of this system. They should feature:
- A pure white background.
- Ample padding (24px).
- Centered, high-resolution photography on a transparent or very light grey background.
- Type hierarchy: Label (Category) in Work Sans, Title in Playfair Display, Price in Work Sans Bold.

### Input Fields
Inputs use a minimal style: 1px border in a light neutral, which darkens to Carbon on focus. Labels sit clearly above the field in `label-md` style.

### Chips & Badges
Small, pill-shaped indicators for "Organic," "New," or "Best Seller." Use low-opacity tints of the Secondary Green or Primary Red with full-opacity text for a sophisticated look.

### Additional Components
- **Origin Labels:** Small typographic lockups indicating the source of the product (e.g., "Sourced from Kerala").
- **Quality Seals:** Circular badge components used on product pages to highlight organic certifications and purity standards.
