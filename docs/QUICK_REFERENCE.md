# Quick Reference Guide

## Product Curation Sections

### Architecture Summary
- **Master Table**: `products` (single source of truth)
- **Curation Tables**: `hero_items`, `new_arrivals`, `trending_items` (only store display settings)
- **Relationship**: All curation tables have `product_id` (required, FK to products)

### Adding Products to Sections

#### Trending Now
1. Filament → Trending Now → Create
2. Select Product (required)
3. Choose Row (1 = T-Shirts, 2 = Hoodies)
4. Set Order (lower = first, max 4 per row)
5. Save

#### New Arrivals
1. Filament → New Arrivals → Create
2. Select Product (required)
3. Set Look Number (badge text)
4. Set Drop Number (category text)
5. Set Order
6. Save

#### Hero Section
1. Filament → Hero Section → Create
2. Select Product (required)
3. Set Lining/Material/Height (optional overrides)
4. Set Order
5. Save

### Key Rules
- ✅ Always link to a product (`product_id` required)
- ✅ Use product data (name, slug, images, price from products table)
- ✅ Only store section-specific settings in curation tables
- ❌ Don't duplicate product data in curation tables
- ❌ Don't create items without `product_id`

### Troubleshooting

**404 Error**: Check product slug format (should be `product-slug`, not `/product/product-slug`)

**Product Not Showing**: 
- Check `product_id` is set
- Check `is_active` = true
- Check product exists and is active

**Data Not Updating**: Update product in Products table, not in curation table

### Files to Reference
- Full Documentation: `docs/PRODUCT_CURATION_ARCHITECTURE.md`
- Shared Trait: `app/Filament/Resources/Concerns/HasProductRelationship.php`
- Controller: `app/Http/Controllers/HeroController.php`

