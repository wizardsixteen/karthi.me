# Rule: Styles & Tailwind CSS v4+ Standards

## 1. Tailwind CSS v4 Theme Reference
- Spacing reference is configured as `--spacing: 1px`.
- Therefore:
  - `p-16` = 16px
  - `p-24` = 24px
  - `gap-12` = 12px
  - `pt-80` = 80px
  - `w-32` = 32px
  - `h-32` = 32px

## 2. STRICT PROHIBITION: Zero Arbitrary `-[..px]` Syntax
- **NEVER** use bracket arbitrary pixel classes such as:
  - ❌ `p-[24px]`
  - ❌ `gap-[16px]`
  - ❌ `w-[40px]`
  - ❌ `text-[18px]`
  - ❌ `leading-[1.2]`
- **ALWAYS** use the configured 1px-scale utility token or semantic token:
  - ✅ `p-24`
  - ✅ `gap-16`
  - ✅ `w-40`
  - ✅ `text-18`
  - ✅ `leading-tight`

## 3. Strict Color Tokens
- Never write hardcoded hex classes like `text-[#b5b5b5]` or `bg-[#0b0b0c]`.
- Always use the semantic theme tokens:
  - Backgrounds: `bg-bg`, `bg-panel`, `bg-line`
  - Text: `text-ink`, `text-mute`, `text-accent`
  - Borders: `border-line`, `border-ink`, `border-accent`

## 4. Fonts
- Display Headings: `font-display font-black uppercase` or `font-extrabold`
- Body Text: `font-sans text-mute`
- Editorial Text & Quotes: `font-serif italic`

## 5. CSS File Usage
- Presentational styling should be composed with Tailwind utility classes.
- Only keep CSS files (`components.css`, `animation.css`) for:
  - Multi-layer GPU aurora keyframes
  - Radial click and mouse coordinates via CSS custom properties (`--x`, `--y`)
  - Mouse physics custom cursor positioning (`.cur-ring`, `.cur-dot`)
