<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        // Update quantity from size variants after saving product
        $this->updateProductQuantity();
    }

    /**
     * Update the product's total quantity from size variants.
     */
    protected function updateProductQuantity(): void
    {
        $product = $this->record;
        
        if (!$product) {
            return;
        }

        // Calculate total quantity from all active size variants
        $totalQuantity = $product->variants()
            ->where('type', 'size')
            ->where('is_active', true)
            ->sum('quantity') ?? 0;

        // Update the product's quantity field
        $product->updateQuietly(['quantity' => $totalQuantity]);
    }
}
