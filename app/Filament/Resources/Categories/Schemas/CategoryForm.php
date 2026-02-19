<?php

namespace App\Filament\Resources\Categories\Schemas;

use App\Models\Category;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Information')
                    ->description('Set the category name and its place in the hierarchy.')
                    ->icon('heroicon-o-folder')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn($set, ?string $state) => $set('slug', Str::slug($state ?? ''))),

                        Select::make('parent_id')
                            ->label('Parent Category')
                            ->relationship('parent', 'name')
                            ->searchable()
                            ->preload()
                            ->nullable()
                            ->placeholder('Root (no parent)'),
                    ]),

                Section::make('SEO & URL')
                    ->description('Control how this category appears in URLs and search engines.')
                    ->icon('heroicon-o-globe-alt')
                    ->collapsible()
                    ->schema([
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(Category::class, 'slug', ignoreRecord: true)
                            ->helperText('Auto-generated from the name. Changing this may break existing links.'),
                    ]),

                Section::make('Description')
                    ->description('Provide a detailed description shown on the category page.')
                    ->icon('heroicon-o-document-text')
                    ->collapsible()
                    ->collapsed()
                    ->schema([
                        RichEditor::make('description')
                            ->label(false)
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'bulletList',
                                'orderedList',
                                'link',
                                'h2',
                                'h3',
                            ]),
                    ]),

                Section::make('Media')
                    ->description('Upload a cover image for this category.')
                    ->icon('heroicon-o-photo')
                    ->collapsible()
                    ->schema([
                        FileUpload::make('image')
                            ->label(false)
                            ->image()
                            ->directory('categories')
                            ->imagePreviewHeight('200')
                            ->maxSize(2048)
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
                    ]),

                Section::make('Settings')
                    ->description('Control visibility and ordering of this category.')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->columns(2)
                    ->schema([
                        TextInput::make('sort_order')
                            ->label('Sort Order')
                            ->numeric()
                            ->default(0)
                            ->minValue(0)
                            ->helperText('Lower numbers appear first.'),

                        Toggle::make('is_active')
                            ->label('Active')
                            ->helperText('Inactive categories are hidden from the storefront.')
                            ->default(true),
                    ]),
            ]);
    }
}
