<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TrendingItemResource\Pages;
use App\Filament\Resources\TrendingItemResource\RelationManagers;
use App\Models\TrendingItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TrendingItemResource extends Resource
{
    protected static ?string $model = TrendingItem::class;

    protected static ?string $navigationIcon = 'heroicon-o-star';
    
    protected static ?string $navigationLabel = 'Trending Now';
    
    protected static ?string $modelLabel = 'Trending Item';
    
    protected static ?string $pluralModelLabel = 'Trending Items';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->label('Title')
                            ->helperText('Product name or title'),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->label('Slug/Link')
                            ->placeholder('/product/product-slug')
                            ->helperText('URL slug or link for this item'),
                        Forms\Components\TextInput::make('category_label')
                            ->required()
                            ->maxLength(255)
                            ->label('Category Label')
                            ->placeholder('e.g., T-SHIRTS, HOODIES')
                            ->helperText('Category text displayed below the image'),
                    ])
                    ->columns(2),
                
                Forms\Components\Section::make('Images')
                    ->schema([
                        Forms\Components\FileUpload::make('image_url')
                            ->label('Main Image')
                            ->required()
                            ->image()
                            ->directory('trending-items-images')
                            ->disk('public')
                            ->visibility('public')
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                null,
                                '1:1',
                                '4:3',
                                '16:9',
                            ])
                            ->maxSize(10240) // 10MB
                            ->helperText('Main product image')
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('hover_image_url')
                            ->label('Hover Image (Optional)')
                            ->image()
                            ->directory('trending-items-images')
                            ->disk('public')
                            ->visibility('public')
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                null,
                                '1:1',
                                '4:3',
                                '16:9',
                            ])
                            ->maxSize(10240) // 10MB
                            ->helperText('Image shown on hover (optional)')
                            ->columnSpanFull(),
                    ]),
                
                Forms\Components\Section::make('Display Settings')
                    ->schema([
                        Forms\Components\Select::make('row')
                            ->label('Row')
                            ->required()
                            ->options([
                                1 => 'Row 1 (Top - T-Shirts)',
                                2 => 'Row 2 (Bottom - Hoodies)',
                            ])
                            ->default(1)
                            ->helperText('Which row this item appears in'),
                        Forms\Components\TextInput::make('order')
                            ->numeric()
                            ->default(0)
                            ->label('Order in Row')
                            ->helperText('Lower numbers appear first (max 4 items per row)'),
                        Forms\Components\TextInput::make('background_gradient')
                            ->maxLength(255)
                            ->label('Background Gradient (Optional)')
                            ->placeholder('linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)')
                            ->helperText('CSS gradient for background (optional)'),
                    ])
                    ->columns(3),
                
                Forms\Components\Section::make('Product Link (Optional)')
                    ->schema([
                        Forms\Components\Select::make('product_id')
                            ->label('Link to Product')
                            ->relationship('product', 'name')
                            ->searchable()
                            ->preload()
                            ->nullable()
                            ->helperText('Optionally link to an actual product'),
                    ]),
                
                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\Toggle::make('is_active')
                            ->default(true)
                            ->label('Active'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_url')
                    ->label('Image')
                    ->circular()
                    ->size(60)
                    ->defaultImageUrl(url('/storage/images/placeholder.jpg'))
                    ->getStateUsing(function ($record) {
                        if (!$record->image_url) {
                            return null;
                        }
                        
                        $imageUrl = $record->getRawOriginal('image_url');
                        
                        if (str_starts_with($imageUrl, 'http://') || str_starts_with($imageUrl, 'https://')) {
                            return $imageUrl;
                        }
                        
                        if (str_starts_with($imageUrl, '/storage/')) {
                            return url($imageUrl);
                        }
                        
                        return \Illuminate\Support\Facades\Storage::disk('public')->url($imageUrl);
                    }),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category_label')
                    ->label('Category')
                    ->searchable(),
                Tables\Columns\TextColumn::make('row')
                    ->label('Row')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        '1' => 'success',
                        '2' => 'info',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('order')
                    ->label('Order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active')
                    ->placeholder('All')
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only'),
                Tables\Filters\SelectFilter::make('row')
                    ->label('Row')
                    ->options([
                        1 => 'Row 1 (Top)',
                        2 => 'Row 2 (Bottom)',
                    ]),
            ])
            ->modifyQueryUsing(function ($query) {
                return $query->orderBy('row')->orderBy('order');
            })
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTrendingItems::route('/'),
            'create' => Pages\CreateTrendingItem::route('/create'),
            'edit' => Pages\EditTrendingItem::route('/{record}/edit'),
        ];
    }
}
