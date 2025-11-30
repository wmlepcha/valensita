<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PageController;

Route::get('/', [HeroController::class, 'home'])->name('home');

// Product routes
Route::get('/shop', [ProductController::class, 'index'])->name('shop');
Route::get('/trending', [ProductController::class, 'index'])->name('trending');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('product.show');

// Dynamic page routes - must be after product routes to avoid conflicts
// Exclude routes that should not be handled by PageController
Route::get('/{slug}', [PageController::class, 'show'])
    ->where('slug', '^(?!shop|trending|product|new-arrivals|men|women|collections|sale).*')
    ->name('page.show');
