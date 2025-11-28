<?php

namespace App\Filament\Resources\TrendingItemResource\Pages;

use App\Filament\Resources\TrendingItemResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTrendingItems extends ListRecords
{
    protected static string $resource = TrendingItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
