<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'original_price',
        'category',
        'category_id',
        'sku',
        'in_stock',
        'quantity',
        'is_active',
        'order',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'in_stock' => 'boolean',
        'quantity' => 'integer',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the images for the product.
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('order');
    }

    /**
     * Get the variants for the product.
     */
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class)->orderBy('order');
    }

    /**
     * Get the color variants for the product.
     */
    public function colors()
    {
        return $this->variants()->where('type', 'color')->where('is_active', true);
    }

    /**
     * Get the size variants for the product.
     */
    public function sizes()
    {
        return $this->variants()->where('type', 'size')->where('is_active', true);
    }

    /**
     * Get the specifications for the product.
     */
    public function specifications(): HasMany
    {
        return $this->hasMany(ProductSpecification::class)->orderBy('order');
    }

    /**
     * Get the category that owns the product.
     */
    public function categoryRelation(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Get the category name (for backward compatibility).
     */
    public function getCategoryNameAttribute(): ?string
    {
        return $this->categoryRelation?->name ?? $this->category;
    }

    /**
     * Scope to get only active products.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order products.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    /**
     * Scope to get only products in stock (quantity > 0).
     */
    public function scopeInStock($query)
    {
        return $query->where('in_stock', true)->where(function ($q) {
            $q->where('quantity', '>', 0)
              ->orWhereHas('variants', function ($variantQuery) {
                  $variantQuery->where('type', 'size')
                               ->where('is_active', true)
                               ->where('quantity', '>', 0);
              });
        });
    }

    /**
     * Check if product is out of stock.
     * For products with sizes, checks if any size has stock.
     * For products without sizes, checks general quantity.
     */
    public function isOutOfStock(): bool
    {
        if (!$this->in_stock) {
            return true;
        }

        // Check if product has size variants
        $hasSizes = $this->sizes()->count() > 0;
        
        if ($hasSizes) {
            // Check if any size variant has stock
            $hasStock = $this->variants()
                ->where('type', 'size')
                ->where('is_active', true)
                ->where('quantity', '>', 0)
                ->exists();
            return !$hasStock;
        }

        // For products without sizes, check general quantity
        return $this->quantity <= 0;
    }

    /**
     * Get total stock from all size variants.
     */
    public function getTotalStockFromVariants(): int
    {
        return $this->variants()
            ->where('type', 'size')
            ->where('is_active', true)
            ->sum('quantity') ?? 0;
    }

    /**
     * Get stock status text.
     */
    public function getStockStatusAttribute(): string
    {
        if ($this->isOutOfStock()) {
            return 'OUT OF STOCK';
        }
        return 'IN STOCK';
    }
}
