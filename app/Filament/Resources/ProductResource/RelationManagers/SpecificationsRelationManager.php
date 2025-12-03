<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class SpecificationsRelationManager extends RelationManager
{
    protected static string $relationship = 'specifications';

    protected static ?string $title = 'Product Specifications';

    protected static ?string $modelLabel = 'Specification';

    protected static ?string $pluralModelLabel = 'Specifications';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('key')
                    ->label('Specification Key')
                    ->options([
                        'MATERIAL' => 'Material',
                        'LINING' => 'Lining',
                        'HEIGHT' => 'Height',
                        'CARE' => 'Care Instructions',
                        'SHIPPING' => 'Shipping Information',
                        'RETURNS' => 'Returns Policy',
                        'ORIGIN' => 'Country of Origin',
                        'FIT' => 'Fit',
                        'STYLE' => 'Style',
                        'SEASON' => 'Season',
                    ])
                    ->searchable()
                    ->preload()
                    ->createOptionForm([
                        Forms\Components\TextInput::make('key')
                            ->label('Custom Key')
                            ->required()
                            ->maxLength(255)
                            ->helperText('Enter a custom specification key (e.g., FABRIC, BRAND)'),
                    ])
                    ->required()
                    ->helperText('Select a common specification or create a custom one'),
                Forms\Components\TextInput::make('value')
                    ->label('Specification Value')
                    ->required()
                    ->maxLength(255)
                    ->helperText('Enter the value for this specification (e.g., "100% Cotton", "Machine Wash")'),
                Forms\Components\TextInput::make('order')
                    ->label('Display Order')
                    ->numeric()
                    ->default(0)
                    ->required()
                    ->helperText('Lower numbers appear first'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('key')
            ->columns([
                Tables\Columns\TextColumn::make('key')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->formatStateUsing(fn (string $state): string => strtoupper($state)),
                Tables\Columns\TextColumn::make('value')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('order')
                    ->label('Order')
                    ->numeric()
                    ->sortable(),
            ])
            ->filters([
                //
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
                ]),
            ])
            ->defaultSort('order');
    }
}
