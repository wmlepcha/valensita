<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FooterResource\Pages;
use App\Filament\Resources\FooterResource\RelationManagers;
use App\Models\Footer;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FooterResource extends Resource
{
    protected static ?string $model = Footer::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-down-tray';
    
    protected static ?string $navigationLabel = 'Footer';
    
    protected static ?string $navigationGroup = 'Website Management';
    
    protected static ?string $modelLabel = 'Footer';
    
    protected static ?string $pluralModelLabel = 'Footers';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Brand Information')
                    ->schema([
                        Forms\Components\TextInput::make('brand_name')
                            ->required()
                            ->maxLength(255)
                            ->default('VALENSITA')
                            ->label('Brand Name'),
                        Forms\Components\Textarea::make('description')
                            ->required()
                            ->rows(3)
                            ->label('Description')
                            ->columnSpanFull(),
                    ]),
                
                Forms\Components\Section::make('Logo')
                    ->schema([
                        Forms\Components\FileUpload::make('logo_url')
                            ->label('Logo Image')
                            ->image()
                            ->directory('footer-images')
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
                            ->helperText('Upload the footer logo image. Maximum file size: 2MB. Please compress images before uploading.')
                            ->columnSpanFull(),
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
                Tables\Columns\TextColumn::make('brand_name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->limit(50)
                    ->wrap(),
                Tables\Columns\ImageColumn::make('logo_url')
                    ->label('Logo')
                    ->circular()
                    ->size(60)
                    ->defaultImageUrl(url('/storage/images/valensita-footer-logo.png'))
                    ->getStateUsing(function ($record) {
                        if (!$record->logo_url) {
                            return url('/storage/images/valensita-footer-logo.png');
                        }
                        
                        $logoUrl = $record->getRawOriginal('logo_url');
                        
                        if (str_starts_with($logoUrl, 'http://') || str_starts_with($logoUrl, 'https://')) {
                            return $logoUrl;
                        }
                        
                        if (str_starts_with($logoUrl, '/storage/')) {
                            return url($logoUrl);
                        }
                        
                        return \Illuminate\Support\Facades\Storage::disk('public')->url($logoUrl);
                    }),
                Tables\Columns\TextColumn::make('socialLinks_count')
                    ->counts('socialLinks')
                    ->label('Social Links'),
                Tables\Columns\TextColumn::make('serviceItems_count')
                    ->counts('serviceItems')
                    ->label('Service Items'),
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
            ])
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
            RelationManagers\SocialLinksRelationManager::class,
            RelationManagers\ServiceItemsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFooters::route('/'),
            'create' => Pages\CreateFooter::route('/create'),
            'edit' => Pages\EditFooter::route('/{record}/edit'),
        ];
    }
}
