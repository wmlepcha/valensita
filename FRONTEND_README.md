# VALENSITA - Frontend Design System

## Overview

A complete luxury streetwear ecommerce UI/UX built with Laravel + Inertia.js + React + TailwindCSS. 

**Brand Identity**: Modern · Bright · Luxury Streetwear

---

## 🎨 Design Philosophy

### Core Principles
1. **Bold Typography** - Confident, large headings with Space Grotesk
2. **Unified Spacing** - Strict 4px scale across all components
3. **Minimal Shadows** - Subtle elevation (5-8% opacity)
4. **Bright Accents** - Electric green, purple, pink highlights
5. **Premium Layout** - Generous whitespace, strong grid alignment
6. **Product-First** - Large images, 3:4 aspect ratio, hover interactions

### Visual Inspiration
- **TrailGear**: Bold typography, strong contrast, earth tones
- **Hoodie Site**: Clean sections, structured whitespace, sage palette
- **Zaffuri**: Modern rounded cards, soft shadows, clean product displays

---

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
resources/js/
├── Components/
│   ├── UI/                    # Base UI components
│   │   ├── Button.tsx        # Primary, secondary, outline, ghost, accent
│   │   ├── Input.tsx         # Form input with label and error states
│   │   ├── Badge.tsx         # Status badges with variants
│   │   └── Select.tsx        # Dropdown selector
│   ├── ProductCard.tsx       # Product card with hover effects
│   ├── ProductGrid.tsx       # Responsive product grid
│   ├── ProductDetails.tsx    # Full product detail view
│   ├── Hero.tsx              # Homepage hero section
│   ├── FeaturedProducts.tsx  # Featured products section
│   ├── FeaturedCategories.tsx # Category grid
│   ├── Newsletter.tsx        # Email subscription
│   └── PromoBar.tsx          # Top announcement bar
├── Layouts/
│   ├── MainLayout.tsx        # Main page wrapper
│   ├── Header.tsx            # Navigation header
│   └── Footer.tsx            # Site footer
└── Pages/
    ├── Main.tsx              # Homepage
    ├── ProductExample.tsx    # Product detail page example
    └── ShopExample.tsx       # Shop/catalog page example
```

---

## 🎯 Component Usage

### Layout

```tsx
import MainLayout from '@/Layouts/MainLayout';

<MainLayout title="Page Title">
  {/* Your content */}
</MainLayout>
```

### Buttons

```tsx
import Button from '@/Components/UI/Button';

<Button variant="primary" size="lg">Shop Now</Button>
<Button variant="outline" size="md">Learn More</Button>
<Button variant="accent" size="sm">Sale</Button>
```

**Variants**: `primary` | `secondary` | `outline` | `ghost` | `accent`  
**Sizes**: `sm` | `md` | `lg` | `xl`

### Badges

```tsx
import Badge from '@/Components/UI/Badge';

<Badge variant="electric">New</Badge>
<Badge variant="accent">Sale</Badge>
<Badge variant="brand">Featured</Badge>
```

### Product Components

```tsx
import ProductCard from '@/Components/ProductCard';
import ProductGrid from '@/Components/ProductGrid';

<ProductGrid>
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</ProductGrid>
```

### Hero Section

```tsx
import Hero from '@/Components/Hero';

<Hero
  title="Express Your Style"
  subtitle="Discover curated luxury streetwear"
  image="/hero.jpg"
  ctaText="Shop Now"
  ctaLink="/shop"
/>
```

### Sections

```tsx
import FeaturedProducts from '@/Components/FeaturedProducts';
import FeaturedCategories from '@/Components/FeaturedCategories';
import Newsletter from '@/Components/Newsletter';

<FeaturedProducts
  title="New Arrivals"
  products={products}
  viewAllLink="/shop"
/>

<FeaturedCategories categories={categories} />

<Newsletter />
```

---

## 🎨 Design Tokens

### Typography

```tsx
// Display font (headings)
className="font-display"

// Body font (paragraph)
className="font-sans"

// Monospace
className="font-mono"
```

### Colors

```tsx
// Brand colors
bg-brand-500     // Primary blue
bg-brand-700     // Darker blue

// Accent colors
bg-accent-electric  // Neon green #00ff88
bg-accent-purple    // Purple #a855f7
bg-accent-orange    // Orange #fb923c
bg-accent-pink      // Pink #ec4899

// Neutrals
bg-neutral-50   // Background
bg-neutral-900  // Almost black
```

### Spacing (4px scale)

```tsx
p-4   // 16px
p-6   // 24px
p-8   // 32px
p-12  // 48px

gap-4  // 16px
gap-6  // 24px
gap-8  // 32px
```

### Container Widths

```tsx
container-custom  // max-w-7xl
container-narrow  // max-w-5xl
container-wide    // max-w-[1440px]
```

### Section Spacing

```tsx
section-spacing     // py-12 md:py-16 lg:py-24
section-spacing-sm  // py-8 md:py-12 lg:py-16
section-spacing-lg  // py-16 md:py-24 lg:py-32
```

---

## 📱 Responsive Design

### Breakpoints

```
sm:  640px  - Mobile landscape
md:  768px  - Tablet
lg:  1024px - Desktop
xl:  1280px - Large desktop
2xl: 1536px - Extra large
```

### Grid System

```tsx
// Product grid - responsive columns
<div className="grid-products">
  {/* 1 col → 2 col → 3 col → 4 col */}
