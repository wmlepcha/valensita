<?php

namespace App\Filament\Resources\MenuResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'items';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Link Configuration')
                    ->schema([
                        Forms\Components\Select::make('category_id')
                            ->label('Link to Category')
                            ->relationship('category', 'name', fn ($query) => $query->where('is_active', true))
                            ->searchable()
                            ->preload()
                            ->nullable()
                            ->helperText('Select a category to auto-generate URL. URL will be: /shop?category={category-slug}')
                            ->reactive()
                            ->afterStateUpdated(function ($state, Forms\Set $set) {
                                if ($state) {
                                    // Auto-fill label from category name if label is empty
                                    $category = \App\Models\Category::find($state);
                                    if ($category) {
                                        $set('label', $category->name);
                                    }
                                    // Clear URL since it will be auto-generated
                                    $set('url', null);
                                }
                                // Clear subcategory if category changes
                                $set('subcategory_id', null);
                            }),
                        Forms\Components\Select::make('subcategory_id')
                            ->label('Link to Subcategory (Optional)')
                            ->relationship('subcategory', 'name', fn ($query, Forms\Get $get) => 
                                $query->where('category_id', $get('category_id'))
                                      ->where('is_active', true)
                            )
                            ->searchable()
                            ->preload()
                            ->nullable()
                            ->visible(fn (Forms\Get $get) => !empty($get('category_id')))
                            ->helperText('Select a subcategory (e.g., Solid, Animal Print, Graffiti). URL will be: /shop?category={category-slug}&subcategory={subcategory-slug}')
                            ->reactive()
                            ->afterStateUpdated(function ($state, Forms\Set $set) {
                                if ($state) {
                                    // Auto-fill label from subcategory name if label is empty
                                    $subcategory = \App\Models\Subcategory::find($state);
                                    if ($subcategory) {
                                        $set('label', $subcategory->name);
                                    }
                                    // Clear URL since it will be auto-generated
                                    $set('url', null);
                                }
                            }),
                        Forms\Components\TextInput::make('url')
                            ->label('Custom URL (Optional)')
                            ->maxLength(255)
                            ->nullable()
                            ->default(null)
                            ->helperText('Only used if no category/subcategory is selected. If category/subcategory is selected, URL is auto-generated.')
                            ->visible(fn (Forms\Get $get) => !$get('category_id') && !$get('subcategory_id'))
                            ->required(fn (Forms\Get $get) => !$get('category_id') && !$get('subcategory_id'))
                            ->dehydrated(fn (Forms\Get $get) => !$get('category_id') && !$get('subcategory_id')),
                    ]),
                
                Forms\Components\Section::make('Menu Item Details')
                    ->schema([
                        Forms\Components\Select::make('parent_id')
                            ->label('Parent Menu Item')
                            ->relationship('parent', 'label', modifyQueryUsing: fn ($query) => $query->where('menu_id', $this->ownerRecord->id)->whereNull('parent_id'))
                            ->searchable()
                            ->preload()
                            ->helperText('Leave empty for top-level items. Select a parent to create a submenu.')
                            ->nullable(),
                        Forms\Components\TextInput::make('label')
                            ->required()
                            ->maxLength(255)
                            ->label('Label')
                            ->helperText('Text displayed in the menu. Auto-filled from category if category is selected.'),
                    ]),
                
                Forms\Components\Section::make('Display Settings')
                    ->schema([
                        Forms\Components\FileUpload::make('image_url')
                            ->label('Image')
                            ->image()
                            ->directory('menu-images')
                            ->disk('public')
                            ->visibility('public')
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                null,
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->maxSize(2048) // 2MB
                            ->helperText('Image shown in mega menu (optional, usually for top-level items). If category has image, it can be used as fallback. Maximum file size: 2MB. Please compress images before uploading.')
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('image_alt')
                            ->maxLength(255)
                            ->label('Image Alt Text')
                            ->helperText('Alt text for the image'),
                        Forms\Components\TextInput::make('order')
                            ->numeric()
                            ->default(0)
                            ->label('Display Order')
                            ->required()
                            ->helperText('Lower numbers appear first'),
                        Forms\Components\Toggle::make('is_active')
                            ->default(true)
                            ->label('Active'),
                    ]),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('label')
            ->columns([
                Tables\Columns\TextColumn::make('label')
                    ->searchable()
                    ->sortable()
                    ->formatStateUsing(function ($record, $state) {
                        return $record->parent_id ? '  ↳ ' . $state : $state;
                    }),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Category')
                    ->searchable()
                    ->sortable()
                    ->placeholder('—')
                    ->default('—')
                    ->badge()
                    ->color('gray'),
                Tables\Columns\TextColumn::make('subcategory.name')
                    ->label('Subcategory')
                    ->searchable()
                    ->sortable()
                    ->placeholder('—')
                    ->default('—')
                    ->badge()
                    ->color('info'),
                Tables\Columns\TextColumn::make('parent.label')
                    ->label('Parent')
                    ->sortable()
                    ->searchable()
                    ->placeholder('—'),
                Tables\Columns\TextColumn::make('url')
                    ->label('URL')
                    ->searchable()
                    ->limit(40)
                    ->formatStateUsing(function ($record) {
                        // Show auto-generated URL if subcategory is linked
                        if ($record->subcategory_id && $record->subcategory && $record->subcategory->category) {
                            return '/shop?category=' . $record->subcategory->category->slug . '&subcategory=' . $record->subcategory->slug;
                        }
                        // Show auto-generated URL if category is linked
                        if ($record->category_id && $record->category) {
                            return '/shop?category=' . $record->category->slug;
                        }
                        return $record->getRawOriginal('url') ?? '—';
                    }),
                Tables\Columns\ImageColumn::make('image_url')
                    ->label('Image')
                    ->circular()
                    ->size(40)
                    ->getStateUsing(function ($record) {
                        if (!$record->image_url) {
                            return null;
                        }
                        
                        $imageUrl = $record->getRawOriginal('image_url');
                        
                        // If it's already a full URL, return as is
                        if (str_starts_with($imageUrl, 'http://') || str_starts_with($imageUrl, 'https://')) {
                            return $imageUrl;
                        }
                        
                        // If it starts with /storage/, it's an old path - return as URL
                        if (str_starts_with($imageUrl, '/storage/')) {
                            return url($imageUrl);
                        }
                        
                        // Otherwise, it's a new uploaded file (relative path like "menu-images/file.jpg")
                        // Use Storage URL which will convert it to /storage/menu-images/file.jpg
                        return \Illuminate\Support\Facades\Storage::disk('public')->url($imageUrl);
                    }),
                Tables\Columns\TextColumn::make('order')
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
