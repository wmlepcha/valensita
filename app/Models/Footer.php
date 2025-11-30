<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Footer extends Model
{
    protected $fillable = [
        'brand_name',
        'description',
        'logo_url',
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

        // Delete logo file when footer is deleted
        static::deleting(function ($footer) {
            if ($footer->logo_url && Storage::disk('public')->exists($footer->logo_url)) {
                Storage::disk('public')->delete($footer->logo_url);
            }
        });

        // Delete old logo file when logo_url is updated
        static::updating(function ($footer) {
            if ($footer->isDirty('logo_url') && $footer->getOriginal('logo_url')) {
                $oldLogo = $footer->getOriginal('logo_url');
                if ($oldLogo && Storage::disk('public')->exists($oldLogo)) {
                    Storage::disk('public')->delete($oldLogo);
                }
            }
        });
    }

    /**
     * Get the social links for this footer.
     */
    public function socialLinks(): HasMany
    {
        return $this->hasMany(FooterSocialLink::class)->orderBy('order');
    }

    /**
     * Get active social links.
     */
    public function activeSocialLinks(): HasMany
    {
        return $this->socialLinks()->where('is_active', true);
    }

    /**
     * Get the service items for this footer.
     */
    public function serviceItems(): HasMany
    {
        return $this->hasMany(FooterServiceItem::class)->orderBy('order');
    }

    /**
     * Get active service items.
     */
    public function activeServiceItems(): HasMany
    {
        return $this->serviceItems()->where('is_active', true);
    }

    /**
     * Scope to get only active footers.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the logo URL attribute.
     */
    public function getLogoUrlAttribute($value)
    {
        if (!$value) {
            return '/storage/images/valensita-footer-logo.png'; // Default fallback
        }

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://') || str_starts_with($value, '/storage/')) {
            return $value;
        }

        return '/storage/' . $value;
    }
}
