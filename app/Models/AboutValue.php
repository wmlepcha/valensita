<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AboutValue extends Model
{
    protected $fillable = [
        'about_section_id',
        'icon_name',
        'label',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the about section that owns this value.
     */
    public function aboutSection(): BelongsTo
    {
        return $this->belongsTo(AboutSection::class);
    }

    /**
     * Scope to get only active values.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order values.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
