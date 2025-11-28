<?php

namespace App\Filament\Resources\TrendingItemResource\Pages;

use App\Filament\Resources\TrendingItemResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTrendingItem extends EditRecord
{
    protected static string $resource = TrendingItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
