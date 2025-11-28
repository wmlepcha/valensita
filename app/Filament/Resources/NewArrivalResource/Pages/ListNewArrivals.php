<?php

namespace App\Filament\Resources\NewArrivalResource\Pages;

use App\Filament\Resources\NewArrivalResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListNewArrivals extends ListRecords
{
    protected static string $resource = NewArrivalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
