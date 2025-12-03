<?php

namespace App\Filament\Resources\Concerns;

use Filament\Forms;
use Filament\Tables;

trait HasProductRelationship
{
    /**
     * Get the product select field component.
     * This is shared across all product curation resources.
     */
    protected static function productSelectField(): Forms\Components\Select
    {
        return Forms\Components\Select::make('product_id')
            ->label('Product')
            ->relationship('product', 'name', fn ($query) => $query->where('is_active', true))
            ->searchable()
            ->preload()
            ->required()
            ->helperText('Select a product from the products table. Product name, images, slug, price, and category will be used automatically.');
    }

    /**
     * Get the product information placeholder component.
     * Shows product details when a product is selected.
     */
    protected static function productInfoPlaceholder(): Forms\Components\Placeholder
    {
        return Forms\Components\Placeholder::make('product_info')
            ->label('Product Information')
            ->content(function ($record) {
                if ($record && $record->product) {
                    $product = $record->product;
                    $category = $product->categoryRelation?->name ?? $product->category ?? 'N/A';
                    return "Product: {$product->name} | Price: ₹{$product->price} | Category: {$category} | Slug: {$product->slug}";
                }
                return 'Select a product to see its information';
            })
            ->visible(fn ($record) => $record && $record->product_id);
    }

    /**
     * Get the product column for tables.
     * Shows product name with link to product.
     */
    protected static function productTableColumn(): Tables\Columns\TextColumn
    {
        return Tables\Columns\TextColumn::make('product.name')
            ->label('Product')
            ->searchable()
            ->sortable()
            ->placeholder('—')
            ->default('—')
            ->url(fn ($record) => $record->product 
                ? route('filament.sukaran.resources.products.edit', ['record' => $record->product_id])
                : null
            )
            ->openUrlInNewTab();
    }
}

