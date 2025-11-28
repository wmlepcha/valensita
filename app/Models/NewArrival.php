<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class NewArrival extends Model
{
    protected $fillable = [
        'product_id',
        'look_number',
        'drop_number',
        'image_url',
        'hover_image_url',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Delete image files when new arrival is deleted
        static::deleting(function ($newArrival) {
            if ($newArrival->image_url && Storage::disk('public')->exists($newArrival->image_url)) {
                Storage::disk('public')->delete($newArrival->image_url);
            }
            if ($newArrival->hover_image_url && Storage::disk('public')->exists($newArrival->hover_image_url)) {
                Storage::disk('public')->delete($newArrival->hover_image_url);
            }
        });

        // Delete old image files when image_url is updated
        static::updating(function ($newArrival) {
            if ($newArrival->isDirty('image_url') && $newArrival->getOriginal('image_url')) {
                $oldImage = $newArrival->getOriginal('image_url');
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
            if ($newArrival->isDirty('hover_image_url') && $newArrival->getOriginal('hover_image_url')) {
                $oldImage = $newArrival->getOriginal('hover_image_url');
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        });
    }

    /**
     * Get the product that this new arrival references.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Scope to get only active new arrivals.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order new arrivals.
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

    /**
     * Get the hover image URL attribute.
     */
    public function getHoverImageUrlAttribute($value)
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
