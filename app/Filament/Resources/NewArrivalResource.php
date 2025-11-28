<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewArrivalResource\Pages;
use App\Filament\Resources\NewArrivalResource\RelationManagers;
use App\Models\NewArrival;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NewArrivalResource extends Resource
{
    protected static ?string $model = NewArrival::class;

    protected static ?string $navigationIcon = 'heroicon-o-sparkles';
    
    protected static ?string $navigationLabel = 'New Arrivals';
    
    protected static ?string $modelLabel = 'New Arrival';
    
    protected static ?string $pluralModelLabel = 'New Arrivals';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Product Selection')
                    ->schema([
                        Forms\Components\Select::make('product_id')
                            ->label('Product (Optional)')
                            ->relationship('product', 'name')
                            ->searchable()
                            ->preload()
                            ->nullable()
                            ->helperText('Optionally link to a product. New Arrivals can work independently with their own images.'),
                    ]),
                
                Forms\Components\Section::make('Images')
                    ->schema([
                        Forms\Components\FileUpload::make('image_url')
                            ->label('Main Image')
                            ->image()
                            ->directory('new-arrivals-images')
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
                            ->helperText('Main product image')
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('hover_image_url')
                            ->label('Hover Image (Optional)')
                            ->image()
                            ->directory('new-arrivals-images')
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
                            ->helperText('Image shown on hover (optional)')
                            ->columnSpanFull(),
                    ]),
                
                Forms\Components\Section::make('Display Settings')
                    ->schema([
                        Forms\Components\TextInput::make('look_number')
                            ->label('Look Number')
                            ->maxLength(255)
                            ->placeholder('e.g., Look 01, Look 02')
                            ->helperText('Displayed as badge on product card'),
                        Forms\Components\TextInput::make('drop_number')
                            ->label('Drop Number')
                            ->maxLength(255)
                            ->placeholder('e.g., Drop 07')
                            ->helperText('Displayed as category/subtitle'),
                        Forms\Components\TextInput::make('order')
                            ->label('Display Order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower numbers appear first'),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true),
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
                        // First, try new_arrival image_url
                        $imageUrl = $record->getRawOriginal('image_url');
                        
                        // If no new_arrival image, try product's first image (if product exists)
                        if (!$imageUrl) {
                            $product = $record->product;
                            if ($product && $product->images && $product->images->count() > 0) {
                                $productImage = $product->images->first()->getRawOriginal('image_url');
                                if ($productImage) {
                                    $imageUrl = $productImage;
                                }
                            }
                        }
                        
                        // If still no image, return null to show placeholder
                        if (!$imageUrl) {
                            return null;
                        }
                        
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
                Tables\Columns\TextColumn::make('product.name')
                    ->label('Product')
                    ->searchable()
                    ->sortable()
                    ->placeholder('No product linked')
                    ->default('—'),
                Tables\Columns\TextColumn::make('look_number')
                    ->label('Look')
                    ->searchable(),
                Tables\Columns\TextColumn::make('drop_number')
                    ->label('Drop')
                    ->searchable(),
                Tables\Columns\TextColumn::make('order')
                    ->label('Order')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
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
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNewArrivals::route('/'),
            'create' => Pages\CreateNewArrival::route('/create'),
            'edit' => Pages\EditNewArrival::route('/{record}/edit'),
        ];
    }
}
