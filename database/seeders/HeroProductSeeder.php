<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\ProductSpecification;
use Illuminate\Database\Seeder;

class HeroProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Premium Graphic Tee - Hero Product
        $product = Product::create([
            'name' => 'Premium Graphic Tee',
            'slug' => 'premium-graphic-tee',
            'description' => 'Premium graphic t-shirt featuring bold designs. Made from 100% cotton for maximum comfort and durability. Perfect for streetwear enthusiasts who want to make a statement.',
            'price' => 8499.00,
            'original_price' => null,
            'category' => 'T-Shirts',
            'sku' => 'VAL-TEE-001',
            'in_stock' => true,
            'is_active' => true,
            'order' => 1,
        ]);

        // Add product images
        $product->images()->createMany([
            [
                'image_url' => '/storage/images/devil-print-front.png',
                'alt_text' => 'Premium Graphic Tee - Front View',
                'order' => 1,
            ],
            [
                'image_url' => '/storage/images/devil-print-back.png',
                'alt_text' => 'Premium Graphic Tee - Back View',
                'order' => 2,
            ],
            [
                'image_url' => '/storage/images/tiger-print-back.png',
                'alt_text' => 'Premium Graphic Tee - Side View',
                'order' => 3,
            ],
        ]);

        // Add product specifications
        $product->specifications()->createMany([
            [
                'key' => 'LINING',
                'value' => '100% Cotton',
                'order' => 1,
            ],
            [
                'key' => 'MATERIAL',
                'value' => 'Size Medium',
                'order' => 2,
            ],
            [
                'key' => 'HEIGHT',
                'value' => '5.11/180 cm',
                'order' => 3,
            ],
        ]);

        // Add color variants
        $product->variants()->createMany([
            [
                'type' => 'color',
                'name' => 'Black',
                'value' => '#000000',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'type' => 'color',
                'name' => 'White',
                'value' => '#FFFFFF',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'type' => 'color',
                'name' => 'Navy',
                'value' => '#1E3A8A',
                'order' => 3,
                'is_active' => true,
            ],
        ]);

        // Add size variants
        $product->variants()->createMany([
            [
                'type' => 'size',
                'name' => 'S',
                'value' => null,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'type' => 'size',
                'name' => 'M',
                'value' => null,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'type' => 'size',
                'name' => 'L',
                'value' => null,
                'order' => 3,
                'is_active' => true,
            ],
            [
                'type' => 'size',
                'name' => 'XL',
                'value' => null,
                'order' => 4,
                'is_active' => true,
            ],
            [
                'type' => 'size',
                'name' => '2XL',
                'value' => null,
                'order' => 5,
                'is_active' => true,
            ],
            [
                'type' => 'size',
                'name' => '3XL',
                'value' => null,
                'order' => 6,
                'is_active' => true,
            ],
        ]);

        // Add 2 more hero products for the carousel
        $product2 = Product::create([
            'name' => 'Borg Bomber Jacket In Black',
            'slug' => 'borg-bomber-jacket-black',
            'description' => 'Premium bomber jacket in black. Made from high-quality materials for style and comfort.',
            'price' => 29999.00,
            'original_price' => null,
            'category' => 'Jackets',
            'sku' => 'VAL-JKT-001',
            'in_stock' => true,
            'is_active' => true,
            'order' => 2,
        ]);

        $product2->images()->create([
            'image_url' => '/storage/images/card-print-front.png',
            'alt_text' => 'Borg Bomber Jacket In Black',
            'order' => 1,
        ]);

        $product2->specifications()->createMany([
            ['key' => 'LINING', 'value' => '100% Polyester', 'order' => 1],
            ['key' => 'MATERIAL', 'value' => 'Size Medium', 'order' => 2],
            ['key' => 'HEIGHT', 'value' => '6.2/191 cm', 'order' => 3],
        ]);

        $product3 = Product::create([
            'name' => 'Essential Oversized Hoodie',
            'slug' => 'essential-oversized-hoodie',
            'description' => 'Essential oversized hoodie for everyday comfort. Premium cotton construction.',
            'price' => 18999.00,
            'original_price' => null,
            'category' => 'Hoodies',
            'sku' => 'VAL-HOO-001',
            'in_stock' => true,
            'is_active' => true,
            'order' => 3,
        ]);

        $product3->images()->create([
            'image_url' => '/storage/images/flower-print-front.png',
            'alt_text' => 'Essential Oversized Hoodie',
            'order' => 1,
        ]);

        $product3->specifications()->createMany([
            ['key' => 'LINING', 'value' => '100% Cotton', 'order' => 1],
            ['key' => 'MATERIAL', 'value' => 'Size Large', 'order' => 2],
            ['key' => 'HEIGHT', 'value' => '6.0/183 cm', 'order' => 3],
        ]);
    }
}
