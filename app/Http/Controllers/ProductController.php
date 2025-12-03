<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\CategoryFilterService;
use App\Helpers\ProductHelper;
use App\Helpers\ProductImageHelper;
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
                    'image' => ProductImageHelper::getFirstImageUrl($product),
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
                $allImages = ProductImageHelper::getAllImageUrls($product);
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'image' => $allImages[0] ?? ProductImageHelper::getFirstImageUrl($product),
                    'hoverImage' => $allImages[1] ?? null,
                    'badge' => null,
                    'category' => CategoryFilterService::getCategoryName($product, 'New Arrivals'),
                    'slug' => $product->slug,
                ];
            });

        // Get trending products (shirts and hoodies)
        $trendingShirts = CategoryFilterService::applyCategoryNameFilter(
            Product::active()->with(['images', 'categoryRelation']),
            'Shirt'
        )
            ->take(4)
            ->get()
            ->map(function ($product) {
                $allImages = ProductImageHelper::getAllImageUrls($product);
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'image' => $allImages[0] ?? ProductImageHelper::getFirstImageUrl($product),
                    'hoverImage' => $allImages[1] ?? null,
                    'category' => CategoryFilterService::getCategoryName($product, 'SHIRTS FROM ALCHEMY'),
                    'backgroundGradient' => 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                    'slug' => $product->slug,
                ];
            });

        $trendingHoodies = CategoryFilterService::applyCategoryNameFilter(
            Product::active()->with(['images', 'categoryRelation']),
            'Hoodie'
        )
            ->take(4)
            ->get()
            ->map(function ($product) {
                $allImages = ProductImageHelper::getAllImageUrls($product);
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'image' => $allImages[0] ?? ProductImageHelper::getFirstImageUrl($product),
                    'hoverImage' => $allImages[1] ?? null,
                    'category' => CategoryFilterService::getCategoryName($product, 'HOODIES FROM SERPENTS & ANGELS'),
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
     * Display T-shirts page
     * Note: Consider redirecting to /shop?category=t-shirts instead
     */
    public function tshirts()
    {
        $products = CategoryFilterService::applyCategoryNameFilter(
            Product::active()->with(['images', 'categoryRelation']),
            'Shirt'
        )
            ->ordered()
            ->get()
            ->map(function ($product) {
                $allImages = ProductImageHelper::getAllImageUrls($product);
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug ?? \Illuminate\Support\Str::slug($product->name),
                    'price' => (float) $product->price,
                    'image' => $allImages[0] ?? ProductImageHelper::getFirstImageUrl($product),
                    'hoverImage' => $allImages[1] ?? null,
                    'category' => CategoryFilterService::getCategoryName($product, 'T-Shirts'),
                ];
            });

        return Inertia::render('Tshirts', [
            'products' => $products,
        ]);
    }

    /**
     * Display all products
     */
    public function index(Request $request)
    {
        $query = Product::active()
            ->ordered()
            ->with(['images', 'categoryRelation', 'subcategory', 'variants']);

        // Filter by category if provided
        if ($request->has('category')) {
            $categorySlug = $request->query('category');
            $query = CategoryFilterService::applyCategoryFilter($query, $categorySlug);
        }

        // Filter by subcategory if provided (supports multiple subcategories comma-separated)
        $subcategorySlugs = self::parseSubcategoryFilter($request);
        if (!empty($subcategorySlugs)) {
            $subcategories = \App\Models\Subcategory::whereIn('slug', $subcategorySlugs)->get();
            
            if ($subcategories->isNotEmpty()) {
                // If category is not explicitly set, filter by subcategories' parent categories
                if (!$request->has('category')) {
                    $categoryIds = $subcategories->pluck('category_id')->unique();
                    $query->whereHas('categoryRelation', function ($q) use ($categoryIds) {
                        $q->whereIn('id', $categoryIds);
                    });
                }
                
                // Filter by subcategories (OR condition - products matching any of the selected subcategories)
                $query->whereHas('subcategory', function ($q) use ($subcategorySlugs) {
                    $q->whereIn('slug', $subcategorySlugs);
                });
            }
        }

        // Filter by size if provided
        if ($request->has('size')) {
            $size = $request->query('size');
            $query->whereHas('variants', function ($q) use ($size) {
                $q->where('type', 'size')
                  ->where('name', $size)
                  ->where('is_active', true)
                  ->where('quantity', '>', 0);
            });
        }

        // Filter by price range if provided
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->query('min_price'));
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->query('max_price'));
        }

        $products = $query->get()
            ->map(function ($product) {
                // Get available sizes from variants
                $sizes = $product->variants()
                    ->where('type', 'size')
                    ->where('is_active', true)
                    ->where('quantity', '>', 0)
                    ->pluck('name')
                    ->toArray();
                
                // If no sizes in variants, use default sizes for clothing
                if (empty($sizes)) {
                    $categoryName = CategoryFilterService::getCategoryName($product);
                    $sizes = ProductHelper::getDefaultSizesForCategory($categoryName);
                }

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => (float) $product->price,
                    'image' => ProductImageHelper::getFirstImageUrl($product),
                    'category' => CategoryFilterService::getCategoryName($product),
                    'subcategory' => $product->subcategory?->name ?? null,
                    'subcategory_slug' => $product->subcategory?->slug ?? null,
                    'available_sizes' => $sizes,
                ];
            });

        // Get categories and subcategories for filters
        $categories = \App\Models\Category::active()
            ->ordered()
            ->get(['id', 'name', 'slug'])
            ->map(function ($cat) {
                return [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'slug' => $cat->slug,
                ];
            });

        $subcategories = \App\Models\Subcategory::active()
            ->with('category')
            ->ordered()
            ->get(['id', 'name', 'slug', 'category_id'])
            ->map(function ($sub) {
                return [
                    'id' => $sub->id,
                    'name' => $sub->name,
                    'slug' => $sub->slug,
                    'category_id' => $sub->category_id,
                    'category_name' => $sub->category->name ?? null,
                ];
            });

        // Get unique sizes from all products
        $allSizes = \App\Models\ProductVariant::where('type', 'size')
            ->where('is_active', true)
            ->where('quantity', '>', 0)
            ->distinct()
            ->orderBy('name')
            ->pluck('name')
            ->toArray();

        // If no sizes in database, use default sizes
        if (empty($allSizes)) {
            $allSizes = ProductHelper::getExtendedDefaultSizes();
        }

        return Inertia::render('Shop', [
            'products' => $products,
            'categories' => $categories,
            'subcategories' => $subcategories,
            'sizes' => $allSizes,
            'filters' => [
                'category' => $request->query('category'),
                'subcategory' => $subcategorySlugs,
                'size' => $request->query('size'),
                'min_price' => $request->query('min_price', 0),
                'max_price' => $request->query('max_price', 10000),
            ],
        ]);
    }

    /**
     * Parse subcategory filter from request (can be comma-separated string or array).
     *
     * @param Request $request
     * @return array
     */
    private static function parseSubcategoryFilter(Request $request): array
    {
        if (!$request->has('subcategory')) {
            return [];
        }

        $subcategoryFilter = $request->query('subcategory');
        
        if (is_array($subcategoryFilter)) {
            return array_filter(array_map('trim', $subcategoryFilter));
        }
        
        if (is_string($subcategoryFilter)) {
            return array_filter(array_map('trim', explode(',', $subcategoryFilter)));
        }
        
        return [];
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
        $categoryName = CategoryFilterService::getCategoryName($product);
        if (empty($sizes)) {
            $defaultSizes = ProductHelper::getDefaultSizesForCategory($categoryName);
            if (!empty($defaultSizes)) {
                $sizes = $defaultSizes;
                // Create default size variants with no stock
                $sizeVariants = array_map(function ($size) {
                    return [
                        'name' => $size,
                        'quantity' => 0,
                        'inStock' => false,
                    ];
                }, $sizes);
            }
        }

        // Format specifications
        $specifications = $product->specifications()
            ->get()
            ->mapWithKeys(function ($spec) {
                return [$spec->key => $spec->value];
            })
            ->toArray();

        // Get all images using helper
        $images = ProductImageHelper::getAllImageUrls($product);

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
            'category' => CategoryFilterService::getCategoryName($product),
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
