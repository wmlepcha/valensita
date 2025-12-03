# Subcategory System Documentation

## Overview

The subcategory system allows you to create more granular product classifications within categories. For example, under the "T-Shirts" category, you can have subcategories like "Solid", "Animal Print", "Graffiti", etc.

## Database Structure

### Tables
- **`subcategories`**: Stores subcategory information
  - `id`: Primary key
  - `category_id`: Foreign key to `categories` table
  - `name`: Subcategory name (e.g., "Solid", "Animal Print")
  - `slug`: URL-friendly identifier
  - `description`: Optional description
  - `image_url`: Optional image
  - `is_active`: Whether the subcategory is active
  - `order`: Display order

- **`products`**: Added `subcategory_id` column
- **`menu_items`**: Added `subcategory_id` column for linking menu items to subcategories

## How to Use

### 1. Creating Subcategories in Filament

1. Navigate to **Inventory > Subcategories** in the Filament admin panel
2. Click **New Subcategory**
3. Fill in the form:
   - **Category**: Select the parent category (required)
   - **Name**: Enter the subcategory name (e.g., "Solid", "Animal Print", "Graffiti")
   - **Slug**: Auto-generated from name, or customize it
   - **Description**: Optional
   - **Image**: Optional subcategory image
   - **Active**: Toggle to show/hide on website
   - **Order**: Display order (lower numbers appear first)

### 2. Assigning Subcategories to Products

1. Navigate to **Inventory > Products**
2. Edit an existing product or create a new one
3. In the **Basic Information** section:
   - First select a **Category**
   - Then select a **Subcategory** (optional)
   - The subcategory dropdown will only show subcategories for the selected category

### 3. Linking Subcategories in Navigation Menu

1. Navigate to **Menus** in Filament
2. Edit a menu and go to the **Items** tab
3. Create or edit a menu item:
   - **Link to Category**: Select a category (optional)
   - **Link to Subcategory**: Select a subcategory (optional, only visible after selecting a category)
   - The URL will be auto-generated as: `/shop?category={category-slug}&subcategory={subcategory-slug}`
   - If only category is selected: `/shop?category={category-slug}`
   - If neither is selected, you can enter a custom URL

## URL Structure

### Shop Page Filtering

- **By Category Only**: `/shop?category=tshirts`
- **By Category and Subcategory**: `/shop?category=tshirts&subcategory=solid`

The shop page will automatically filter products based on these query parameters.

## Model Relationships

### Subcategory Model
```php
// Belongs to a Category
$subcategory->category

// Has many Products
$subcategory->products
$subcategory->activeProducts
```

### Product Model
```php
// Belongs to a Category
$product->categoryRelation

// Belongs to a Subcategory
$product->subcategory
```

### MenuItem Model
```php
// Can link to a Category
$menuItem->category

// Can link to a Subcategory
$menuItem->subcategory
```

## Scopes

### Subcategory Scopes
- `active()`: Get only active subcategories
- `ordered()`: Order by display order

### Usage
```php
// Get active subcategories for a category
$subcategories = Subcategory::where('category_id', $categoryId)
    ->active()
    ->ordered()
    ->get();
```

## Best Practices

1. **Naming**: Use clear, descriptive names for subcategories (e.g., "Solid", "Animal Print", "Graffiti")
2. **Slugs**: Keep slugs URL-friendly and lowercase
3. **Ordering**: Use the order field to control how subcategories appear in dropdowns
4. **Menu Items**: Link menu items to subcategories for better navigation
5. **Products**: Always assign products to both category and subcategory for better organization

## Example Workflow

1. **Create Categories**: T-Shirts, Hoodies, etc.
2. **Create Subcategories**: 
   - Under T-Shirts: Solid, Animal Print, Graffiti
   - Under Hoodies: Solid, Patterned, Graphic
3. **Assign to Products**: Link each product to both category and subcategory
4. **Link in Menu**: Create menu items that link to subcategories for easy navigation

## Troubleshooting

### Subcategory not appearing in dropdown
- Ensure the parent category is selected first
- Check that the subcategory is marked as active
- Verify the subcategory belongs to the selected category

### Menu item URL not working
- Check that both category and subcategory are properly linked
- Verify the slugs are correct
- Clear cache: `php artisan cache:clear`

### Products not filtering correctly
- Ensure products have both `category_id` and `subcategory_id` set
- Check that both category and subcategory are active
- Verify the URL parameters match the slugs in the database

