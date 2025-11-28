<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\ProductController;

Route::get('/', [HeroController::class, 'home'])->name('home');

// Product routes
Route::get('/shop', [ProductController::class, 'index'])->name('shop');
Route::get('/trending', [ProductController::class, 'index'])->name('trending');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('product.show');
