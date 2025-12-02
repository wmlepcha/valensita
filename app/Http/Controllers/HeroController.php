<?php

namespace App\Http\Controllers;

use App\Models\HeroItem;
use App\Models\Product;
use App\Models\NewArrival;
use App\Models\CategorySection;
use App\Models\TrendingItem;
use App\Models\AboutSection;
use Inertia\Inertia;

class HeroController extends Controller
{
    /**
     * Display homepage with featured products
     */
    public function home()
    {
        // Get hero items for hero banner
        $heroProducts = HeroItem::active()
            ->ordered()
            ->with('product')
            ->take(3)
            ->get()
            ->map(function ($heroItem) {
                return [
                    'id' => $heroItem->id,
                    'title' => $heroItem->title,
                    'price' => '₹' . number_format($heroItem->price, 0),
                    'image' => $heroItem->image_url ?? '/storage/images/placeholder.jpg',
                    'lining' => $heroItem->lining ?? '100% Cotton',
                    'material' => $heroItem->material ?? 'Size Medium',
                    'height' => $heroItem->height ?? '5.11/180 cm',
                    'slug' => $heroItem->slug,
                ];
            });

        // Get new arrival products from NewArrival model
        $newArrivals = NewArrival::active()
            ->ordered()
            ->with(['product.images', 'product.categoryRelation'])
            ->take(4)
            ->get()
            ->map(function ($newArrival) {
                $product = $newArrival->product;
                
                // Use new_arrival images if available, otherwise fall back to product images
                $mainImage = $newArrival->getRawOriginal('image_url');
                if (!$mainImage) {
                    // If product exists, use its images, otherwise use placeholder
                    $images = $product?->images ?? collect();
                    $mainImage = $images->first()?->image_url ?? '/storage/images/placeholder.jpg';
                } else {
                    // Format the image URL using the accessor
                    $mainImage = $newArrival->image_url;
                }
                
                $hoverImage = $newArrival->getRawOriginal('hover_image_url');
                if (!$hoverImage) {
                    // If product exists, use its images, otherwise null
                    $images = $product?->images ?? collect();
                    $hoverImage = $images->count() > 1 ? $images->get(1)->image_url : null;
                } else {
                    // Format the hover image URL using the accessor
                    $hoverImage = $newArrival->hover_image_url;
                }
                
                return [
                    'id' => $product?->id ?? $newArrival->id,
                    'name' => $product?->name ?? 'New Arrival',
                    'price' => (float) ($product?->price ?? 0),
                    'image' => $mainImage,
                    'hoverImage' => $hoverImage,
                    'badge' => $newArrival->look_number,
                    'category' => $newArrival->drop_number ?? $product?->categoryRelation?->name ?? $product?->category ?? 'New Arrivals',
                    'slug' => $product?->slug ?? 'new-arrival-' . $newArrival->id,
                ];
            });

        // Get trending items (organized by row)
        $trendingItems = TrendingItem::active()
            ->ordered()
            ->get()
            ->groupBy('row')
            ->map(function ($items, $row) {
                return $items->take(4)->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'name' => $item->title,
                        'price' => 0, // Price not used in trending display, but required by frontend interface
                        'image' => $item->image_url ?? '/storage/images/placeholder.jpg',
                        'hoverImage' => $item->hover_image_url,
                        'category' => $item->category_label,
                        'backgroundGradient' => $item->background_gradient ?? 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                        'slug' => $item->slug,
                    ];
                })->values();
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
