<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'original_price',
        'category',
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
        return $query->where('quantity', '>', 0)->where('in_stock', true);
    }

    /**
     * Check if product is out of stock.
     */
    public function isOutOfStock(): bool
    {
        return $this->quantity <= 0 || !$this->in_stock;
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
