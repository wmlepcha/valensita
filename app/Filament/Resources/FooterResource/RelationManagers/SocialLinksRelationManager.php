<?php

namespace App\Filament\Resources\FooterResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SocialLinksRelationManager extends RelationManager
{
    protected static string $relationship = 'socialLinks';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('platform')
                    ->label('Platform')
                    ->required()
                    ->options([
                        'instagram' => 'Instagram',
                        'youtube' => 'YouTube',
                        'facebook' => 'Facebook',
                        'twitter' => 'Twitter',
                        'tiktok' => 'TikTok',
                        'linkedin' => 'LinkedIn',
                        'pinterest' => 'Pinterest',
                    ])
                    ->helperText('Select the social media platform'),
                Forms\Components\TextInput::make('url')
                    ->required()
                    ->url()
                    ->label('URL')
                    ->placeholder('https://instagram.com/yourhandle')
                    ->helperText('Enter the full URL to your social media profile'),
                Forms\Components\TextInput::make('icon_name')
                    ->label('Icon Name (Optional)')
                    ->maxLength(255)
                    ->helperText('Leave empty to use default icon for platform'),
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
            ->recordTitleAttribute('platform')
            ->columns([
                Tables\Columns\TextColumn::make('platform')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('url')
                    ->label('URL')
                    ->limit(40)
                    ->copyable()
                    ->searchable(),
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
