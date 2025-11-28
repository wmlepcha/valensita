<?php

namespace Database\Seeders;

use App\Models\NewArrival;
use App\Models\Product;
use Illuminate\Database\Seeder;

class NewArrivalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing new arrivals to avoid duplicates
        NewArrival::truncate();
        
        // Get existing products (skip first 3 which are hero products)
        $availableProducts = Product::skip(3)->take(4)->get();
        
        if ($availableProducts->count() >= 4) {
            // Use existing products
            $product1 = $availableProducts->get(0);
            $product2 = $availableProducts->get(1);
            $product3 = $availableProducts->get(2);
            $product4 = $availableProducts->get(3);
        } else {
            // Create new products for new arrivals if needed
            $product1 = Product::firstOrCreate(
                ['slug' => 'bamboozled-t-shirt'],
                [
                    'name' => 'Bamboozled T-Shirt',
                    'description' => 'Vibrant collage-style graphic featuring card games and cocktails.',
                    'price' => 5200.00,
                    'category' => 'T-Shirts',
                    'sku' => 'VAL-TEE-NA-001',
                    'in_stock' => true,
                    'is_active' => true,
                    'order' => 1,
                ]
            );

            $product2 = Product::firstOrCreate(
                ['slug' => 'bark-t-shirt'],
                [
                    'name' => 'Bark T-Shirt',
                    'description' => 'All-over repeating pattern of stylized demon faces.',
                    'price' => 5800.00,
                    'category' => 'T-Shirts',
                    'sku' => 'VAL-TEE-NA-002',
                    'in_stock' => true,
                    'is_active' => true,
                    'order' => 2,
                ]
            );

            $product3 = Product::firstOrCreate(
                ['slug' => 'black-stomp-t-shirt'],
                [
                    'name' => 'Black Stomp T-Shirt',
                    'description' => 'Large detailed graphic of a tiger with roses.',
                    'price' => 5800.00,
                    'category' => 'T-Shirts',
                    'sku' => 'VAL-TEE-NA-003',
                    'in_stock' => true,
                    'is_active' => true,
                    'order' => 3,
                ]
            );

            $product4 = Product::firstOrCreate(
                ['slug' => 'grey-night-wing-t-shirt'],
                [
                    'name' => 'Grey Night Wing T-Shirt',
                    'description' => 'Traditional tattoo-style graphic of an eagle with flowers.',
                    'price' => 5800.00,
                    'category' => 'T-Shirts',
                    'sku' => 'VAL-TEE-NA-004',
                    'in_stock' => true,
                    'is_active' => true,
                    'order' => 4,
                ]
            );
        }

        // Add images to products if they don't have any
        $imageMap = [
            'bamboozled-t-shirt' => ['/storage/images/card-print-back.png', '/storage/images/card-print-front.png'],
            'bark-t-shirt' => ['/storage/images/devil-print-back.png', '/storage/images/devil-print-front.png'],
            'black-stomp-t-shirt' => ['/storage/images/tiger-print-back.png', '/storage/images/tiger-print-front.png'],
            'grey-night-wing-t-shirt' => ['/storage/images/flower-print-back.png', '/storage/images/flower-print-front.png'],
        ];

        foreach ([$product1, $product2, $product3, $product4] as $index => $product) {
            if ($product->images->count() === 0) {
                $images = $imageMap[$product->slug] ?? ['/storage/images/placeholder.jpg'];
                foreach ($images as $imgIndex => $imagePath) {
                    $product->images()->create([
                        'image_url' => $imagePath,
                        'alt_text' => $product->name . ' - Image ' . ($imgIndex + 1),
                        'order' => $imgIndex + 1,
                    ]);
                }
            }
        }

        // Create new arrivals with images
        NewArrival::create([
            'product_id' => $product1->id,
            'look_number' => 'Look 01',
            'drop_number' => 'Drop 07',
            'image_url' => '/storage/images/card-print-back.png',
            'hover_image_url' => '/storage/images/card-print-front.png',
            'order' => 1,
            'is_active' => true,
        ]);

        NewArrival::create([
            'product_id' => $product2->id,
            'look_number' => 'Look 02',
            'drop_number' => 'Drop 07',
            'image_url' => '/storage/images/devil-print-back.png',
            'hover_image_url' => '/storage/images/devil-print-front.png',
            'order' => 2,
            'is_active' => true,
        ]);

        NewArrival::create([
            'product_id' => $product3->id,
            'look_number' => 'Look 03',
            'drop_number' => 'Drop 07',
            'image_url' => '/storage/images/tiger-print-back.png',
            'hover_image_url' => '/storage/images/tiger-print-front.png',
            'order' => 3,
            'is_active' => true,
        ]);

        NewArrival::create([
            'product_id' => $product4->id,
            'look_number' => 'Look 04',
            'drop_number' => 'Drop 07',
            'image_url' => '/storage/images/flower-print-back.png',
            'hover_image_url' => '/storage/images/flower-print-front.png',
            'order' => 4,
            'is_active' => true,
        ]);
    }
}
