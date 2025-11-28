<?php

namespace Database\Seeders;

use App\Models\CategorySection;
use Illuminate\Database\Seeder;

class CategorySectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing category sections
        CategorySection::truncate();

        // Create Hoodies category section
        CategorySection::create([
            'title' => 'SHOP HOODIES',
            'image_url' => '/storage/images/hoodie-banner.png',
            'link' => '/category/hoodies',
            'button_text' => 'Explore',
            'order' => 1,
            'is_active' => true,
        ]);

        // Create T-Shirts category section
        CategorySection::create([
            'title' => 'SHOP OVERSIZED<br />T-SHIRTS',
            'image_url' => '/storage/images/tshirt-banner.png',
            'link' => '/category/tshirts',
            'button_text' => 'Explore',
            'order' => 2,
            'is_active' => true,
        ]);
    }
}
