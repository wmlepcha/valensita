<?php

namespace Database\Seeders;

use App\Models\HeroItem;
use Illuminate\Database\Seeder;

class HeroItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing hero items
        HeroItem::truncate();

        // Create hero items
        HeroItem::create([
            'title' => 'Premium Graphic Tee',
            'slug' => 'premium-graphic-tee',
            'price' => 8499.00,
            'image_url' => '/storage/images/devil-print-front.png',
            'lining' => '100% Cotton',
            'material' => 'Size Medium',
            'height' => '5.11/180 cm',
            'order' => 1,
            'is_active' => true,
        ]);

        HeroItem::create([
            'title' => 'Borg Bomber Jacket In Black',
            'slug' => 'borg-bomber-jacket-black',
            'price' => 29999.00,
            'image_url' => '/storage/images/card-print-front.png',
            'lining' => '100% Polyester',
            'material' => 'Size Medium',
            'height' => '6.2/191 cm',
            'order' => 2,
            'is_active' => true,
        ]);

        HeroItem::create([
            'title' => 'Essential Oversized Hoodie',
            'slug' => 'essential-oversized-hoodie',
            'price' => 18999.00,
            'image_url' => '/storage/images/flower-print-front.png',
            'lining' => '100% Cotton',
            'material' => 'Size Large',
            'height' => '6.0/183 cm',
            'order' => 3,
            'is_active' => true,
        ]);
    }
}
