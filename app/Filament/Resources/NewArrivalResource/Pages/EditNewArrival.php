<?php

namespace App\Filament\Resources\NewArrivalResource\Pages;

use App\Filament\Resources\NewArrivalResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditNewArrival extends EditRecord
{
    protected static string $resource = NewArrivalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
