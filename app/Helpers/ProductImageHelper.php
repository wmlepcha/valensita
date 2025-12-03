<?php

namespace App\Helpers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;

class ProductImageHelper
{
    /**
     * Default placeholder image path.
     */
    private const PLACEHOLDER_IMAGE = '/storage/images/placeholder.jpg';

    /**
     * Get the first image URL for a product.
     * Returns placeholder if no image is available.
     *
     * @param Product|null $product
     * @param string|null $default
     * @return string
     */
    public static function getFirstImageUrl(?Product $product, ?string $default = null): string
    {
        if (!$product) {
            return $default ?? self::PLACEHOLDER_IMAGE;
        }

        $firstImage = $product->images->first();
        
        if (!$firstImage || !$firstImage->image_url) {
            return $default ?? self::PLACEHOLDER_IMAGE;
        }

        return self::formatImageUrl($firstImage->image_url);
    }

    /**
     * Get all image URLs for a product.
     * Returns array with placeholder if no images are available.
     *
     * @param Product $product
     * @return array
     */
    public static function getAllImageUrls(Product $product): array
    {
        $images = $product->images->pluck('image_url')->toArray();
        
        if (empty($images)) {
            return [self::PLACEHOLDER_IMAGE];
        }

        return array_map(function ($imageUrl) {
            return self::formatImageUrl($imageUrl);
        }, $images);
    }

    /**
     * Format an image URL to be web-accessible.
     * Handles full URLs, /storage/ paths, and stored file paths.
     *
     * @param string|null $imageUrl
     * @return string
     */
    public static function formatImageUrl(?string $imageUrl): string
    {
        if (!$imageUrl) {
            return self::PLACEHOLDER_IMAGE;
        }

        // If it's already a full URL, return as is
        if (str_starts_with($imageUrl, 'http://') || str_starts_with($imageUrl, 'https://')) {
            return $imageUrl;
        }

        // If it starts with /storage/, return as is (already web-accessible)
        if (str_starts_with($imageUrl, '/storage/')) {
            return $imageUrl;
        }

        // If it's a stored file path, make it accessible via web
        return '/storage/' . $imageUrl;
    }

    /**
     * Format image URL for Filament table display.
     * Handles full URLs, /storage/ paths, and Storage disk paths.
     *
     * @param ProductImage|null $image
     * @return string|null
     */
    public static function formatForFilamentTable(?ProductImage $image): ?string
    {
        if (!$image || !$image->image_url) {
            return null;
        }

        $imageUrl = $image->getRawOriginal('image_url');

        // If it's already a full URL, return as is
        if (str_starts_with($imageUrl, 'http://') || str_starts_with($imageUrl, 'https://')) {
            return $imageUrl;
        }

        // If it starts with /storage/, it's an old path - return as URL
        if (str_starts_with($imageUrl, '/storage/')) {
            return url($imageUrl);
        }

        // Otherwise, it's a new uploaded file - use disk URL
        return Storage::disk('public')->url($imageUrl);
    }
}

