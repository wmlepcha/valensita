<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FooterServiceItem extends Model
{
    protected $fillable = [
        'footer_id',
        'text',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the footer that owns this service item.
     */
    public function footer(): BelongsTo
    {
        return $this->belongsTo(Footer::class);
    }

    /**
     * Scope to get only active service items.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order service items.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
