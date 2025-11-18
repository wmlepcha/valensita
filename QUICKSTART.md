# VALENSITA Design System - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. View the Design System
Your complete luxury streetwear UI is ready to use! Here's what's been created:

- ✅ Tailwind config with custom theme
- ✅ Global CSS with typography
- ✅ Layout components (Header, Footer, MainLayout)
- ✅ UI components (Button, Input, Badge, Select)
- ✅ Product components (Card, Grid, Details)
- ✅ Section components (Hero, Featured, Newsletter)
- ✅ Example pages (Home, Shop, Product)

### 2. Run the Development Server

```bash
npm run dev
```

Visit your Laravel app to see the new design!

### 3. Test the Examples

The design system includes three example pages:

**Homepage** (`Main.tsx`)
- Full luxury streetwear homepage
- Hero, products, categories, newsletter

**Product Page** (`ProductExample.tsx`)  
- Complete product detail view
- Image gallery, size/color selection
- Features and sizing guide

**Shop Page** (`ShopExample.tsx`)
- Product catalog with filters
- Sidebar filters, sort options
- Responsive grid

---

## 🎨 Using Components

### Create a New Page

```tsx
// resources/js/Pages/YourPage.tsx
import { MainLayout, Button, Hero } from '@/Layouts';
import { FeaturedProducts } from '@/Components';

export default function YourPage({ products }) {
  return (
    <MainLayout title="Your Page">
      <Hero 
        title="Your Title"
        image="/your-image.jpg"
      />
      
      <div className="section-spacing">
        <div className="container-wide">
          <h2>Your Section</h2>
          <FeaturedProducts products={products} />
        </div>
      </div>
    </MainLayout>
  );
}
```

### Use UI Components

```tsx
import { Button, Badge, Input } from '@/Components';

// Buttons
<Button variant="primary" size="lg">Shop Now</Button>
<Button variant="outline">Learn More</Button>

// Badges
<Badge variant="electric">New</Badge>
<Badge variant="accent">Sale</Badge>

// Inputs
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
/>
```

---

## 📐 Design Tokens

### Spacing (Always use these!)
```tsx
gap-4   // 16px
gap-6   // 24px  
gap-8   // 32px
p-6     // 24px padding
mb-12   // 48px margin bottom
```

### Containers
```tsx
<div className="container-wide">     {/* Max 1440px */}
<div className="container-custom">   {/* Max 1280px */}
<div className="container-narrow">   {/* Max 1024px */}
```

### Sections
```tsx
<section className="section-spacing">     {/* py-12 md:py-16 lg:py-24 */}
<section className="section-spacing-lg">  {/* py-16 md:py-24 lg:py-32 */}
```

### Colors
```tsx
bg-neutral-900    // Dark background
text-neutral-50   // Light text
bg-brand-500      // Primary blue
bg-accent-electric // Neon green
```

---

## 🎯 Common Patterns

### Product Grid Section

```tsx
<section className="section-spacing">
  <div className="container-wide">
    <h2 className="font-display font-bold text-4xl mb-12">
      Shop Collection
    </h2>
    
    <ProductGrid>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ProductGrid>
  </div>
</section>
```

### Category Cards

```tsx
<FeaturedCategories 
  categories={[
    {
      name: 'Hoodies',
      image: '/hoodies.jpg',
      link: '/category/hoodies'
    },
    // ...
  ]}
/>
```

### Newsletter Section

```tsx
<Newsletter />  {/* That's it! */}
```

---

## 🚀 Next Steps

1. **Customize Colors**
   - Edit `tailwind.config.js` → `colors`

2. **Add Real Data**
   - Pass props from Laravel controllers
   - Use Inertia.js to send data

3. **Create New Pages**
   - Copy example pages
   - Import components from `@/Components`

4. **Style Forms**
   - Use `Input`, `Select` components
   - Follow spacing system

5. **Read Full Docs**
   - `DESIGN_SYSTEM.md` - Complete design guide
   - `FRONTEND_README.md` - Technical documentation

---

## 📱 Mobile Testing

The design is fully responsive! Test at these sizes:
- 📱 Mobile: 375px - 640px
- 📱 Tablet: 768px - 1024px
- 💻 Desktop: 1280px+

---

## 🎨 Brand Colors Quick Reference

```
Primary:   #0ea5e9  (brand-500)
Electric:  #00ff88  (accent-electric)  
Purple:    #a855f7  (accent-purple)
Dark:      #171717  (neutral-900)
Light:     #fafafa  (neutral-50)
```

---

## ⚠️ Important Rules

1. **Always use the spacing scale** (4, 6, 8, 12, 16, 24...)
2. **Use `font-display` for headings**
3. **Keep shadows minimal** (shadow-sm, shadow-md)
4. **Use accent colors sparingly** (highlights only)
5. **Test on mobile first**

---

## 💡 Tips

- Components are in `resources/js/Components/`
- Use `@/` alias for imports
- Check console for TypeScript errors
- Run `npm run build` before deploying

---

## 🆘 Need Help?

1. Check `DESIGN_SYSTEM.md` for design guidelines
2. Check `FRONTEND_README.md` for technical docs
3. Look at example pages for patterns
4. Inspect existing components for structure

---

**You're ready to build beautiful luxury streetwear pages! 🎉**

Start by exploring:
- `resources/js/Pages/Main.tsx` - Homepage
- `resources/js/Pages/ProductExample.tsx` - Product page
- `resources/js/Pages/ShopExample.tsx` - Shop page

Happy coding! ✨

