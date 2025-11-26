<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Enums\UserRole;
use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListUsers extends ListRecords
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        return [
            'all' => ListRecords\Tab::make('All Users')
                ->badge(fn () => \App\Models\User::count()),
            'admins' => ListRecords\Tab::make('Admins')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('role', UserRole::ADMIN->value))
                ->badge(fn () => \App\Models\User::where('role', UserRole::ADMIN->value)->count()),
            'managers' => ListRecords\Tab::make('Managers')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('role', UserRole::MANAGER->value))
                ->badge(fn () => \App\Models\User::where('role', UserRole::MANAGER->value)->count()),
            'customers' => ListRecords\Tab::make('Customers')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('role', UserRole::CUSTOMER->value))
                ->badge(fn () => \App\Models\User::where('role', UserRole::CUSTOMER->value)->count()),
        ];
    }
}
