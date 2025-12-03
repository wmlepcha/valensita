<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subcategory extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'image_url',
        'is_active',
        'order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the category that owns this subcategory.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the products for this subcategory.
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class)->orderBy('order');
    }

    /**
     * Get active products for this subcategory.
     */
    public function activeProducts(): HasMany
    {
        return $this->products()->where('is_active', true);
    }

    /**
     * Scope to get only active subcategories.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order subcategories.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
