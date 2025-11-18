# VALENSITA Design System

## Brand Identity
**Modern · Bright · Luxury Streetwear**

This design system creates a cohesive luxury streetwear aesthetic that is bold yet minimal, expressive yet clean.

---

## Typography

### Fonts
- **Display/Headings**: `Space Grotesk` - Bold, modern geometric sans
- **Body**: `Inter` - Clean, highly readable
- **Monospace**: `JetBrains Mono` - For code/technical elements

### Heading Scale
```tsx
h1: 'text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight'
h2: 'text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight'
h3: 'text-3xl md:text-4xl font-display font-bold tracking-tight'
h4: 'text-2xl md:text-3xl font-display font-bold tracking-tight'
h5: 'text-xl md:text-2xl font-display font-bold tracking-tight'
h6: 'text-lg md:text-xl font-display font-bold tracking-tight'
```

---

## Color Palette

### Brand Colors
```
brand-50:  #f0f9ff  // Lightest blue
brand-500: #0ea5e9  // Primary blue
brand-700: #0369a1  // Darker blue
brand-900: #0c4a6e  // Darkest blue
```

### Accent Colors (Bright highlights)
```
accent-electric: #00ff88  // Neon green
accent-purple:   #a855f7  // Vibrant purple
accent-orange:   #fb923c  // Warm orange
accent-pink:     #ec4899  // Hot pink
```

### Neutral Scale
```
neutral-50:  #fafafa  // Background
neutral-100: #f5f5f5  // Light gray
neutral-200: #e5e5e5  // Borders
neutral-500: #737373  // Medium gray
neutral-700: #404040  // Dark gray
neutral-900: #171717  // Almost black
neutral-950: #0a0a0a  // Pure black
```

---

## Spacing System

**Unified 4px scale** - Use consistently across ALL components:

```
1:  4px    (0.25rem)
2:  8px    (0.5rem)
3:  12px   (0.75rem)
4:  16px   (1rem)
6:  24px   (1.5rem)
8:  32px   (2rem)
10: 40px   (2.5rem)
12: 48px   (3rem)
16: 64px   (4rem)
20: 80px   (5rem)
24: 96px   (6rem)
32: 128px  (8rem)
```

### Section Spacing
```tsx
section-spacing:    'py-12 md:py-16 lg:py-24'
section-spacing-sm: 'py-8 md:py-12 lg:py-16'
section-spacing-lg: 'py-16 md:py-24 lg:py-32'
```

### Container Widths
```tsx
container-custom:  'max-w-7xl px-4 md:px-6 lg:px-8'
container-narrow:  'max-w-5xl px-4 md:px-6 lg:px-8'
container-wide:    'max-w-[1440px] px-4 md:px-6 lg:px-8'
```

---

## Shadows

**Minimal shadow system** - Subtle, refined elevations:

```
xs:      '0 1px 2px 0 rgb(0 0 0 / 0.05)'
sm:      '0 2px 4px 0 rgb(0 0 0 / 0.05)'
DEFAULT: '0 4px 8px 0 rgb(0 0 0 / 0.05)'
md:      '0 6px 12px 0 rgb(0 0 0 / 0.05)'
lg:      '0 8px 16px 0 rgb(0 0 0 / 0.05)'
xl:      '0 12px 24px 0 rgb(0 0 0 / 0.07)'
2xl:     '0 16px 32px 0 rgb(0 0 0 / 0.08)'
```

---

## Border Radius

```
sm:      4px
DEFAULT: 8px
md:      12px
lg:      16px
xl:      24px
2xl:     32px
full:    9999px
```

---

## Component Library

### Button Variants

**Primary** - Dark background, light text
```tsx
<Button variant="primary" size="md">Shop Now</Button>
```

**Secondary** - Brand color
```tsx
<Button variant="secondary" size="md">Learn More</Button>
```

**Outline** - Border only
```tsx
<Button variant="outline" size="md">View All</Button>
```

**Ghost** - Transparent with hover
```tsx
<Button variant="ghost" size="md">Cancel</Button>
```

**Accent** - Gradient accent
```tsx
<Button variant="accent" size="md">Special Offer</Button>
```

### Badge Variants

```tsx
<Badge variant="default">New</Badge>
<Badge variant="brand">Featured</Badge>
<Badge variant="accent">Sale</Badge>
<Badge variant="electric">Limited</Badge>
<Badge variant="outline">Coming Soon</Badge>
```

### Input Components

```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  fullWidth
/>

<Select
  label="Size"
  options={[
    { value: 's', label: 'Small' },
    { value: 'm', label: 'Medium' },
    { value: 'l', label: 'Large' },
  ]}
/>
```

---

## Layout Components

### Header
- Sticky navigation with backdrop blur
- Logo, nav links, search, account, cart icons
- Mobile hamburger menu
- Height: 80px (5rem)

