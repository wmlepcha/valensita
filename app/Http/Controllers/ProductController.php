<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display all products
     */
    public function index()
    {
        // TODO: Replace with actual database query
        $products = $this->getAllDummyProducts();

        return Inertia::render('Shop', [
            'products' => $products
        ]);
    }

    /**
     * Display the product details page
     */
    public function show($slug)
    {
        // TODO: Replace with actual database query
        // For now, using dummy data
        $product = $this->getDummyProduct($slug);

        if (!$product) {
            abort(404);
        }

        return Inertia::render('ProductDetails', [
            'product' => $product
        ]);
    }

    /**
     * Temporary method to get dummy product data
     * This will be replaced with actual database queries
     */
    private function getDummyProduct($slug)
    {
        $products = [
            'valensita-devil-print' => [
                'id' => 1,
                'name' => 'Valensita Devil Print',
                'slug' => 'valensita-devil-print',
                'description' => 'Premium oversized t-shirt featuring our exclusive devil print design. Made from 100% cotton for maximum comfort and durability. Perfect for streetwear enthusiasts who want to make a bold statement.',
                'price' => 49.99,
                'images' => [
                    '/storage/images/devil-print-front.png',
                    '/storage/images/devil-print-back.png',
                ],
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'White', 'hex' => '#FFFFFF'],
                    ['name' => 'Red', 'hex' => '#DC2626'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL', '2XL', '3XL'],
                'category' => 'T-Shirts',
                'inStock' => true,
            ],
            'valensita-tiger-print' => [
                'id' => 2,
                'name' => 'Valensita Tiger Print',
                'slug' => 'valensita-tiger-print',
                'description' => 'Bold tiger print design on premium quality cotton. This statement piece combines comfort with fierce style, perfect for those who dare to stand out.',
                'price' => 49.99,
                'images' => [
                    '/storage/images/tiger-print-front.png',
                    '/storage/images/tiger-print-back.png',
                ],
                'colors' => [
                    ['name' => 'Orange', 'hex' => '#EA580C'],
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Navy', 'hex' => '#1E3A8A'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL', '2XL', '3XL'],
                'category' => 'T-Shirts',
                'inStock' => true,
            ],
            'valensita-card-print' => [
                'id' => 3,
                'name' => 'Valensita Card Print',
                'slug' => 'valensita-card-print',
                'description' => 'Unique card-inspired design that blends streetwear with artistic flair. Premium cotton construction ensures lasting comfort and style.',
                'price' => 49.99,
                'images' => [
                    '/storage/images/card-print-front.png',
                    '/storage/images/card-print-back.png',
                ],
                'colors' => [
                    ['name' => 'Cream', 'hex' => '#FEF3C7'],
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Green', 'hex' => '#059669'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL', '2XL', '3XL'],
                'category' => 'T-Shirts',
                'inStock' => true,
            ],
        ];

        return $products[$slug] ?? null;
    }

    /**
     * Get all dummy products for shop page
     */
    private function getAllDummyProducts()
    {
        return [
            [
                'id' => 1,
                'name' => 'Valensita Devil Print',
                'slug' => 'valensita-devil-print',
                'price' => 4999,
                'image' => '/storage/images/devil-print-front.png',
                'category' => 'T-Shirts',
            ],
            [
                'id' => 2,
                'name' => 'Valensita Tiger Print',
                'slug' => 'valensita-tiger-print',
                'price' => 4999,
                'image' => '/storage/images/tiger-print-front.png',
                'category' => 'T-Shirts',
            ],
            [
                'id' => 3,
                'name' => 'Valensita Card Print',
                'slug' => 'valensita-card-print',
                'price' => 4999,
                'image' => '/storage/images/card-print-front.png',
                'category' => 'T-Shirts',
            ],
            [
                'id' => 4,
                'name' => 'Valensita Trial Print',
                'slug' => 'valensita-trial-print',
                'price' => 4999,
                'image' => '/storage/images/flower-print-front.png',
                'category' => 'T-Shirts',
            ],
            [
                'id' => 5,
                'name' => 'Card Print Shirt',
                'slug' => 'valensita-devil-print',
                'price' => 4200,
                'image' => '/storage/images/card-print-front.png',
                'category' => 'T-Shirts',
            ],
            [
                'id' => 6,
                'name' => 'Devil Print Shirt',
                'slug' => 'valensita-tiger-print',
                'price' => 4200,
                'image' => '/storage/images/devil-print-front.png',
                'category' => 'T-Shirts',
            ],
            [
                'id' => 7,
                'name' => 'Tiger Print Shirt',
                'slug' => 'valensita-card-print',
                'price' => 4200,
                'image' => '/storage/images/tiger-print-front.png',
                'category' => 'T-Shirts',
            ],
            [
                'id' => 8,
                'name' => 'Flower Print Shirt',
                'slug' => 'valensita-devil-print',
                'price' => 4200,
                'image' => '/storage/images/flower-print-front.png',
                'category' => 'T-Shirts',
            ],
            [
                'id' => 9,
                'name' => 'Eagle Print Hoodie',
                'slug' => 'valensita-tiger-print',
                'price' => 8999,
                'image' => '/storage/images/neon-print-front.png',
                'category' => 'Hoodies',
            ],
            [
                'id' => 10,
                'name' => 'Snake Print Hoodie',
                'slug' => 'valensita-card-print',
                'price' => 8999,
                'image' => '/storage/images/snake-print-front.png',
                'category' => 'Hoodies',
            ],
            [
                'id' => 11,
                'name' => 'Sunset Print Hoodie',
                'slug' => 'valensita-devil-print',
                'price' => 8999,
                'image' => '/storage/images/roses-print-front.png',
                'category' => 'Hoodies',
            ],
            [
                'id' => 12,
                'name' => 'Dragon Print Hoodie',
                'slug' => 'valensita-tiger-print',
                'price' => 8999,
                'image' => '/storage/images/italy-print-front.png',
                'category' => 'Hoodies',
            ],
        ];
    }
}
