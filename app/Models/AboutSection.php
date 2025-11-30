<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class AboutSection extends Model
{
    protected $fillable = [
        'title',
        'description',
        'background_image_url',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Delete background image file when about section is deleted
        static::deleting(function ($aboutSection) {
            if ($aboutSection->background_image_url && Storage::disk('public')->exists($aboutSection->background_image_url)) {
                Storage::disk('public')->delete($aboutSection->background_image_url);
            }
        });

        // Delete old background image file when background_image_url is updated
        static::updating(function ($aboutSection) {
            if ($aboutSection->isDirty('background_image_url') && $aboutSection->getOriginal('background_image_url')) {
                $oldImage = $aboutSection->getOriginal('background_image_url');
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        });
    }

    /**
     * Get the brand values for this about section.
     */
    public function values(): HasMany
    {
        return $this->hasMany(AboutValue::class)->orderBy('order');
    }

    /**
     * Get active brand values.
     */
    public function activeValues(): HasMany
    {
        return $this->values()->where('is_active', true);
    }

    /**
     * Scope to get only active about sections.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the background image URL attribute.
     */
    public function getBackgroundImageUrlAttribute($value)
    {
        if (!$value) {
            return '/storage/images/stay-in-the-loop-bg.png'; // Default fallback
        }

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://') || str_starts_with($value, '/storage/')) {
            return $value;
        }

        return '/storage/' . $value;
    }
}
