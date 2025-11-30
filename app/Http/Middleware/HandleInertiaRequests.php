<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'menus' => function () {
                return \App\Models\Menu::active()
                    ->ordered()
                    ->with(['activeItems' => function ($query) {
                        $query->topLevel()->ordered()->with(['activeChildren' => function ($subQuery) {
                            $subQuery->ordered();
                        }]);
                    }])
                    ->get()
                    ->map(function ($menu) {
                        return [
                            'id' => $menu->id,
                            'name' => $menu->name,
                            'slug' => $menu->slug,
                            'url' => $menu->url,
                            'title' => $menu->title,
                            'items' => $menu->activeItems->map(function ($item) {
                                return [
                                    'id' => $item->id,
                                    'label' => $item->label,
                                    'url' => $item->url,
                                    'image_url' => $item->image_url,
                                    'image_alt' => $item->image_alt,
                                    'children' => $item->activeChildren->map(function ($child) {
                                        return [
                                            'id' => $child->id,
                                            'label' => $child->label,
                                            'url' => $child->url,
                                            'image_url' => $child->image_url,
                                            'image_alt' => $child->image_alt,
                                        ];
                                    })->toArray(),
                                ];
                            })->toArray(),
                        ];
                    })
                    ->toArray();
            },
            'footer' => function () {
                $footer = \App\Models\Footer::active()
                    ->with([
                        'activeSocialLinks' => function ($query) {
                            $query->ordered();
                        },
                        'activeServiceItems' => function ($query) {
                            $query->ordered();
                        }
                    ])
                    ->first();

                if (!$footer) {
                    return null;
                }

                return [
                    'brandName' => $footer->brand_name,
                    'description' => $footer->description,
                    'logoUrl' => $footer->logo_url,
                    'socialLinks' => $footer->activeSocialLinks->map(function ($link) {
                        return [
                            'platform' => $link->platform,
                            'url' => $link->url,
                            'iconName' => $link->icon_name,
                        ];
                    })->toArray(),
                    'serviceItems' => $footer->activeServiceItems->map(function ($item) {
                        return [
                            'text' => $item->text,
                        ];
                    })->toArray(),
                ];
            },
        ];
    }
}
