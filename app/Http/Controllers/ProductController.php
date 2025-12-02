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
            ->with(['images', 'categoryRelation'])
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
                    'category' => $product->categoryRelation?->name ?? $product->category ?? 'New Arrivals',
                    'slug' => $product->slug,
                ];
            });

        // Get trending products (shirts and hoodies)
        $trendingShirts = Product::active()
            ->whereHas('categoryRelation', function ($query) {
                $query->where('name', 'T-Shirts')
                      ->orWhere('name', 'LIKE', '%Shirt%');
            })
            ->orWhere(function ($query) {
                $query->where('category', 'T-Shirts')
                      ->orWhere('category', 'LIKE', '%Shirt%');
            })
            ->with(['images', 'categoryRelation'])
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
                    'category' => $product->categoryRelation?->name ?? $product->category ?? 'SHIRTS FROM ALCHEMY',
                    'backgroundGradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                    'slug' => $product->slug,
                ];
            });

        $trendingHoodies = Product::active()
            ->whereHas('categoryRelation', function ($query) {
                $query->where('name', 'Hoodies')
                      ->orWhere('name', 'LIKE', '%Hoodie%');
            })
            ->orWhere(function ($query) {
                $query->where('category', 'Hoodies')
                      ->orWhere('category', 'LIKE', '%Hoodie%');
            })
            ->with(['images', 'categoryRelation'])
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
                    'category' => $product->categoryRelation?->name ?? $product->category ?? 'HOODIES FROM SERPENTS & ANGELS',
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
        $query = Product::active()
            ->ordered()
            ->with(['images', 'categoryRelation']);

        // Filter by category if provided
        if ($request->has('category')) {
            $categorySlug = $request->query('category');
            $query->whereHas('categoryRelation', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            })->orWhere('category', $categorySlug);
        }

        $products = $query->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => (float) $product->price,
                    'image' => $product->images->first()?->image_url ?? '/storage/images/placeholder.jpg',
                    'category' => $product->categoryRelation?->name ?? $product->category,
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
            ->with(['images', 'variants', 'specifications', 'categoryRelation'])
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

        // Get sizes with stock information
        $sizeVariants = $product->sizes()
            ->get()
            ->map(function ($variant) {
                return [
                    'name' => $variant->name,
                    'quantity' => $variant->quantity ?? 0,
                    'inStock' => ($variant->quantity ?? 0) > 0 && $variant->is_active,
                ];
            })
            ->toArray();
        
        $sizes = array_column($sizeVariants, 'name');
        
        // If no sizes exist, provide default sizes for clothing items
        $categoryName = strtolower($product->categoryRelation?->name ?? $product->category ?? '');
        if (empty($sizes) && in_array($categoryName, ['t-shirts', 't-shirt', 'shirts', 'shirt', 'hoodies', 'hoodie'])) {
            $sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
            // Create default size variants with no stock
            $sizeVariants = array_map(function ($size) {
                return [
                    'name' => $size,
                    'quantity' => 0,
                    'inStock' => false,
                ];
            }, $sizes);
        }

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

        // Determine if product is in stock (both in_stock flag and quantity > 0)
        // Use the model's isOutOfStock method and invert it
        $isInStock = !$product->isOutOfStock();

        // Calculate total stock from size variants
        $totalStock = collect($sizeVariants)->sum('quantity');
        
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
            'sizeStock' => $sizeVariants, // Size-specific stock information
            'category' => $product->categoryRelation?->name ?? $product->category ?? '',
            'inStock' => $isInStock,
            'totalStock' => $totalStock, // Total stock across all sizes
            'sku' => $product->sku,
            'specifications' => $specifications,
        ];

        return Inertia::render('ProductDetails', [
            'product' => $formattedProduct
        ]);
    }
}
