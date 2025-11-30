<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FooterSocialLink extends Model
{
    protected $fillable = [
        'footer_id',
        'platform',
        'url',
        'icon_name',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the footer that owns this social link.
     */
    public function footer(): BelongsTo
    {
        return $this->belongsTo(Footer::class);
    }

    /**
     * Scope to get only active social links.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order social links.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
