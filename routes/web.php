<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CartController;

Route::get('/', [HeroController::class, 'home'])->name('home');

// Product routes
Route::get('/shop', [ProductController::class, 'index'])->name('shop');
Route::get('/trending', [ProductController::class, 'index'])->name('trending');
Route::get('/tshirts', [ProductController::class, 'tshirts'])->name('tshirts');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('product.show');

// Cart routes
Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('cart.index');
    Route::post('/add', [CartController::class, 'add'])->name('cart.add');
    Route::put('/update/{key}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/remove/{key}', [CartController::class, 'remove'])->name('cart.remove');
    Route::delete('/clear', [CartController::class, 'clear'])->name('cart.clear');
    Route::get('/count', [CartController::class, 'count'])->name('cart.count');
});

// Dynamic page routes - must be after product routes to avoid conflicts
// Exclude routes that should not be handled by PageController
Route::get('/{slug}', [PageController::class, 'show'])
    ->where('slug', '^(?!shop|trending|product|tshirts|new-arrivals|men|women|collections|sale).*')
    ->name('page.show');
