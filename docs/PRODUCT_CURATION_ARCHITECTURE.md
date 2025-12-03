# Product Curation Architecture Documentation

## Overview

This document explains the architecture for managing product curation sections (Hero, New Arrivals, Trending) in the e-commerce platform. The system follows a **Single Source of Truth** principle where the `products` table is the master data source, and curation tables only manage display order and section-specific settings.

## Architecture Principles

### 1. Single Source of Truth
- **Products Table**: Contains all product master data (name, slug, price, images, description, category, etc.)
- **Curation Tables**: Only store curation-specific data (order, section settings, display preferences)
- **No Data Duplication**: Product data is never duplicated in curation tables

### 2. Relationship-Based Design
- All curation tables have a `product_id` foreign key (required)
- Product data is accessed via Eloquent relationships
- When product is updated, changes automatically reflect in all sections

### 3. DRY (Don't Repeat Yourself)
- Shared logic is extracted into traits (`HasProductRelationship`)
- Common form fields and table columns are reusable
- Controllers follow consistent patterns

## Database Structure

### Products Table (Master)
```
products
├── id
├── name
├── slug
├── price
├── description
├── category_id (FK to categories)
├── images (via product_images table)
├── variants (via product_variants table)
├── specifications (via product_specifications table)
└── ...
```

### Curation Tables

#### 1. Hero Items (`hero_items`)
**Purpose**: Manage products displayed in hero banner slider

**Fields**:
- `product_id` (required, FK to products)
- `order` (display order)
- `is_active` (enable/disable)
- `lining` (optional override, falls back to product specifications)
- `material` (optional override, falls back to product specifications)
- `height` (optional override, falls back to product specifications)

**Removed/Deprecated Fields**:
- ~~`title`~~ → Use `product.name`
- ~~`slug`~~ → Use `product.slug`
- ~~`price`~~ → Use `product.price`
- ~~`image_url`~~ → Use `product.images`

#### 2. New Arrivals (`new_arrivals`)
**Purpose**: Manage products displayed in "New Arrivals" section

**Fields**:
- `product_id` (required, FK to products)
- `look_number` (e.g., "Look 01", displayed as badge)
- `drop_number` (e.g., "Drop 07", displayed as category)
- `order` (display order)
- `is_active` (enable/disable)

**Removed/Deprecated Fields**:
- ~~`image_url`~~ → Use `product.images`
- ~~`hover_image_url`~~ → Use `product.images[1]`

#### 3. Trending Items (`trending_items`)
**Purpose**: Manage products displayed in "Trending Now" section (2 rows: T-Shirts and Hoodies)

**Fields**:
- `product_id` (required, FK to products)
- `row` (1 = T-Shirts row, 2 = Hoodies row)
- `order` (display order within row, max 4 per row)
- `background_gradient` (optional CSS gradient)
- `is_active` (enable/disable)

**Removed/Deprecated Fields**:
- ~~`title`~~ → Use `product.name`
- ~~`slug`~~ → Use `product.slug`
- ~~`category_label`~~ → Use `product.category`
- ~~`image_url`~~ → Use `product.images`
- ~~`hover_image_url`~~ → Use `product.images[1]`

## Filament Resources

### Shared Trait: `HasProductRelationship`

Located at: `app/Filament/Resources/Concerns/HasProductRelationship.php`

**Purpose**: Provides reusable form fields and table columns for product relationships

**Methods**:
- `productSelectField()`: Product selection dropdown (required, searchable, preloaded)
- `productInfoPlaceholder()`: Shows product details when selected
- `productTableColumn()`: Table column showing product name with link

**Usage**:
```php
use App\Filament\Resources\Concerns\HasProductRelationship;

class TrendingItemResource extends Resource
{
    use HasProductRelationship;
    
    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Product Selection')
                ->schema([
                    static::productSelectField(),
                    static::productInfoPlaceholder(),
                ]),
            // ... section-specific fields
        ]);
    }
}
```

### Resource Structure

All three resources follow the same pattern:

1. **Product Selection Section**: Uses shared trait methods
2. **Section-Specific Fields**: Unique to each section
3. **Settings Section**: Common fields (order, is_active)

## Controller Logic

### HeroController Pattern

All sections follow this pattern:

```php
// 1. Query curation table with product relationship
$items = CurationModel::active()
    ->whereNotNull('product_id') // Only items with products
    ->with(['product.images', 'product.categoryRelation'])
    ->ordered()
    ->get();

// 2. Map to frontend format using product data
->map(function ($item) {
    $product = $item->product;
    
    return [
        'id' => $product->id,
        'name' => $product->name,        // From product
        'slug' => $product->slug,        // From product
        'price' => $product->price,      // From product
        'image' => $product->images->first()?->image_url,
        // ... section-specific fields from curation table
    ];
});
```

### Data Flow

