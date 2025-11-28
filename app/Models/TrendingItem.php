<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class TrendingItem extends Model
{
    protected $fillable = [
        'title',
        'image_url',
        'hover_image_url',
        'category_label',
        'slug',
        'row',
        'order',
        'background_gradient',
        'product_id',
        'is_active',
    ];

    protected $casts = [
        'row' => 'integer',
        'order' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Delete image files when trending item is deleted
        static::deleting(function ($trendingItem) {
            if ($trendingItem->image_url && Storage::disk('public')->exists($trendingItem->image_url)) {
                Storage::disk('public')->delete($trendingItem->image_url);
            }
            if ($trendingItem->hover_image_url && Storage::disk('public')->exists($trendingItem->hover_image_url)) {
                Storage::disk('public')->delete($trendingItem->hover_image_url);
            }
        });

        // Delete old image files when image_url is updated
        static::updating(function ($trendingItem) {
            if ($trendingItem->isDirty('image_url') && $trendingItem->getOriginal('image_url')) {
                $oldImage = $trendingItem->getOriginal('image_url');
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
            if ($trendingItem->isDirty('hover_image_url') && $trendingItem->getOriginal('hover_image_url')) {
                $oldImage = $trendingItem->getOriginal('hover_image_url');
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        });
    }

    /**
     * Get the product that this trending item references (optional).
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Scope to get only active trending items.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get items for a specific row.
     */
    public function scopeForRow($query, int $row)
    {
        return $query->where('row', $row);
    }

    /**
     * Scope to order trending items.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('row')->orderBy('order');
    }

    /**
     * Get the image URL attribute.
     */
    public function getImageUrlAttribute($value)
    {
        if (!$value) {
            return null;
        }

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://') || str_starts_with($value, '/storage/')) {
            return $value;
        }

        return '/storage/' . $value;
    }

    /**
     * Get the hover image URL attribute.
     */
    public function getHoverImageUrlAttribute($value)
    {
        if (!$value) {
            return null;
        }

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://') || str_starts_with($value, '/storage/')) {
            return $value;
        }

        return '/storage/' . $value;
    }
}
