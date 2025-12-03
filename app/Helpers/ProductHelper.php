<?php

namespace App\Helpers;

class ProductHelper
{
    /**
     * Default sizes for clothing categories.
     */
    private const DEFAULT_CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    /**
     * Get default sizes for a category.
     *
     * @param string|null $categoryName
     * @return array
     */
    public static function getDefaultSizesForCategory(?string $categoryName): array
    {
        if (!$categoryName) {
            return [];
        }

        $categoryName = strtolower($categoryName);
        $clothingCategories = ['t-shirts', 't-shirt', 'shirts', 'shirt', 'hoodies', 'hoodie', 'joggers'];

        foreach ($clothingCategories as $clothingCategory) {
            if (str_contains($categoryName, $clothingCategory)) {
                return self::DEFAULT_CLOTHING_SIZES;
            }
        }

        return [];
    }

    /**
     * Get default sizes array (for use when no sizes exist in database).
     *
     * @return array
     */
    public static function getDefaultSizes(): array
    {
        return self::DEFAULT_CLOTHING_SIZES;
    }

    /**
     * Get extended default sizes (includes 2XL, 3XL).
     *
     * @return array
     */
    public static function getExtendedDefaultSizes(): array
    {
        return ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
    }
}

