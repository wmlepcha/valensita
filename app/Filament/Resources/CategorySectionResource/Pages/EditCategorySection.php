<?php

namespace App\Filament\Resources\CategorySectionResource\Pages;

use App\Filament\Resources\CategorySectionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCategorySection extends EditRecord
{
    protected static string $resource = CategorySectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
