<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display homepage with featured products
     */
    public function home()
    {
        // Get featured products for hero banner (first 3 products)
        $heroProducts = Product::active()
            ->ordered()
            ->with(['images', 'specifications'])
            ->take(3)
            ->get()
            ->map(function ($product) {
                $specs = $product->specifications->pluck('value', 'key')->toArray();
                return [
                    'id' => $product->id,
                    'title' => $product->name,
                    'price' => '₹' . number_format($product->price, 0),
                    'image' => $product->images->first()?->image_url ?? '/storage/images/placeholder.jpg',
                    'lining' => $specs['LINING'] ?? '100% Cotton',
                    'material' => $specs['MATERIAL'] ?? 'Size Medium',
                    'height' => $specs['HEIGHT'] ?? '5.11/180 cm',
                    'slug' => $product->slug,
                ];
            });

        // Get new arrival products (next 4 products)
        $newArrivals = Product::active()
            ->ordered()
            ->with('images')
            ->skip(3)
            ->take(4)
            ->get()
            ->map(function ($product) {
                $images = $product->images;
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'image' => $images->first()?->image_url ?? '/storage/images/placeholder.jpg',
                    'hoverImage' => $images->count() > 1 ? $images->get(1)->image_url : null,
                    'badge' => null,
                    'category' => $product->category ?? 'New Arrivals',
                    'slug' => $product->slug,
                ];
            });

        // Get trending products (shirts and hoodies)
        $trendingShirts = Product::active()
            ->where(function ($query) {
                $query->where('category', 'T-Shirts')
                      ->orWhere('category', 'LIKE', '%Shirt%');
            })
            ->with('images')
            ->take(4)
            ->get()
            ->map(function ($product) {
                $images = $product->images;
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'image' => $images->first()?->image_url ?? '/storage/images/placeholder.jpg',
                    'hoverImage' => $images->count() > 1 ? $images->get(1)->image_url : null,
                    'category' => $product->category ?? 'SHIRTS FROM ALCHEMY',
                    'backgroundGradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                    'slug' => $product->slug,
                ];
            });

        $trendingHoodies = Product::active()
            ->where(function ($query) {
                $query->where('category', 'Hoodies')
                      ->orWhere('category', 'LIKE', '%Hoodie%');
            })
            ->with('images')
            ->take(4)
            ->get()
            ->map(function ($product) {
                $images = $product->images;
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'image' => $images->first()?->image_url ?? '/storage/images/placeholder.jpg',
                    'hoverImage' => $images->count() > 1 ? $images->get(1)->image_url : null,
                    'category' => $product->category ?? 'HOODIES FROM SERPENTS & ANGELS',
                    'backgroundGradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                    'slug' => $product->slug,
                ];
            });

        return Inertia::render('Main', [
            'heroProducts' => $heroProducts,
            'newArrivals' => $newArrivals,
            'trendingShirts' => $trendingShirts,
            'trendingHoodies' => $trendingHoodies,
        ]);
    }

    /**
     * Display all products
     */
    public function index(Request $request)
    {
        $products = Product::active()
            ->ordered()
            ->with('images')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => (float) $product->price,
                    'image' => $product->images->first()?->image_url ?? '/storage/images/placeholder.jpg',
                    'category' => $product->category,
                ];
            });

        return Inertia::render('Shop', [
            'products' => $products,
            'category' => $request->query('category'), // Pass category from URL
        ]);
    }

    /**
     * Display the product details page
     */
    public function show($slug)
    {
        $product = Product::where('slug', $slug)
            ->with(['images', 'variants', 'specifications'])
            ->first();

        if (!$product) {
            abort(404);
        }

        // Format colors and sizes from variants
        $colors = $product->colors()
            ->get()
            ->map(function ($variant) {
                return [
                    'name' => $variant->name,
                    'hex' => $variant->value ?? '#000000',
                ];
            })
            ->toArray();

        $sizes = $product->sizes()
            ->get()
            ->pluck('name')
            ->toArray();

        // Format specifications
        $specifications = $product->specifications()
            ->get()
            ->mapWithKeys(function ($spec) {
                return [$spec->key => $spec->value];
            })
            ->toArray();

        // Ensure we have at least one image
        $images = $product->images->pluck('image_url')->toArray();
        if (empty($images)) {
            $images = ['/storage/images/placeholder.jpg'];
        }

        $formattedProduct = [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'description' => $product->description ?? '',
            'price' => (float) $product->price,
            'originalPrice' => $product->original_price ? (float) $product->original_price : null,
            'images' => $images,
            'colors' => $colors,
            'sizes' => $sizes,
            'category' => $product->category ?? '',
            'inStock' => $product->in_stock,
            'sku' => $product->sku,
            'specifications' => $specifications,
        ];

        return Inertia::render('ProductDetails', [
            'product' => $formattedProduct
        ]);
    }
}
