# Component Cheatsheet - Quick Reference

## 🚀 Import Patterns

```tsx
// Single imports
import MainLayout from '@/Layouts/MainLayout';
import Button from '@/Components/UI/Button';
import Hero from '@/Components/Hero';

// Batch imports (recommended)
import { MainLayout } from '@/Layouts';
import { Button, Badge, Input } from '@/Components';
```

---

## 🎨 UI Components

### Button

```tsx
// Variants: primary | secondary | outline | ghost | accent
// Sizes: sm | md | lg | xl

<Button variant="primary" size="md">Text</Button>
<Button variant="outline" size="lg" fullWidth>Text</Button>
<Button variant="accent" disabled>Text</Button>
```

**Props:**
- `variant?` - Style variant
- `size?` - Size variant
- `fullWidth?` - Full width button
- `disabled?` - Disabled state
- All native button props

---

### Badge

```tsx
// Variants: default | brand | accent | outline | electric
// Sizes: sm | md | lg

<Badge variant="default">New</Badge>
<Badge variant="electric" size="lg">Sale</Badge>
<Badge variant="outline">Coming Soon</Badge>
```

**Props:**
- `variant?` - Style variant
- `size?` - Size variant
- `className?` - Additional classes

---

### Input

```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Invalid email"
  fullWidth
/>
```

**Props:**
- `label?` - Input label
- `error?` - Error message
- `fullWidth?` - Full width input
- All native input props

---

### Select

```tsx
<Select
  label="Size"
  options={[
    { value: 's', label: 'Small' },
    { value: 'm', label: 'Medium' },
  ]}
  error="Required"
  fullWidth
/>
```

**Props:**
- `label?` - Select label
- `options` - Array of {value, label}
- `error?` - Error message
- `fullWidth?` - Full width select
- All native select props

---

## 🛍️ Product Components

### ProductCard

```tsx
<ProductCard
  id={1}
  name="Essential Hoodie"
  price={89.99}
  originalPrice={120.00}
  image="/product.jpg"
  hoverImage="/product-2.jpg"
  badge="Sale"
  badgeVariant="accent"
  category="Hoodies"
/>
```

**Props:**
- `id` - Product ID
- `name` - Product name
- `price` - Current price
- `originalPrice?` - Original price (for discount)
- `image` - Main image URL
- `hoverImage?` - Hover image URL
- `badge?` - Badge text
- `badgeVariant?` - Badge style
- `category?` - Category name

---

### ProductGrid

```tsx
// Variants: default | wide
// default: 1→2→3→4 columns
// wide: 1→2→4 columns

<ProductGrid variant="default">
  {products.map(p => <ProductCard key={p.id} {...p} />)}
</ProductGrid>
```

**Props:**
- `variant?` - Grid layout variant
- `children` - Product cards

---

### ProductDetails

```tsx
<ProductDetails
  name="Essential Hoodie"
  price={89.99}
  originalPrice={120.00}
  description="Premium cotton hoodie..."
  images={['/img1.jpg', '/img2.jpg']}
  sizes={['S', 'M', 'L', 'XL']}
  colors={[
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
  ]}
  inStock={true}
  badge="Sale"
  category="Hoodies"
  sku="VAL-HOO-001"
/>
```

**Props:**
- `name` - Product name
- `price` - Current price
- `originalPrice?` - Original price
- `description` - Product description
- `images` - Array of image URLs
- `sizes` - Array of size options
- `colors?` - Array of {name, hex}
- `inStock` - Stock status
- `badge?` - Badge text
- `category` - Category name
- `sku?` - SKU code

---

## 📐 Section Components

### Hero

```tsx
// Align: left | center | right

<Hero
  title="Express Your Style"
  subtitle="Discover luxury streetwear"
  image="/hero.jpg"
  ctaText="Shop Now"
  ctaLink="/shop"
  secondaryCtaText="Learn More"
  secondaryCtaLink="/about"
  overlay={true}
  align="center"
/>
```

**Props:**
- `title` - Main heading
- `subtitle?` - Subheading
- `image` - Background image URL
- `ctaText?` - Primary CTA text
- `ctaLink?` - Primary CTA link
- `secondaryCtaText?` - Secondary CTA text
- `secondaryCtaLink?` - Secondary CTA link
- `overlay?` - Dark overlay (default: true)
- `align?` - Text alignment

---

### FeaturedProducts

```tsx
<FeaturedProducts
  title="New Arrivals"
  subtitle="Fresh drops from latest collections"
  products={productsArray}
  viewAllLink="/shop"
  variant="default"
/>
```

**Props:**
- `title` - Section title
- `subtitle?` - Section subtitle
- `products` - Array of product objects
- `viewAllLink?` - "View All" button link
- `variant?` - Grid variant (default | wide)

---

### FeaturedCategories

```tsx
<FeaturedCategories
  categories={[
    {
      name: 'Hoodies',
      image: '/hoodies.jpg',
      link: '/category/hoodies',
      description: 'Cozy essentials',
    },
  ]}
/>
```

**Props:**
- `categories` - Array of category objects
  - `name` - Category name
  - `image` - Category image
  - `link` - Category link
  - `description?` - Category description

