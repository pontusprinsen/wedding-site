# Wedding Invitation — Refined Figma Layout Guide

Purpose: Turn your current outline into a polished, responsive wedding invitation site in Figma with clear systems (grid, type, color, components) and step-by-step implementation instructions.

1. Design Goals (one-line)

Timeless, intimate, minimal; prioritize readable typography, generous white space, and photographic emphasis.

2. Art Direction & Palette

Mood keywords: warm, elegant, tactile, minimal

Suggested palette (token names + hex):

bg/cream — #FAF6EF (page background)

text/charcoal — #222222 (primary copy)

accent/blush — #D97C7C (buttons / small accents)

accent/sage — #B9CBB2 (secondary accents)

muted/gold — #C9A86D (micro accents)

Texture: Subtle paper grain overlay (opacity 6–10%) placed above background for tactile quality.

3. Typography System

Font family pairing (install or use Google Fonts):

Heading: Playfair Display (or Cormorant Garamond) — elegant serif

Body: Inter or Lora — neutral, high-legibility

Type scale:

H1 — 64px / 72px line-height / 0.02em letter-spacing (desktop)

H2 — 36px / 44px lh / 0.01em

H3 — 28px / 36px lh

Body — 18px / 28px lh

Small — 14px / 20px lh

Weights:

Headings: 400–600 (don't go too heavy; keep airy)

Body: 400 (regular)

Notes: Use character case sparingly — keep names and headings in Title Case. Increase tracking slightly on H1.

4. Layout & Grid (Desktop)

Canvas width & margins

Artboard width: 1200px (desktop). Background extends full width.

Content column (centered): max width 950–1024px.

Column grid (for the content area):

12 columns, 24px gutter, 64px outer margin inside the content column.

This matches your current grid (helps align photographs and cards).

Row rhythm

Base vertical rhythm: 8px.

Section padding (desktop): 120px top / 120px bottom for major sections (hero, practicalities). Use smaller paddings (64px) for tighter sections.

Mobile rules

Switch to 1-column fluid layout at <= 768px.

Reduce paddings: 48px top / 48px bottom; H1 to 40px.

5. Components & Spacing

Create Figma components and tokens (use Component variants where useful).

5.1 Hero (Component)

Container: center-aligned, max-width 760–820px.

H1 (Names): H1 token; margin-bottom 12px.

Subline (date): Body small; slightly muted (text/charcoal at 70% opacity).

Optional: small descriptor line under the date (e.g., “Join us…”).

Background: soft paper texture, optional background photo with overlay (linear gradient 0–20% opacity to keep contrast for text).

5.2 Image Frame (Component — Variant: full / framed)

Aspect ratio: 16:9 or 4:3 depending on photo. Use consistent crop.

Corner radius: 8–12px.

Shadow: 0 8px 24px rgba(34,34,34,0.08).

Stroke: 1px muted/gold at 8% opacity (optional thin frame).

5.3 Section Title (Component)

H2 sized and centered. Add small underline accent (6px high, 40px wide) in accent/blush positioned under the title.

5.4 Card (for Practicalities)

Width: full within content column; inner padding 28px.

Grid: two-column layout inside card for desktop (icon + content), stack on mobile.

Border-radius: 8px; subtle background bg/cream with 1px divider line between cards.

5.5 Buttons

Primary: Filled accent/blush, white text (rounded corners 6–10px), padding 14px 24px.

Secondary: Outline with text/charcoal 1px stroke, transparent background.

Use accessible contrast for text (WCAG AA for large text, AAA ideal).

6. Accessibility Checklist

Text contrast: ensure body text ratio >= 4.5:1 vs background. Headings can be lower if large.

Buttons: minimum 44x44px touch target (mobile).

Alt text for images — write a 1–2 sentence descriptive alt.

Keyboard focus styles: visible 2–3px ring using muted/gold.

7. Images & Assets

Use large photos (min 2000px wide) to allow crisp cropping for retina displays.

Color grade: warm/muted. Use a single LUT or preset for consistency.

Export formats: JPG for photos (quality 75–80), PNG for graphics with transparency, SVG for icons.

Create a small assets frame in Figma with organized folders: photos, icons, illustrations.

8. Step-by-step Figma Implementation

Follow these steps in this order. Each step is short and actionable.

Preparing your Figma file

Duplicate the current file (safety copy). Rename: Wedding — Refined (v1).

Create top-level pages: 00 Tokens, 01 Assets, 02 Layout, 03 Components, 04 Screens.

Tokens & Styles

On 00 Tokens, create Color Styles for palette tokens (bg/cream, text/charcoal, etc.).

Create Text Styles for H1, H2, Body, Small using the Type Scale above.

Create Effect Styles: soft-shadow, paper-grain (grain overlay exported or use an image fill set to Overlay/Soft Light with low opacity).

Grid & Frames

On 02 Layout, create your desktop frame: 1200 x 3000 (adjust height). Set layout grid: center 12 columns, gutter 24px, margin 64px.

Create a mobile variant frame: 375 x 2000; single column.

Build components

On 03 Components, create the following components:

Hero / Default (text layer, subline, small descriptor)

Image / Framed (variant: 16:9, 4:3)

SectionTitle / Center (H2 + underline)

Card / Practicality (variant: icon-left, stacked)

Button / Primary and Button / Secondary

Use Auto Layout: For hero and cards, wrap content in Auto Layout frames so spacing adapts.

Assemble screens

On 04 Screens, copy your existing content into the new frames. Replace red placeholders with Image / Framed components.

Apply Text Styles and Color Styles to all text layers.

Check alignment to the column grid; nudge items to snap to columns for precise alignment.

Create responsive variants

Duplicate your desktop screen and adapt spacing/typography for mobile:

H1 from 64px to 40px.

Reduce section paddings to 48px.

Stack two-column components into single-column using Auto Layout.

Prototyping & interactions

Add prototype links for center nav to anchors (About, Practicalities). Use Smart Animate for subtle transitions.

Add scroll-based fade-ins: use Move In + Ease for each section with 150–300ms duration.

9. Handoff / Export

Create a Handoff page with final artboards and annotate spacing (margins, type sizes, color tokens).

Export assets: photos (JPG 2000px), icons (SVG), UI elements (PNG 2x if raster).

Provide copy for developers: color token list, type scale, spacing rhythm. Consider providing simple CSS variables:

:root{
  --bg-cream:#FAF6EF;
  --text:#222;
  --accent-blush:#D97C7C;
  --max-width: 1024px;
}


h1{font-family:'Playfair Display',serif;font-size:64px;letter-spacing:0.02em}
body{font-family:'Inter',system-ui,Arial; font-size:18px;line-height:1.6}
10. Small polish details (optional but recommended)

Add a small animated monogram SVG in the top-left corner for subtle branding.

Use a micro-interaction for RSVP button: pressed state shrinks 96% + shadow inset.

Consider a printable, single-page invitation PDF export as a separate layout.

11. Quick QA checklist before finalizing




If you’d like, I can also:

Produce a visual mock of one refined screen (Hero + About) in Figma-style PNG.

Export a developer-ready spec (CSS variable file + annotated PNGs).

Tell me which of those you'd like next.