<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class VariantsRelationManager extends RelationManager
{
    protected static string $relationship = 'variants';

    protected static ?string $title = 'Product Variants (Sizes & Colors)';

    protected static ?string $modelLabel = 'Variant';

    protected static ?string $pluralModelLabel = 'Variants';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('type')
                    ->label('Variant Type')
                    ->options([
                        'size' => 'Size',
                        'color' => 'Color',
                    ])
                    ->required()
                    ->native(false)
                    ->live()
                    ->helperText('Choose whether this is a size or color variant'),
                Forms\Components\TextInput::make('name')
                    ->label(fn (Forms\Get $get) => $get('type') === 'color' ? 'Color Name' : 'Size Name')
                    ->required()
                    ->maxLength(255)
                    ->helperText(fn (Forms\Get $get) => 
                        $get('type') === 'color' 
                            ? 'e.g., Red, Blue, Black' 
                            : 'e.g., S, M, L, XL, XXL'
                    ),
                Forms\Components\ColorPicker::make('value')
                    ->label('Color')
                    ->visible(fn (Forms\Get $get) => $get('type') === 'color')
                    ->helperText('Pick a color for this variant. This will be used as the hex color code.'),
                Forms\Components\TextInput::make('value')
                    ->label('Size Value')
                    ->maxLength(255)
                    ->helperText('Optional size value or code')
                    ->visible(fn (Forms\Get $get) => $get('type') === 'size'),
                Forms\Components\TextInput::make('order')
                    ->label('Display Order')
                    ->numeric()
                    ->default(0)
                    ->required()
                    ->helperText('Lower numbers appear first'),
                Forms\Components\Toggle::make('is_active')
                    ->label('Active')
                    ->default(true)
                    ->helperText('Only active variants are shown to customers'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'size' => 'info',
                        'color' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state)),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('value')
                    ->label('Value/Hex')
                    ->searchable()
                    ->placeholder('—')
                    ->default('—')
                    ->formatStateUsing(function ($state, $record) {
                        if ($record->type === 'color' && $state) {
                            return '<span style="display: inline-block; width: 20px; height: 20px; background-color: ' . $state . '; border: 1px solid #ccc; border-radius: 3px; margin-right: 8px;"></span>' . $state;
                        }
                        return $state ?: '—';
                    })
                    ->html(),
                Tables\Columns\TextColumn::make('order')
                    ->label('Order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'size' => 'Size',
                        'color' => 'Color',
                    ]),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active')
                    ->placeholder('All')
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only'),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('mark_active')
                        ->label('Mark as Active')
                        ->action(fn ($records) => $records->each->update(['is_active' => true]))
                        ->requiresConfirmation(),
                    Tables\Actions\BulkAction::make('mark_inactive')
                        ->label('Mark as Inactive')
                        ->action(fn ($records) => $records->each->update(['is_active' => false]))
                        ->requiresConfirmation(),
                ]),
            ])
            ->defaultSort('order');
    }
}
