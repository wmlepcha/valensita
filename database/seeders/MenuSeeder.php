<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hoodies Menu
        $hoodies = Menu::create([
            'name' => 'Hoodies',
            'slug' => 'hoodies',
            'url' => '/hoodies',
            'title' => 'Hoodies',
            'order' => 1,
            'is_active' => true,
        ]);

        $hoodies->items()->createMany([
            [
                'label' => 'Pullover',
                'url' => '/hoodies/pullover',
                'image_url' => 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
                'image_alt' => 'Pullover Hoodies',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'label' => 'Zip-Up',
                'url' => '/hoodies/zip-up',
                'image_url' => 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop',
                'image_alt' => 'Zip-Up Hoodies',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'label' => 'Oversized',
                'url' => '/hoodies/oversized',
                'image_url' => 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
                'image_alt' => 'Oversized Hoodies',
                'order' => 3,
                'is_active' => true,
            ],
        ]);

        // T-Shirts Menu
        $tshirts = Menu::create([
            'name' => 'T-Shirts',
            'slug' => 'tshirts',
            'url' => '/tshirts',
            'title' => 'T-Shirts',
            'order' => 2,
            'is_active' => true,
        ]);

        $tshirts->items()->createMany([
            [
                'label' => 'Graphic Tees',
                'url' => '/tshirts/graphic',
                'image_url' => 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop',
                'image_alt' => 'Graphic Tees',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'label' => 'Plain Tees',
                'url' => '/tshirts/plain',
                'image_url' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
                'image_alt' => 'Plain Tees',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'label' => 'Oversized',
                'url' => '/tshirts/oversized',
                'image_url' => 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop',
                'image_alt' => 'Oversized Tees',
                'order' => 3,
                'is_active' => true,
            ],
        ]);

        // Collections Menu
        $collections = Menu::create([
            'name' => 'Collections',
            'slug' => 'collections',
            'url' => '/collections',
            'title' => 'Collections',
            'order' => 3,
            'is_active' => true,
        ]);

        $collections->items()->createMany([
            [
                'label' => 'New Arrivals',
                'url' => '/collections/new-arrivals',
                'image_url' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop',
                'image_alt' => 'New Arrivals',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'label' => 'Bestsellers',
                'url' => '/collections/bestsellers',
                'image_url' => 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop',
                'image_alt' => 'Bestsellers',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'label' => 'Limited Edition',
                'url' => '/collections/limited-edition',
                'image_url' => 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=800&fit=crop',
                'image_alt' => 'Limited Edition',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'label' => 'Sale',
                'url' => '/collections/sale',
                'image_url' => null,
                'image_alt' => null,
                'order' => 4,
                'is_active' => true,
            ],
        ]);
    }
}