</div>

// Custom grids
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

## ✨ Animations

```tsx
// Fade in
className="animate-fade-in"

// Slide up
className="animate-slide-up"

// Slide down
className="animate-slide-down"

// Staggered animations
style={{ animationDelay: `${index * 100}ms` }}
```

---

## 🎯 Best Practices

### DO ✓
- Use the unified 4px spacing scale
- Apply bold typography for headings
- Keep shadows minimal (5-8% opacity)
- Use accent colors sparingly as highlights
- Provide hover states on all interactive elements
- Test on mobile, tablet, and desktop
- Use high-quality product images (3:4 aspect ratio)

### DON'T ✗
- Mix random spacing values outside the scale
- Use heavy shadows or glows
- Overcrowd the layout with too many elements
- Use more than 2-3 accent colors on one page
- Skip focus states for accessibility
- Use generic or low-quality stock photos
- Forget to test responsive behavior

---

## 🔧 Customization

### Changing Brand Colors

Edit `tailwind.config.js`:

```js
colors: {
  brand: {
    500: '#YOUR_COLOR',
    // ...
  },
}
```

### Updating Typography

1. Choose Google Fonts at [fonts.google.com](https://fonts.google.com)
2. Update import in `resources/css/app.css`
3. Update font families in `tailwind.config.js`

### Adding New Components

1. Create component in `resources/js/Components/`
2. Follow existing patterns (TypeScript + Props interface)
3. Use design tokens from Tailwind config
4. Export and import using `@/Components/...`

---

## 📸 Example Pages

### Homepage (`Main.tsx`)
- Hero section with CTA buttons
- Featured products grid
- Category cards
- Newsletter signup

### Product Page (`ProductExample.tsx`)
- Image gallery with thumbnails
- Size and color selection
- Quantity controls
- Features, sizing guide, care instructions
- Related products

### Shop Page (`ShopExample.tsx`)
- Sidebar filters (category, price, size, color)
- Sort dropdown
- Product grid with pagination
- Mobile-responsive filters

---

## 🌐 Integration with Laravel

### Passing Data from Laravel Controllers

```php
// app/Http/Controllers/ShopController.php
return Inertia::render('Main', [
    'featuredProducts' => Product::featured()->get(),
    'categories' => Category::all(),
]);
```

### Using in React Component

```tsx
// resources/js/Pages/Main.tsx
export default function Main({ featuredProducts, categories }) {
  return (
    <MainLayout>
      <FeaturedProducts products={featuredProducts} />
      <FeaturedCategories categories={categories} />
    </MainLayout>
  );
}
```

---

## 🔍 Troubleshooting

### Styles not applying
- Run `npm run dev`
- Check if TailwindCSS is compiling
- Verify class names are correct

### Imports not working
- Check `vite.config.js` has `@` alias configured
- Restart dev server after config changes

### TypeScript errors
- Run `npm run build` to check for type errors
- Verify all props are correctly typed

---

## 📚 Resources

- **Design System**: See `DESIGN_SYSTEM.md` for complete documentation
- **Tailwind Docs**: [tailwindcss.com](https://tailwindcss.com)
- **Inertia.js Docs**: [inertiajs.com](https://inertiajs.com)
- **React Docs**: [react.dev](https://react.dev)

---

## 🎨 Color Reference

### Complete Palette

```
// Brand (Blue)
brand-50:  #f0f9ff
brand-100: #e0f2fe
brand-200: #bae6fd
brand-300: #7dd3fc
brand-400: #38bdf8
brand-500: #0ea5e9 ← Primary
brand-600: #0284c7
brand-700: #0369a1
brand-800: #075985
brand-900: #0c4a6e
brand-950: #082f49

// Accent Colors
electric: #00ff88 ← Neon green
purple:   #a855f7 ← Vibrant purple
orange:   #fb923c ← Warm orange
pink:     #ec4899 ← Hot pink

// Neutrals (Gray scale)
neutral-50:  #fafafa ← Light background
neutral-100: #f5f5f5
neutral-200: #e5e5e5 ← Borders
neutral-300: #d4d4d4
neutral-400: #a3a3a3
neutral-500: #737373
neutral-600: #525252
neutral-700: #404040
neutral-800: #262626
neutral-900: #171717 ← Dark text/bg
neutral-950: #0a0a0a
```

---

## 🚀 Performance Tips

1. **Lazy load images** - Use `loading="lazy"` attribute
2. **Optimize images** - Compress and serve WebP format
3. **Code splitting** - Use dynamic imports for large components
4. **Minimize animations** - Keep animations under 300ms
5. **Use production build** - Always test with `npm run build`

---

**Built with ❤️ for VALENSITA**

For questions or support, refer to `DESIGN_SYSTEM.md` or contact the development team.

