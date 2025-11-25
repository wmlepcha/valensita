<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('Main');
});

// Product routes
Route::get('/shop', [ProductController::class, 'index'])->name('shop');
Route::get('/trending', [ProductController::class, 'index'])->name('trending');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('product.show');
