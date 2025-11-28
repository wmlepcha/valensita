<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CategorySection extends Model
{
    protected $fillable = [
        'title',
        'image_url',
        'link',
        'button_text',
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

        // Delete image file when category section is deleted
        static::deleting(function ($categorySection) {
            if ($categorySection->image_url && Storage::disk('public')->exists($categorySection->image_url)) {
                Storage::disk('public')->delete($categorySection->image_url);
            }
        });

        // Delete old image file when image_url is updated
        static::updating(function ($categorySection) {
            if ($categorySection->isDirty('image_url') && $categorySection->getOriginal('image_url')) {
                $oldImage = $categorySection->getOriginal('image_url');
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        });
    }

    /**
     * Scope to get only active category sections.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order category sections.
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
