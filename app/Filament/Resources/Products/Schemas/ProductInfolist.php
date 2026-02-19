<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Product Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('name'),

                        TextEntry::make('slug'),

                        TextEntry::make('category.name')
                            ->label('Category'),

                        TextEntry::make('sku')
                            ->label('SKU'),

                        TextEntry::make('description')
                            ->html()
                            ->columnSpanFull(),
                    ]),

                Section::make('Pricing & Stock')
                    ->columns(3)
                    ->schema([
                        TextEntry::make('price')
                            ->money('USD'),

                        TextEntry::make('sale_price')
                            ->money('USD')
                            ->placeholder('—'),

                        TextEntry::make('stock_quantity')
                            ->label('Stock'),
                    ]),

                Section::make('Visibility')
                    ->columns(2)
                    ->schema([
                        IconEntry::make('is_active')
                            ->boolean()
                            ->label('Active'),

                        IconEntry::make('is_featured')
                            ->boolean()
                            ->label('Featured'),
                    ]),

                Section::make('Images')
                    ->schema([
                        ImageEntry::make('images.url')
                            ->label('Product Images')
                            ->stacked(),
                    ]),

                Section::make('Timestamps')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('created_at')
                            ->dateTime(),

                        TextEntry::make('updated_at')
                            ->dateTime(),
                    ]),
            ]);
    }
}
