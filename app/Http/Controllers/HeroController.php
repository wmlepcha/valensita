<?php

namespace App\Http\Controllers;

use App\Models\HeroItem;
use App\Models\Product;
use App\Models\NewArrival;
use App\Models\CategorySection;
use App\Models\TrendingItem;
use App\Models\AboutSection;
use App\Helpers\ProductImageHelper;
use Inertia\Inertia;

class HeroController extends Controller
{
    /**
     * Display homepage with featured products
     */
    public function home()
    {
        // Get hero items for hero banner
        // Use product data when product_id exists, otherwise fallback to hero item data
        $heroProducts = HeroItem::active()
            ->ordered()
            ->with(['product.images', 'product.specifications'])
            ->take(3)
            ->get()
            ->map(function ($heroItem) {
                $product = $heroItem->product;
                
                if ($product && $product->slug) {
                    // Use product data as primary source, but allow hero item overrides
                    $specs = $product->specifications->pluck('value', 'key')->toArray();
                    
                    // Use hero item image if available, otherwise use product image
                    $image = $heroItem->image_url 
                        ? ProductImageHelper::formatImageUrl($heroItem->image_url) 
                        : ProductImageHelper::getFirstImageUrl($product);
                    
                    return [
                        'id' => $product->id,
                        'title' => $heroItem->title ?? $product->name, // Hero item title overrides product name
                        'price' => '₹' . number_format($heroItem->price ?? $product->price, 0), // Hero item price overrides product price
                        'image' => $image, // Hero item image overrides product image
                        'lining' => $heroItem->lining ?? $specs['LINING'] ?? '100% Cotton',
                        'material' => $heroItem->material ?? $specs['MATERIAL'] ?? 'Size Medium',
                        'height' => $heroItem->height ?? $specs['HEIGHT'] ?? '5.11/180 cm',
                        'premium_text' => $heroItem->premium_text,
                        'care_instructions' => $heroItem->care_instructions ?? $specs['CARE'] ?? null,
                        'shipping_info' => $heroItem->shipping_info ?? $specs['SHIPPING'] ?? null,
                        'slug' => $product->slug, // Only use actual database slug
                    ];
                } else {
                    // Fallback to hero item data (for backward compatibility)
                    return [
                        'id' => $heroItem->id,
                        'title' => $heroItem->title ?? 'Hero Item',
                        'price' => '₹' . number_format($heroItem->price ?? 0, 0),
                        'image' => ProductImageHelper::formatImageUrl($heroItem->image_url),
                        'lining' => $heroItem->lining ?? '100% Cotton',
                        'material' => $heroItem->material ?? 'Size Medium',
                        'height' => $heroItem->height ?? '5.11/180 cm',
                        'premium_text' => $heroItem->premium_text,
                        'care_instructions' => $heroItem->care_instructions,
                        'shipping_info' => $heroItem->shipping_info,
                        'slug' => null, // No slug if no product linked
                    ];
                }
            });

        // Get new arrival products from NewArrival model
        // product_id is now required, so we always use product data
        $newArrivals = NewArrival::active()
            ->whereNotNull('product_id') // Only get items with products linked
            ->ordered()
            ->with(['product.images', 'product.categoryRelation'])
            ->take(4)
            ->get()
            ->map(function ($newArrival) {
                $product = $newArrival->product;
                
                if (!$product) {
                    return null; // Skip if product doesn't exist
                }
                
                $allImages = ProductImageHelper::getAllImageUrls($product);
                
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'image' => $allImages[0] ?? ProductImageHelper::getFirstImageUrl($product),
                    'hoverImage' => $allImages[1] ?? null,
                    'badge' => $newArrival->look_number,
                    'category' => $newArrival->drop_number ?? $product->categoryRelation?->name ?? $product->category ?? 'New Arrivals',
                    'slug' => $product->slug,
                ];
            })
            ->filter() // Remove null values
            ->values();

        // Get trending items from TrendingItem table (manually curated in Filament)
        // product_id is now required, so we always use product data
        $trendingItems = TrendingItem::active()
            ->whereNotNull('product_id') // Only get items with products linked
            ->with(['product.images', 'product.categoryRelation'])
            ->ordered()
            ->get()
            ->groupBy('row')
            ->map(function ($items, $row) {
                return $items->take(4)->map(function ($item) {
                    $product = $item->product;
                    
                    if (!$product) {
                        return null; // Skip if product doesn't exist
                    }
                    
                    $allImages = ProductImageHelper::getAllImageUrls($product);
                    
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => (float) $product->price,
                        'image' => $allImages[0] ?? ProductImageHelper::getFirstImageUrl($product),
                        'hoverImage' => $allImages[1] ?? null,
                        'category' => $product->categoryRelation?->name ?? $product->category ?? 'Product',
                        'backgroundGradient' => $item->background_gradient ?? 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                        'slug' => $product->slug,
                    ];
                })
                ->filter() // Remove null values
                ->values();
            });
        
        $trendingShirts = $trendingItems->get(1, collect())->toArray();
        $trendingHoodies = $trendingItems->get(2, collect())->toArray();

        // Get category sections for featured categories (limit to 2 as per design)
        $categorySections = CategorySection::active()
            ->ordered()
            ->take(2)
            ->get()
            ->map(function ($section) {
                return [
                    'id' => $section->id,
                    'name' => $section->title,
                    'image' => $section->image_url,
                    'link' => $section->link,
                    'buttonText' => $section->button_text ?? 'Explore',
                ];
            });

        // Get about section data
        $aboutSection = AboutSection::active()
            ->with(['activeValues' => function ($query) {
                $query->ordered();
            }])
            ->first();

        $aboutData = null;
        if ($aboutSection) {
            // Get the formatted background image URL (accessor will handle the path)
            $backgroundImage = $aboutSection->background_image_url;
            
            $aboutData = [
                'title' => $aboutSection->title,
                'description' => $aboutSection->description,
                'backgroundImage' => $backgroundImage,
                'values' => $aboutSection->activeValues->map(function ($value) {
                    return [
                        'iconName' => $value->icon_name,
                        'label' => $value->label,
                    ];
                })->toArray(),
            ];
        }

        return Inertia::render('Main', [
            'heroProducts' => $heroProducts,
            'newArrivals' => $newArrivals,
            'trendingShirts' => $trendingShirts,
            'trendingHoodies' => $trendingHoodies,
            'categorySections' => $categorySections,
            'aboutSection' => $aboutData,
        ]);
    }
}
