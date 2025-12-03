<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;

class CategoryFilterService
{
    /**
     * Apply category filter to a product query.
     * Handles both categoryRelation (new) and category (legacy) fields.
     *
     * @param Builder $query
     * @param string|null $categorySlug
     * @return Builder
     */
    public static function applyCategoryFilter(Builder $query, ?string $categorySlug): Builder
    {
        if (!$categorySlug) {
            return $query;
        }

        return $query->whereHas('categoryRelation', function ($q) use ($categorySlug) {
            $q->where('slug', $categorySlug);
        })->orWhere('category', $categorySlug);
    }

    /**
     * Apply category filter by category name (for backward compatibility).
     * Used in home() and tshirts() methods.
     *
     * @param Builder $query
     * @param string $categoryName
     * @return Builder
     */
    public static function applyCategoryNameFilter(Builder $query, string $categoryName): Builder
    {
        return $query->whereHas('categoryRelation', function ($q) use ($categoryName) {
            $q->where('name', $categoryName)
              ->orWhere('name', 'LIKE', "%{$categoryName}%");
        })->orWhere(function ($q) use ($categoryName) {
            $q->where('category', $categoryName)
              ->orWhere('category', 'LIKE', "%{$categoryName}%");
        });
    }

    /**
     * Get category name from product (with fallback to legacy field).
     *
     * @param Product $product
     * @param string|null $default
     * @return string
     */
    public static function getCategoryName(Product $product, ?string $default = null): string
    {
        return $product->categoryRelation?->name ?? $product->category ?? $default ?? '';
    }
}

