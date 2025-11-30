<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HeroResource\Pages;
use App\Models\HeroItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class HeroResource extends Resource
{
    protected static ?string $model = HeroItem::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationLabel = 'Hero Section';
    
    protected static ?string $navigationGroup = 'Website Management';

    protected static ?string $modelLabel = 'Hero Item';

    protected static ?string $pluralModelLabel = 'Hero Items';

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
                            ->helperText('Auto-generated from title, or customize it'),
                        Forms\Components\TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->prefix('₹')
                            ->label('Price'),
                    ])
                    ->columns(2),
                
                Forms\Components\Section::make('Image')
                    ->schema([
                        Forms\Components\FileUpload::make('image_url')
                            ->label('Hero Image')
                            ->image()
                            ->directory('hero-images')
                            ->disk('public')
                            ->visibility('public')
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                null,
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->maxSize(10240) // 10MB
                            ->helperText('Main image for hero banner')
                            ->columnSpanFull(),
                    ]),
                
                Forms\Components\Section::make('Product Details')
                    ->schema([
                        Forms\Components\TextInput::make('lining')
                            ->maxLength(255)
                            ->label('Lining')
                            ->placeholder('e.g., 100% Cotton')
                            ->helperText('Displayed as "Lining" in hero banner'),
                        Forms\Components\TextInput::make('material')
                            ->maxLength(255)
                            ->label('Material')
                            ->placeholder('e.g., Size Medium')
                            ->helperText('Displayed as "Material" in hero banner'),
                        Forms\Components\TextInput::make('height')
                            ->maxLength(255)
                            ->label('Height')
                            ->placeholder('e.g., 5.11/180 cm')
                            ->helperText('Displayed as "Height" in hero banner'),
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
                            ->helperText('Optionally link to an actual product for inventory management'),
                    ]),
                
                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\Toggle::make('is_active')
                            ->default(true)
                            ->label('Active'),
                        Forms\Components\TextInput::make('order')
                            ->numeric()
                            ->default(0)
                            ->label('Display Order')
                            ->helperText('Lower numbers appear first'),
                    ])
                    ->columns(2),
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
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->money('INR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('product.name')
                    ->label('Linked Product')
                    ->searchable()
                    ->placeholder('No product linked')
                    ->default('—'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('order')
                    ->numeric()
                    ->sortable(),
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
            ])
            ->defaultSort('order')
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
            // Hero items are self-contained, no relation managers needed
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHeroItems::route('/'),
            'create' => Pages\CreateHeroItem::route('/create'),
            'edit' => Pages\EditHeroItem::route('/{record}/edit'),
        ];
    }
}