### Footer
- Dark background (neutral-900)
- 5-column grid on desktop
- Social links, navigation, legal links
- Brand column with description

### MainLayout
- Wraps Header + Content + Footer
- Manages page title and meta

---

## Product Components

### ProductCard
- 3:4 aspect ratio product image
- Hover effect with secondary image
- Quick add button on hover
- Badge support for "New", "Sale", etc.
- Category, name, price display

### ProductGrid
- Responsive grid: 1 → 2 → 3 → 4 columns
- Consistent 24px gaps
- `variant="wide"` for 4-column layout

### ProductDetails
- Image gallery with thumbnails
- Size/color selection
- Quantity controls
- Add to cart + wishlist
- Additional info icons

---

## Page Sections

### Hero
- Full-screen or 60-80vh height
- Background image with overlay
- Bold typography
- Primary + secondary CTAs
- Scroll indicator

### FeaturedProducts
- Section title + subtitle
- Product grid
- "View All" button
- Spacing: `section-spacing`

### FeaturedCategories
- 4-column grid
- Square aspect ratio cards
- Image with gradient overlay
- Category name + description
- Hover scale effect

### Newsletter
- Dark background section
- Email input + submit button
- Centered layout
- Privacy text

### PromoBar
- Top banner (40px height)
- Accent background
- Dismissible
- Optional link

---

## Design Principles

### 1. Unified Spacing
- Always use the 4px scale
- Never mix random spacing values
- Consistent padding/margins creates cohesion

### 2. Bold Typography
- Large, confident headings
- Space Grotesk for display text
- Tight tracking for modern look

### 3. Minimal Shadows
- Subtle elevation (5-8% opacity)
- Avoid heavy drop shadows
- Clean, flat aesthetic

### 4. Strong Grid Alignment
- Everything aligns to the grid
- Consistent container widths
- Predictable responsive behavior

### 5. Bright Accents
- Use accent colors sparingly
- Electric green for highlights
- Purple/pink for special elements
- High contrast for emphasis

### 6. Product-First Layout
- Large, high-quality images
- 3:4 aspect ratio for products
- Hover interactions show detail
- Quick actions on hover

### 7. Premium Spacing
- Generous whitespace
- Breathing room between sections
- Not cramped or cluttered

### 8. Smooth Transitions
- 200ms default duration
- Ease-out timing
- Subtle hover states
- Fade/slide animations

---

## Responsive Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Mobile-First Approach
- Design for mobile first
- Add complexity at larger breakpoints
- Test at all sizes

---

## Animation System

### Fade In
```tsx
className="animate-fade-in"
```

### Slide Up
```tsx
className="animate-slide-up"
```

### Slide Down
```tsx
className="animate-slide-down"
```

### Staggered Animations
```tsx
style={{ animationDelay: `${index * 100}ms` }}
```

---

## Usage Guidelines

### DO ✓
- Use the unified spacing scale
- Apply bold, confident typography
- Keep shadows minimal and subtle
- Maintain consistent container widths
- Use accent colors as highlights
- Provide hover states on interactive elements
- Ensure high contrast for readability

### DON'T ✗
- Mix random spacing values
- Use heavy shadows or glows
- Overcrowd the layout
- Use too many accent colors at once
- Skip hover/focus states
- Ignore responsive design
- Use generic stock photos

---

## File Structure

```
resources/js/
├── Components/
│   ├── UI/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── Select.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductDetails.tsx
│   ├── Hero.tsx
│   ├── FeaturedProducts.tsx
│   ├── FeaturedCategories.tsx
│   ├── Newsletter.tsx
│   └── PromoBar.tsx
├── Layouts/
│   ├── MainLayout.tsx
│   ├── Header.tsx
│   └── Footer.tsx
└── Pages/
    └── Main.tsx
```

---

## Getting Started

1. **Import Layout**
```tsx
import MainLayout from '@/Layouts/MainLayout';
```

2. **Use Components**
```tsx
import Button from '@/Components/UI/Button';
import Hero from '@/Components/Hero';
```

3. **Apply Spacing**
```tsx
<section className="section-spacing">
  <div className="container-wide">
    {/* Content */}
  </div>
</section>
```

4. **Maintain Consistency**
- Always use design tokens
- Follow the spacing system
- Match the brand aesthetic

---

## Examples

### Product Listing Page
```tsx
<MainLayout title="Shop">
  <div className="section-spacing">
    <div className="container-wide">
      <h1>All Products</h1>
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ProductGrid>
    </div>
  </div>
</MainLayout>
```

### Landing Page
```tsx
<MainLayout title="Home">
  <PromoBar message="Free Shipping" />
  <Hero title="New Collection" image="/hero.jpg" />
  <FeaturedProducts products={newArrivals} />
  <FeaturedCategories categories={categories} />
  <Newsletter />
</MainLayout>
```

---

**Remember**: Every component should feel like part of one cohesive luxury streetwear brand. Bold, bright, minimal, premium.

