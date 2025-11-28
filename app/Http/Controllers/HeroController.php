<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroController extends Controller
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
}
