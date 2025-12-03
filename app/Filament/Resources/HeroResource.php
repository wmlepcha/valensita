<?php

namespace App\Filament\Resources;

use App\Filament\Resources\Concerns\HasProductRelationship;
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
    use HasProductRelationship;
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
                Forms\Components\Section::make('Product Selection')
                    ->schema([
                        static::productSelectField(),
                        static::productInfoPlaceholder(),
                    ]),
                
                Forms\Components\Section::make('Hero Content')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Product Name / Title')
                            ->maxLength(255)
                            ->placeholder('e.g., Borg Bomber Jacket In Black')
                            ->helperText('Product name displayed in hero. If product is linked, product name will be used automatically.'),
                        Forms\Components\TextInput::make('price')
                            ->label('Price')
                            ->numeric()
                            ->prefix('₹')
                            ->step(0.01)
                            ->placeholder('e.g., 29999')
                            ->helperText('Product price. If product is linked, product price will be used automatically.'),
                        Forms\Components\TextInput::make('premium_text')
                            ->label('Premium Text')
                            ->maxLength(255)
                            ->placeholder('e.g., Premium Quality • Limited Edition')
                            ->helperText('Text displayed below price (e.g., "Premium Quality • Limited Edition")'),
                    ])
                    ->columns(3),
                
                Forms\Components\Section::make('Hero Image')
                    ->schema([
                        Forms\Components\FileUpload::make('image_url')
                            ->label('Hero Image')
                            ->image()
                            ->directory('hero-images')
                            ->maxSize(2048)
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                null,
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->helperText('Upload hero image (max 2MB). If product is linked, product images will be used as fallback.')
                            ->columnSpanFull(),
                    ]),
                
                Forms\Components\Section::make('Hero Display Details')
                    ->schema([
                        Forms\Components\TextInput::make('lining')
                            ->maxLength(255)
                            ->label('Lining')
                            ->placeholder('e.g., 100% Cotton')
                            ->helperText('Displayed as "Lining" in hero banner. If product has specifications, they will be used as fallback.'),
                        Forms\Components\TextInput::make('material')
                            ->maxLength(255)
                            ->label('Material')
                            ->placeholder('e.g., Size Medium')
                            ->helperText('Displayed as "Material" in hero banner. If product has specifications, they will be used as fallback.'),
                        Forms\Components\TextInput::make('height')
                            ->maxLength(255)
                            ->label('Height')
                            ->placeholder('e.g., 5.11/180 cm')
                            ->helperText('Displayed as "Height" in hero banner. If product has specifications, they will be used as fallback.'),
                    ])
                    ->columns(3),
                
                Forms\Components\Section::make('Additional Information')
                    ->schema([
                        Forms\Components\Textarea::make('care_instructions')
                            ->label('Care Instructions')
                            ->rows(3)
                            ->placeholder('e.g., Machine wash cold • Hang dry • Do not bleach')
                            ->helperText('Care instructions displayed on product detail page')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('shipping_info')
                            ->label('Shipping Information')
                            ->rows(2)
                            ->placeholder('e.g., Free shipping on orders over ₹5,000')
                            ->helperText('Shipping information displayed on product detail page')
                            ->columnSpanFull(),
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
                static::productTableColumn(),
                Tables\Columns\TextColumn::make('product.price')
                    ->label('Price')
                    ->money('INR')
                    ->sortable()
                    ->placeholder('—')
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
