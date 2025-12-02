<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'type',
        'name',
        'value',
        'quantity',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'quantity' => 'integer',
        'order' => 'integer',
    ];

    /**
     * Get the product that owns this variant.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Check if variant is out of stock (only for size variants).
     */
    public function isOutOfStock(): bool
    {
        if ($this->type !== 'size') {
            return false; // Colors don't have stock
        }
        return $this->quantity <= 0 || !$this->is_active;
    }

    /**
     * Get available quantity for this variant.
     */
    public function getAvailableQuantity(): int
    {
        if ($this->type !== 'size') {
            return 999; // Colors don't have stock limits
        }
        return max(0, $this->quantity ?? 0);
    }
}
