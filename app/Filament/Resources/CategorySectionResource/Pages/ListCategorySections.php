<?php

namespace App\Filament\Resources\CategorySectionResource\Pages;

use App\Filament\Resources\CategorySectionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCategorySections extends ListRecords
{
    protected static string $resource = CategorySectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
