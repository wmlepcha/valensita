<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationLabel = 'Products';

    protected static ?string $navigationGroup = 'Inventory';

    protected static ?int $navigationSort = 1;

    protected static ?string $modelLabel = 'Product';

    protected static ?string $pluralModelLabel = 'Products';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->label('Product Name')
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                                if ($operation !== 'create') {
                                    return;
                                }
                                $set('slug', \Illuminate\Support\Str::slug($state));
                            }),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->label('URL Slug')
                            ->helperText('Auto-generated from name, or customize it'),
                        Forms\Components\Textarea::make('description')
                            ->rows(4)
                            ->columnSpanFull()
                            ->label('Description')
                            ->helperText('Product description displayed on the product page'),
                        Forms\Components\Select::make('category_id')
                            ->label('Category')
                            ->relationship('categoryRelation', 'name')
                            ->searchable()
                            ->preload()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (Forms\Set $set, $state) {
                                        $set('slug', \Illuminate\Support\Str::slug($state));
                                    }),
                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(\App\Models\Category::class, 'slug'),
                                Forms\Components\Toggle::make('is_active')
                                    ->default(true),
                            ])
                            ->required()
                            ->helperText('Select a category or create a new one'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Pricing')
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->prefix('$')
                            ->label('Price')
                            ->step(0.01)
                            ->helperText('Current selling price'),
                        Forms\Components\TextInput::make('original_price')
                            ->numeric()
                            ->prefix('$')
                            ->label('Original Price')
                            ->step(0.01)
                            ->helperText('Original price (for showing discounts)')
                            ->visible(fn (Forms\Get $get) => $get('price') > 0),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Inventory & Stock')
                    ->schema([
                        Forms\Components\TextInput::make('sku')
                            ->label('SKU')
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('Stock Keeping Unit - unique product identifier'),
                        Forms\Components\TextInput::make('quantity')
                            ->label('Quantity in Stock')
                            ->numeric()
                            ->default(0)
                            ->minValue(0)
                            ->required(fn ($record) => !$record || !$record->variants()->where('type', 'size')->exists())
                            ->disabled(function ($record) {
                                if (!$record) return false;
                                return $record->variants()->where('type', 'size')->exists();
                            })
                            ->dehydrated(function ($record) {
                                // Don't save quantity if product has size variants (it's calculated)
                                if (!$record) return true;
                                return !$record->variants()->where('type', 'size')->exists();
                            })
                            ->helperText(function ($record) {
                                if (!$record) {
                                    return 'Number of items available';
                                }
                                
                                $hasSizeVariants = $record->variants()->where('type', 'size')->exists();
                                
                                if ($hasSizeVariants) {
                                    $totalStock = $record->variants()
                                        ->where('type', 'size')
                                        ->where('is_active', true)
                                        ->sum('quantity') ?? 0;
                                    return "Total stock: {$totalStock} (automatically calculated from size variants)";
                                }
                                
                                return 'Number of items available';
                            })
                            ->afterStateHydrated(function (Forms\Components\TextInput $component, $record) {
                                if (!$record) return;
                                
                                $hasSizeVariants = $record->variants()->where('type', 'size')->exists();
                                
                                if ($hasSizeVariants) {
                                    // Calculate total from size variants
                                    $totalStock = $record->variants()
                                        ->where('type', 'size')
                                        ->where('is_active', true)
                                        ->sum('quantity') ?? 0;
                                    $component->state($totalStock);
                                }
                            }),
                        Forms\Components\Toggle::make('in_stock')
                            ->label('In Stock')
                            ->default(true)
                            ->helperText('Toggle to mark product as in/out of stock'),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true)
                            ->helperText('Only active products are visible on the website'),
                        Forms\Components\TextInput::make('order')
                            ->numeric()
                            ->default(0)
                            ->label('Display Order')
                            ->helperText('Lower numbers appear first in listings')
                            ->required(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('images.image_url')
                    ->label('Image')
                    ->circular()
                    ->size(60)
                    ->defaultImageUrl(url('/storage/images/placeholder.jpg'))
                    ->getStateUsing(function ($record) {
                        $firstImage = $record->images()->first();
                        if (!$firstImage || !$firstImage->image_url) {
                            return null;
                        }
                        
                        $imageUrl = $firstImage->getRawOriginal('image_url');
                        
                        // If it's already a full URL, return as is
                        if (str_starts_with($imageUrl, 'http://') || str_starts_with($imageUrl, 'https://')) {
                            return $imageUrl;
                        }
                        
                        // If it starts with /storage/, it's an old path - return as URL
                        if (str_starts_with($imageUrl, '/storage/')) {
                            return url($imageUrl);
                        }
                        
                        // Otherwise, it's a new uploaded file - use disk URL
                        return \Illuminate\Support\Facades\Storage::disk('public')->url($imageUrl);
                    }),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(30),
                Tables\Columns\TextColumn::make('categoryRelation.name')
                    ->label('Category')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('gray')
                    ->placeholder('No category'),
                Tables\Columns\TextColumn::make('price')
                    ->money('USD')
                    ->sortable()
                    ->label('Price'),
                Tables\Columns\TextColumn::make('original_price')
                    ->money('USD')
                    ->sortable()
                    ->label('Original')
                    ->placeholder('—')
                    ->default('—'),
                Tables\Columns\TextColumn::make('sku')
                    ->label('SKU')
                    ->searchable()
                    ->placeholder('—')
                    ->default('—'),
                Tables\Columns\TextColumn::make('quantity')
                    ->numeric()
                    ->sortable()
                    ->label('Qty')
                    ->badge()
                    ->color(fn ($record) => $record->quantity > 10 ? 'success' : ($record->quantity > 0 ? 'warning' : 'danger')),
                Tables\Columns\IconColumn::make('in_stock')
                    ->boolean()
                    ->label('Stock'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
                Tables\Columns\TextColumn::make('order')
                    ->numeric()
                    ->sortable()
                    ->label('Order'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->label('Category')
                    ->relationship('categoryRelation', 'name')
                    ->searchable()
                    ->preload(),
                Tables\Filters\TernaryFilter::make('in_stock')
                    ->label('In Stock')
                    ->placeholder('All')
                    ->trueLabel('In Stock only')
                    ->falseLabel('Out of Stock only'),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active')
                    ->placeholder('All')
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only'),
                Tables\Filters\Filter::make('low_stock')
                    ->label('Low Stock')
                    ->query(fn (Builder $query) => $query->where('quantity', '<=', 10)->where('quantity', '>', 0)),
            ])
            ->defaultSort('order')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('mark_active')
                        ->label('Mark as Active')
                        ->icon('heroicon-o-check-circle')
                        ->action(fn ($records) => $records->each->update(['is_active' => true]))
                        ->requiresConfirmation(),
                    Tables\Actions\BulkAction::make('mark_inactive')
                        ->label('Mark as Inactive')
                        ->icon('heroicon-o-x-circle')
                        ->action(fn ($records) => $records->each->update(['is_active' => false]))
                        ->requiresConfirmation(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\ImagesRelationManager::class,
            RelationManagers\VariantsRelationManager::class,
            RelationManagers\SpecificationsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