---

### Newsletter

```tsx
<Newsletter />
```

No props needed! Includes:
- Email input
- Submit button
- Success/error states
- Privacy text

---

### PromoBar

```tsx
<PromoBar
  message="Free Shipping on Orders Over $100"
  link="/shop"
  dismissible={true}
/>
```

**Props:**
- `message` - Promo message
- `link?` - Optional link
- `dismissible?` - Show close button

---

## 🏗️ Layout Components

### MainLayout

```tsx
<MainLayout title="Page Title">
  {/* Your page content */}
</MainLayout>
```

**Props:**
- `title?` - Page title (for <Head>)
- `children` - Page content

Includes:
- Header with navigation
- Main content area
- Footer with links

---

### Header

```tsx
<Header />
```

No props needed! Includes:
- Logo
- Desktop navigation
- Search, account, cart icons
- Mobile menu toggle

---

### Footer

```tsx
<Footer />
```

No props needed! Includes:
- Brand info
- Navigation links
- Social media links
- Legal links

---

## 🎨 Utility Classes

### Containers

```tsx
<div className="container-wide">      {/* 1440px */}
<div className="container-custom">    {/* 1280px */}
<div className="container-narrow">    {/* 1024px */}
```

### Section Spacing

```tsx
<section className="section-spacing">     {/* py-12 md:py-16 lg:py-24 */}
<section className="section-spacing-sm">  {/* py-8 md:py-12 lg:py-16 */}
<section className="section-spacing-lg">  {/* py-16 md:py-24 lg:py-32 */}
```

### Gradients

```tsx
<div className="gradient-primary">    {/* Brand blue gradient */}
<div className="gradient-accent">     {/* Purple to pink */}
<div className="gradient-electric">   {/* Green to blue */}
```

### Animations

```tsx
<div className="animate-fade-in">
<div className="animate-slide-up">
<div className="animate-slide-down">
```

### Product Grids

```tsx
<div className="grid-products">       {/* 1→2→3→4 cols */}
<div className="grid-products-wide">  {/* 1→2→4 cols */}
```

### Aspect Ratios

```tsx
<div className="aspect-product">  {/* 3:4 ratio */}
<div className="aspect-hero">     {/* 16:9 ratio */}
```

### Overlays

```tsx
<div className="overlay-dark">   {/* Dark overlay */}
<div className="overlay-light">  {/* Light overlay */}
```

---

## 🎯 Common Patterns

### Basic Page Structure

```tsx
import MainLayout from '@/Layouts/MainLayout';

export default function Page() {
  return (
    <MainLayout title="Page Title">
      <div className="section-spacing">
        <div className="container-wide">
          <h1>Your Content</h1>
        </div>
      </div>
    </MainLayout>
  );
}
```

---

### Homepage Pattern

```tsx
<MainLayout title="Home">
  <PromoBar message="..." />
  <Hero title="..." image="..." />
  <FeaturedProducts products={...} />
  <FeaturedCategories categories={...} />
  <Newsletter />
</MainLayout>
```

---

### Product Grid Page

```tsx
<MainLayout title="Shop">
  <div className="section-spacing">
    <div className="container-wide">
      <h1>All Products</h1>
      <ProductGrid>
        {products.map(p => <ProductCard key={p.id} {...p} />)}
      </ProductGrid>
    </div>
  </div>
</MainLayout>
```

---

### Product Detail Page

```tsx
<MainLayout title={product.name}>
  <div className="section-spacing">
    <div className="container-wide">
      <ProductDetails {...product} />
    </div>
  </div>
  
  <FeaturedProducts 
    title="Related Products"
    products={related}
  />
</MainLayout>
```

---

## 🔧 Helper Functions

```tsx
import { formatPrice, calculateDiscount } from '@/utils/formatters';

// Format price
formatPrice(89.99)  // "$89.99"

// Calculate discount
calculateDiscount(120, 89.99)  // 25 (%)

// Format discount
formatDiscount(120, 89.99)  // "25% OFF"

// Truncate text
truncateText("Long text...", 50)

// Slugify
slugify("Product Name")  // "product-name"

// Validate email
isValidEmail("user@example.com")  // true
```

---

## 💡 Quick Tips

1. **Always use spacing scale**: 4, 6, 8, 12, 16, 24...
2. **Use font-display for headings**
3. **Keep shadows minimal**: shadow-sm, shadow-md
4. **Test mobile first**: Design for 375px+
5. **Use accent colors sparingly**: Highlights only
6. **Follow component patterns**: Copy existing examples

---

## 🚀 Getting Started

```bash
# 1. Install
npm install

# 2. Run dev server
npm run dev

# 3. View examples
# - resources/js/Pages/Main.tsx
# - resources/js/Pages/ProductExample.tsx
# - resources/js/Pages/ShopExample.tsx
```

---

**Need more help?**
- 📖 Full docs: `DESIGN_SYSTEM.md`
- 🚀 Quick start: `QUICKSTART.md`
- 📚 Overview: `UI_SYSTEM_SUMMARY.md`

