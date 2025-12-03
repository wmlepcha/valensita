<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class HeroItem extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'price',
        'image_url',
        'lining',
        'material',
        'height',
        'care_instructions',
        'shipping_info',
        'premium_text',
        'product_id',
        'order',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Delete image file when hero item is deleted
        static::deleting(function ($heroItem) {
            if ($heroItem->image_url && Storage::disk('public')->exists($heroItem->image_url)) {
                Storage::disk('public')->delete($heroItem->image_url);
            }
        });

        // Delete old image file when image_url is updated
        static::updating(function ($heroItem) {
            if ($heroItem->isDirty('image_url') && $heroItem->getOriginal('image_url')) {
                $oldImage = $heroItem->getOriginal('image_url');
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        });
    }

    /**
     * Get the product that this hero item references (optional).
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Scope to get only active hero items.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order hero items.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    /**
     * Get the image URL attribute.
     * If it's a stored file, prepend /storage/ to make it accessible via web.
     */
    public function getImageUrlAttribute($value)
    {
        if (!$value) {
            return null;
        }

        // If it's already a full URL or starts with /storage/, return as is
        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://') || str_starts_with($value, '/storage/')) {
            return $value;
        }

        // If it's a stored file path, make it accessible via web
        return '/storage/' . $value;
    }
}
