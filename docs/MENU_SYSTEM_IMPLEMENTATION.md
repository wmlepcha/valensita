# Menu System Implementation Guide

## Overview

The menu system now supports **automatic linking to categories** from the products table. When a menu item is linked to a category, the URL is automatically generated as `/shop?category={category-slug}`, eliminating broken links and manual URL management.

## Architecture

### Database Structure

```
menu_items
├── category_id (FK to categories, nullable)
├── url (manual URL, only used if category_id is NULL)
└── ... other fields
```

### URL Generation Logic

1. **If `category_id` exists**: URL = `/shop?category={category.slug}`
2. **If `category_id` is NULL**: URL = manual `url` field

### Relationships

- `MenuItem` → `category()` (BelongsTo Category)
- Menu items can link to categories from the products table
- When category is selected, label auto-fills from category name

## How to Use

### Adding a Menu Item Linked to Category

1. Go to **Filament → Menus → Edit Menu → Items Tab**
2. Click **Create Item**
3. **Link to Category**: Select a category from dropdown
   - Label will auto-fill from category name
   - URL will auto-generate as `/shop?category={slug}`
4. Fill in other fields (order, image, etc.)
5. Save

### Adding a Menu Item with Custom URL

1. Go to **Filament → Menus → Edit Menu → Items Tab**
2. Click **Create Item**
3. **Link to Category**: Leave empty
4. **Custom URL**: Enter manual URL (e.g., `/about`, `/contact`)
5. Fill in other fields
6. Save

## Auto-Update Feature

**When new categories are added:**
- Categories automatically appear in the "Link to Category" dropdown
- No need to manually update menu structure
- Just select the new category when creating menu items

**Note**: Menu items are NOT auto-generated from categories. You still need to manually create menu items, but you can now link them to categories for automatic URL generation.

## Migration from Old System

### Existing Menu Items

Current menu items have hardcoded URLs that may not work:
- `/tshirts/graphic` → Should be `/shop?category=tshirts`
- `/hoodies/pullover` → Should be `/shop?category=hoodies`

### How to Fix

1. **Option 1: Link to Categories (Recommended)**
   - Edit each menu item in Filament
   - Select the appropriate category
   - Label and URL will auto-update
   - Save

2. **Option 2: Update URLs Manually**
   - Edit menu item
   - Leave category empty
   - Update URL to `/shop?category={category-slug}`
   - Save

### Category Mapping

Map existing menu items to categories:

| Menu Item Label | Category to Link |
|----------------|-----------------|
| Graphic Tees | T-Shirts |
| Plain Tees | T-Shirts |
| Oversized (T-Shirts) | T-Shirts or Oversized |
| Pullover | Hoodies |
| Zip-Up | Hoodies |
| Oversized (Hoodies) | Hoodies or Oversized |

## Benefits

1. ✅ **No Broken Links**: URLs auto-generate from categories
2. ✅ **Auto-Update**: New categories appear in dropdown automatically
3. ✅ **Type Safety**: Foreign key ensures valid categories
4. ✅ **Easy Management**: Just select category, URL generates automatically
5. ✅ **Flexible**: Can still use custom URLs for special pages

## Best Practices

1. **Link to Categories**: Always link menu items to categories when possible
2. **Use Custom URLs Sparingly**: Only for special pages (about, contact, etc.)
3. **Test Links**: After linking, test that menu items navigate correctly
4. **Keep Categories Active**: Only active categories appear in dropdown

## Troubleshooting

### Menu Item URL Not Working

**Check**:
1. Is category linked? (Check Filament table)
2. Does category exist and is it active?
3. Does category have a valid slug?
4. Test URL manually: `/shop?category={slug}`

### Category Not Appearing in Dropdown

**Check**:
1. Is category `is_active` = true?
2. Does category exist in database?
3. Clear cache if needed

### URL Still Shows Old Value

**Check**:
1. Is `category_id` set in database?
2. Clear browser cache
3. Check middleware is loading categories correctly

## Files Modified

- `app/Models/MenuItem.php` - Added category relationship and URL accessor
- `app/Filament/Resources/MenuResource/RelationManagers/ItemsRelationManager.php` - Added category select field
- `app/Http/Middleware/HandleInertiaRequests.php` - Eager load categories for menu items
- `database/migrations/2025_12_03_074211_add_category_id_to_menu_items_table.php` - Added category_id column

---

**Last Updated**: 2025-01-02

