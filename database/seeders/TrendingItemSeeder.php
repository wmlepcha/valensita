<?php

namespace Database\Seeders;

use App\Models\TrendingItem;
use Illuminate\Database\Seeder;

class TrendingItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing trending items
        TrendingItem::truncate();

        // Row 1 - T-Shirts (4 items)
        TrendingItem::create([
            'title' => 'Tiger Print T-Shirt',
            'image_url' => '/storage/images/tiger-print-back.png',
            'hover_image_url' => '/storage/images/tiger-print-front.png',
            'category_label' => 'T-SHIRTS',
            'slug' => '/product/tiger-print-tshirt',
            'row' => 1,
            'order' => 1,
            'background_gradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
            'is_active' => true,
        ]);

        TrendingItem::create([
            'title' => 'Card Print T-Shirt',
            'image_url' => '/storage/images/card-print-back.png',
            'hover_image_url' => '/storage/images/card-print-front.png',
            'category_label' => 'T-SHIRTS',
            'slug' => '/product/card-print-tshirt',
            'row' => 1,
            'order' => 2,
            'background_gradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
            'is_active' => true,
        ]);

        TrendingItem::create([
            'title' => 'Eagle Print T-Shirt',
            'image_url' => '/storage/images/flower-print-back.png',
            'hover_image_url' => '/storage/images/flower-print-front.png',
            'category_label' => 'T-SHIRTS',
            'slug' => '/product/eagle-print-tshirt',
            'row' => 1,
            'order' => 3,
            'background_gradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
            'is_active' => true,
        ]);

        TrendingItem::create([
            'title' => 'Devil Print T-Shirt',
            'image_url' => '/storage/images/devil-print-back.png',
            'hover_image_url' => '/storage/images/devil-print-front.png',
            'category_label' => 'T-SHIRTS',
            'slug' => '/product/devil-print-tshirt',
            'row' => 1,
            'order' => 4,
            'background_gradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
            'is_active' => true,
        ]);

        // Row 2 - Hoodies (4 items)
        TrendingItem::create([
            'title' => 'Demon Mask Hoodie',
            'image_url' => '/storage/images/devil-print-back.png',
            'hover_image_url' => '/storage/images/devil-print-front.png',
            'category_label' => 'HOODIES',
            'slug' => '/product/demon-mask-hoodie',
            'row' => 2,
            'order' => 1,
            'background_gradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
            'is_active' => true,
        ]);

        TrendingItem::create([
            'title' => 'Snake Print Hoodie',
            'image_url' => '/storage/images/tiger-print-back.png',
            'hover_image_url' => '/storage/images/tiger-print-front.png',
            'category_label' => 'HOODIES',
            'slug' => '/product/snake-print-hoodie',
            'row' => 2,
            'order' => 2,
            'background_gradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
            'is_active' => true,
        ]);

        TrendingItem::create([
            'title' => 'Roses Print Hoodie',
            'image_url' => '/storage/images/card-print-back.png',
            'hover_image_url' => '/storage/images/card-print-front.png',
            'category_label' => 'HOODIES',
            'slug' => '/product/roses-print-hoodie',
            'row' => 2,
            'order' => 3,
            'background_gradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
            'is_active' => true,
        ]);

        TrendingItem::create([
            'title' => 'Eagle Print Hoodie',
            'image_url' => '/storage/images/flower-print-back.png',
            'hover_image_url' => '/storage/images/flower-print-front.png',
            'category_label' => 'HOODIES',
            'slug' => '/product/eagle-print-hoodie',
            'row' => 2,
            'order' => 4,
            'background_gradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
            'is_active' => true,
        ]);
    }
}
