<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
use App\Models\Subcategory;

class MenuItem extends Model
{
    protected $fillable = [
        'menu_id',
        'parent_id',
        'category_id',
        'subcategory_id',
        'label',
        'url',
        'image_url',
        'image_alt',
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

        // Delete image file when menu item is deleted
        static::deleting(function ($menuItem) {
            if ($menuItem->image_url && Storage::disk('public')->exists($menuItem->image_url)) {
                Storage::disk('public')->delete($menuItem->image_url);
            }
        });

        // Delete old image file when image_url is updated
        static::updating(function ($menuItem) {
            if ($menuItem->isDirty('image_url') && $menuItem->getOriginal('image_url')) {
                $oldImage = $menuItem->getOriginal('image_url');
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        });
    }

    /**
     * Get the menu that owns this item.
     */
    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    /**
     * Get the parent menu item.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'parent_id');
    }

    /**
     * Get the category that this menu item links to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the subcategory that this menu item links to.
     */
    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(Subcategory::class);
    }

    /**
     * Get the child menu items.
     */
    public function children()
    {
        return $this->hasMany(MenuItem::class, 'parent_id')->orderBy('order');
    }

    /**
     * Get the URL for this menu item.
     * Auto-generates from subcategory or category if linked, otherwise uses manual URL.
     * Note: This accessor is used when accessing $item->url directly.
     * In middleware, we generate URLs manually to avoid N+1 queries.
     */
    public function getUrlAttribute($value)
    {
        // If subcategory is linked, auto-generate URL with both category and subcategory
        if ($this->subcategory_id) {
            // Only load subcategory if not already loaded (to avoid N+1)
            if (!$this->relationLoaded('subcategory')) {
                $this->load('subcategory');
            }
            
            if ($this->subcategory && $this->subcategory->category) {
                return '/shop?category=' . $this->subcategory->category->slug . '&subcategory=' . $this->subcategory->slug;
            }
        }
        
        // If category is linked, auto-generate URL
        if ($this->category_id) {
            // Only load category if not already loaded (to avoid N+1)
            if (!$this->relationLoaded('category')) {
                $this->load('category');
            }
            
            if ($this->category) {
                return '/shop?category=' . $this->category->slug;
            }
        }
        
        // Otherwise use manual URL
        return $value;
    }

    /**
     * Get active child menu items.
     */
    public function activeChildren()
    {
        return $this->children()->where('is_active', true);
    }

    /**
     * Scope to get only top-level items (no parent).
     */
    public function scopeTopLevel($query)
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Scope to get only active items.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order items.
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
