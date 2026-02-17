# 🎨 Tailwind CSS Setup Guide

## ✅ Setup Completed Successfully!

Your Memory Card Game project now has a professional Tailwind CSS setup configured from scratch.

---

## 📦 What Was Installed

```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
```

### Packages Installed:
- **tailwindcss** - Main Tailwind CSS framework
- **postcss** - CSS processing tool
- **autoprefixer** - Vendor prefixes for cross-browser compatibility
- **@tailwindcss/postcss** - Tailwind CSS v4 PostCSS plugin

---

## 🔧 Configuration Files Created

### 1. **tailwind.config.js**
- Content paths configured for `.tsx`, `.ts`, `.jsx`, `.js` files
- Custom color extensions (primary & secondary colors)
- Custom animations (flip, bounce, pulse effects)
- Custom spacing, border-radius, shadows
- Dark mode enabled with `class` strategy
- Z-index utilities for layering

### 2. **postcss.config.js**
- Configured to use `@tailwindcss/postcss` plugin
- Enables Tailwind CSS v4 processing

### 3. **src/index.css** (Updated)
- Imports Tailwind CSS v4 using `@import "tailwindcss"`
- Custom `@layer base` styles for:
  - HTML & body styling
  - Button & input resets
  - Focus visible styles for accessibility
- Custom `@layer components` for:
  - Card component styles
  - Glass morphism effect
  - Transition helpers
- Custom `@layer utilities` for:
  - 3D perspective utilities
  - Text shadows
  - Hover effects (glow)
  - Gradient backgrounds
  - Grid utilities
  - GPU acceleration classes

### 4. **src/styles/globals.css** (Updated)
- CSS custom properties (variables) for colors, spacing, shadows
- Light mode (default) color scheme
- Dark mode (`.dark` class) color scheme
- Typography styles
- Scrollbar styling (Chrome & Firefox)
- Selection styles
- Focus styles
- Component classes (.card, .glass, .skeleton)
- Utility classes (.container, .gradient-primary, etc.)
- Responsive design support
- Motion & accessibility preferences
- Print styles

---

## 🎯 Key Features Configured

### Color System
```css
/* Custom color palette available */
primary: blue (used for primary actions)
secondary: purple (used for secondary actions)
Neutral colors from gray-50 to gray-950
Semantic colors for success, error, warning
```

### Animations
```css
.animate-flip - Card flip animation (0.6s)
.animate-flip-back - Card flip back
.animate-bounce-light - Light bounce effect
.animate-pulse-glow - Pulsing glow effect
.animate-slide-up - Slide up animation
.animate-fade-in - Fade in animation
.animate-match-celebration - Match celebration effect
```

### Custom Components
```css
.card - Card base styling with hover effects
.glass - Glass morphism effect
.focus-ring - Focus ring styling
.transition-smooth - Smooth transitions
.skeleton - Loading skeleton animation
```

### Responsive Utilities
```css
.grid-auto-fit - Auto-fitting grid layout
.center-content - Center content flexbox
.truncate-2-lines - Truncate text to 2 lines
.truncate-3-lines - Truncate text to 3 lines
.gpu-accelerated - GPU acceleration for performance
```

---

## 🚀 How to Use

### Development
```bash
cd memory-card-game
npm run dev
```
Opens at `http://localhost:5173/`

### Production Build
```bash
npm run build
```
Generates optimized CSS (87.20 kB → 13.47 kB gzipped)

### Linting
```bash
npm run lint
```

---

## 🎨 Tailwind CSS Classes Available

All standard Tailwind CSS utilities are available:

### Spacing
```tsx
m-4, p-6, mb-4, px-6, py-2, gap-4, etc.
```

### Colors
```tsx
text-blue-500, bg-gray-100, border-red-300, etc.
```

### Sizing
```tsx
w-full, h-screen, min-h-screen, max-w-xl, etc.
```

### Display & Flexbox
```tsx
flex, grid, gap-4, items-center, justify-between, etc.
```

### Shadows & Effects
```tsx
shadow-lg, shadow-xl, shadow-2xl, drop-shadow-lg, etc.
```

### Responsive Design
```tsx
md:text-lg, lg:flex, xl:grid-cols-3, etc.
```

### Dark Mode
```tsx
dark:bg-gray-800, dark:text-white, etc.
```

---

## 📁 File Structure

```
memory-card-game/
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── src/
│   ├── index.css              # Main Tailwind imports & custom styles
│   ├── styles/
│   │   ├── globals.css        # Global styles & CSS variables
│   │   └── animations.css     # Animation keyframes
│   └── ... (components, hooks, utils)
└── ... (config files)
```

---

## 🔍 Troubleshooting

### Build Fails with "Cannot apply unknown utility class"
- Check that the class name is a valid Tailwind utility
- Custom colors reference `primary-500` should be standard colors like `blue-500`
- Ensure `tailwind.config.js` is in the root directory

### Styles Not Applying
- Clear your browser cache or do a hard refresh (Ctrl+Shift+R)
- Verify the CSS file is being imported in `index.css`
- Check that the file extensions are included in `tailwind.config.js` content

### Dark Mode Not Working
- Add `dark` class to the root `<html>` element
- Or use `data-theme="dark"` attribute
- Ensure dark mode is enabled in tailwind.config.js

---

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Tailwind CSS v4 Migration Guide](https://tailwindcss.com/docs/v4-migration-guide)
- [Tailwind CSS Configuration](https://tailwindcss.com/docs/configuration)

---

## ✨ Next Steps

1. **Create Components** - Use Tailwind utility classes for component styling
2. **Add Themes** - Use CSS variables + Tailwind for theme switching
3. **Responsive Design** - Use `md:`, `lg:`, `xl:` prefixes for breakpoints
4. **Custom Extensions** - Add more custom utilities in `tailwind.config.js`
5. **Performance** - PurgeCSS will automatically remove unused styles on build

---

**Setup Date:** February 8, 2026
**Tailwind CSS Version:** 4.x
**Node Version:** 16+