```
User clicks product in section
    ↓
Frontend: href={`/product/${product.slug}`}
    ↓
Route: /product/{slug} → ProductController@show
    ↓
Database: Product::where('slug', $slug)->first()
    ↓
Returns: Product detail page with all info
```

## Adding Products to Sections

### Trending Now Section

1. Go to Filament → **Trending Now**
2. Click **Create Trending Item**
3. **Product**: Select a product (required)
4. **Row**: Choose "Row 1 (T-Shirts)" or "Row 2 (Hoodies)"
5. **Order**: Set display order (lower = first, max 4 per row)
6. **Background Gradient**: Optional CSS gradient
7. **Active**: Toggle ON
8. Click **Create**

**Result**: Product appears in Trending section using product name, images, slug, and price.

### New Arrivals Section

1. Go to Filament → **New Arrivals**
2. Click **Create New Arrival**
3. **Product**: Select a product (required)
4. **Look Number**: e.g., "Look 01" (displayed as badge)
5. **Drop Number**: e.g., "Drop 07" (displayed as category)
6. **Order**: Set display order
7. **Active**: Toggle ON
8. Click **Create**

**Result**: Product appears in New Arrivals section.

### Hero Section

1. Go to Filament → **Hero Section**
2. Click **Create Hero Item**
3. **Product**: Select a product (required)
4. **Lining**: Optional override (defaults to product specification "LINING")
5. **Material**: Optional override (defaults to product specification "MATERIAL")
6. **Height**: Optional override (defaults to product specification "HEIGHT")
7. **Order**: Set display order
8. **Active**: Toggle ON
9. Click **Create**

**Result**: Product appears in hero banner slider.

## Benefits of This Architecture

### 1. Data Integrity
- Single source of truth prevents inconsistencies
- Foreign key constraints ensure valid products
- Product updates automatically reflect everywhere

### 2. Maintainability
- No duplicate code (shared trait)
- Clear separation of concerns
- Easy to add new sections

### 3. User Experience
- Clear Filament navigation
- Focused workflows per section
- Product information visible when selecting

### 4. Scalability
- Easy to add new curation sections
- Consistent patterns across sections
- Database relationships handle complexity

## Migration Guide

### For Existing Data

If you have existing curation items without `product_id`:

1. **Option 1**: Link to existing products
   - Edit each item in Filament
   - Select matching product
   - Save

2. **Option 2**: Create products first
   - Create products in Products table
   - Then link curation items

3. **Option 3**: Clean up
   - Delete items without products (they won't display anyway)

### Deprecated Fields

The following fields are deprecated but kept in database for backward compatibility:
- `hero_items.title`, `hero_items.slug`, `hero_items.price`, `hero_items.image_url`
- `trending_items.title`, `trending_items.slug`, `trending_items.category_label`, `trending_items.image_url`, `trending_items.hover_image_url`
- `new_arrivals.image_url`, `new_arrivals.hover_image_url`

**Note**: These fields are ignored when `product_id` exists. Consider removing them in a future migration after all items are linked.

## Troubleshooting

### Product Not Showing in Section

**Check**:
1. Is `product_id` set? (Required)
2. Is `is_active` = true?
3. Does the product exist and is it active?
4. Check controller query: `whereNotNull('product_id')`

### 404 Error When Clicking Product

**Check**:
1. Does product have a valid `slug`?
2. Is slug format correct? (should be `product-slug`, not `/product/product-slug`)
3. Check route: `/product/{slug}` exists
4. Verify ProductController@show method

### Product Data Not Updating

**Check**:
1. Are you updating the product in Products table?
2. Controller should use `$product->name`, not `$item->title`
3. Clear cache if needed

## Best Practices

1. **Always link to products**: Never create curation items without `product_id`
2. **Use product data**: Always use `$product->name`, `$product->slug`, etc.
3. **Keep curation minimal**: Only store section-specific data
4. **Test relationships**: Ensure products exist before linking
5. **Document overrides**: If you override product data, document why

## Future Enhancements

Potential improvements:
- [ ] Add validation to prevent duplicate products in same section
- [ ] Add bulk import/export for curation items
- [ ] Add preview functionality in Filament
- [ ] Add analytics for which products perform best in each section
- [ ] Add scheduling (show products at specific dates/times)

## Related Files

- **Trait**: `app/Filament/Resources/Concerns/HasProductRelationship.php`
- **Resources**: 
  - `app/Filament/Resources/TrendingItemResource.php`
  - `app/Filament/Resources/NewArrivalResource.php`
  - `app/Filament/Resources/HeroResource.php`
- **Controller**: `app/Http/Controllers/HeroController.php`
- **Models**:
  - `app/Models/Product.php`
  - `app/Models/TrendingItem.php`
  - `app/Models/NewArrival.php`
  - `app/Models/HeroItem.php`

---

**Last Updated**: 2025-01-02
**Maintained By**: Development Team

