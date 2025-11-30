<?php

namespace App\Filament\Resources\AboutSectionResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ValuesRelationManager extends RelationManager
{
    protected static string $relationship = 'values';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('icon_name')
                    ->label('Icon')
                    ->required()
                    ->options([
                        'lightbulb' => 'Lightbulb (Creative Expression)',
                        'heart' => 'Heart (Inclusivity)',
                        'star' => 'Star (High Quality)',
                        'globe' => 'Globe (Sustainability)',
                    ])
                    ->helperText('Select the icon type for this value'),
                Forms\Components\TextInput::make('label')
                    ->required()
                    ->maxLength(255)
                    ->label('Label')
                    ->placeholder('e.g., CREATIVE EXPRESSION'),
                Forms\Components\TextInput::make('order')
                    ->numeric()
                    ->default(0)
                    ->label('Display Order')
                    ->helperText('Lower numbers appear first'),
                Forms\Components\Toggle::make('is_active')
                    ->default(true)
                    ->label('Active'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('label')
            ->columns([
                Tables\Columns\TextColumn::make('icon_name')
                    ->label('Icon')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'lightbulb' => '💡',
                        'heart' => '❤️',
                        'star' => '⭐',
                        'globe' => '🌍',
                        default => '📌',
                    }),
                Tables\Columns\TextColumn::make('label')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('order')
                    ->label('Order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active')
                    ->placeholder('All')
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only'),
            ])
            ->defaultSort('order')
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
            ]);
    }
}
