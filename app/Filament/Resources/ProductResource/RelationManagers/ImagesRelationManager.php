<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ImagesRelationManager extends RelationManager
{
    protected static string $relationship = 'images';

    protected static ?string $title = 'Product Images';

    protected static ?string $modelLabel = 'Image';

    protected static ?string $pluralModelLabel = 'Images';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('image_url')
                    ->label('Image')
                    ->image()
                    ->directory('product-images')
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
                    ->required()
                    ->helperText('Upload product image. First image will be used as the main product image. Maximum file size: 2MB. Please compress images before uploading.'),
                Forms\Components\TextInput::make('alt_text')
                    ->label('Alt Text')
                    ->maxLength(255)
                    ->helperText('Alternative text for accessibility and SEO'),
                Forms\Components\TextInput::make('order')
                    ->label('Display Order')
                    ->numeric()
                    ->default(0)
                    ->required()
                    ->helperText('Lower numbers appear first. First image (order 0) is the main image.'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('alt_text')
            ->columns([
                Tables\Columns\ImageColumn::make('image_url')
                    ->label('Image')
                    ->size(100)
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
                Tables\Columns\TextColumn::make('alt_text')
                    ->label('Alt Text')
                    ->searchable()
                    ->placeholder('—')
                    ->default('—'),
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
