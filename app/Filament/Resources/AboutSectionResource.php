<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AboutSectionResource\Pages;
use App\Filament\Resources\AboutSectionResource\RelationManagers;
use App\Models\AboutSection;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AboutSectionResource extends Resource
{
    protected static ?string $model = AboutSection::class;

    protected static ?string $navigationIcon = 'heroicon-o-information-circle';
    
    protected static ?string $navigationLabel = 'About Us';
    
    protected static ?string $navigationGroup = 'Website Management';
    
    protected static ?string $modelLabel = 'About Section';
    
    protected static ?string $pluralModelLabel = 'About Sections';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Content')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->default('ABOUT US')
                            ->label('Title'),
                        Forms\Components\Textarea::make('description')
                            ->required()
                            ->rows(4)
                            ->label('Description')
                            ->columnSpanFull(),
                    ]),
                
                Forms\Components\Section::make('Background Image')
                    ->schema([
                        Forms\Components\FileUpload::make('background_image_url')
                            ->label('Background Image')
                            ->image()
                            ->directory('about-section-images')
                            ->disk('public')
                            ->visibility('public')
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                null,
                                '16:9',
                                '21:9',
                                '4:3',
                            ])
                            ->maxSize(2048) // 2MB
                            ->helperText('Background image for the About Us section. Maximum file size: 2MB. Please compress images before uploading.')
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
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->limit(50)
                    ->wrap(),
                Tables\Columns\ImageColumn::make('background_image_url')
                    ->label('Background')
                    ->circular()
                    ->size(60)
                    ->defaultImageUrl(url('/storage/images/stay-in-the-loop-bg.png'))
                    ->getStateUsing(function ($record) {
                        if (!$record->background_image_url) {
                            return url('/storage/images/stay-in-the-loop-bg.png');
                        }
                        
                        $imageUrl = $record->getRawOriginal('background_image_url');
                        
                        if (str_starts_with($imageUrl, 'http://') || str_starts_with($imageUrl, 'https://')) {
                            return $imageUrl;
                        }
                        
                        if (str_starts_with($imageUrl, '/storage/')) {
                            return url($imageUrl);
                        }
                        
                        return \Illuminate\Support\Facades\Storage::disk('public')->url($imageUrl);
                    }),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('values_count')
                    ->counts('values')
                    ->label('Values'),
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
            RelationManagers\ValuesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAboutSections::route('/'),
            'create' => Pages\CreateAboutSection::route('/create'),
            'edit' => Pages\EditAboutSection::route('/{record}/edit'),
        ];
    }
}
