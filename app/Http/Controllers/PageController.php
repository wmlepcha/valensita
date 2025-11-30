<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Display a page by slug.
     */
    public function show(string $slug): Response
    {
        $page = Page::where('slug', $slug)
            ->active()
            ->firstOrFail();

        return Inertia::render('Page', [
            'page' => [
                'title' => $page->title,
                'content' => $page->content,
                'metaTitle' => $page->meta_title ?? $page->title,
                'metaDescription' => $page->meta_description,
            ],
        ]);
    }
}
