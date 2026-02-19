<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Order Information')
                    ->columns(2)
                    ->schema([
                        TextInput::make('order_number')
                            ->required()
                            ->maxLength(255)
                            ->disabled()
                            ->dehydrated(),

                        Select::make('user_id')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),

                        Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'processing' => 'Processing',
                                'shipped' => 'Shipped',
                                'delivered' => 'Delivered',
                                'cancelled' => 'Cancelled',
                            ])
                            ->required()
                            ->default('pending'),

                        TextInput::make('tracking_number')
                            ->maxLength(255)
                            ->nullable(),
                    ]),

                Section::make('Amounts')
                    ->columns(3)
                    ->schema([
                        TextInput::make('subtotal')
                            ->required()
                            ->numeric()
                            ->prefix('$')
                            ->minValue(0),

                        TextInput::make('shipping')
                            ->required()
                            ->numeric()
                            ->prefix('$')
                            ->default(0)
                            ->minValue(0),

                        TextInput::make('total')
                            ->required()
                            ->numeric()
                            ->prefix('$')
                            ->minValue(0),
                    ]),

                Section::make('Shipping Address')
                    ->columns(2)
                    ->schema([
                        TextInput::make('shipping_address')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('shipping_city')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('shipping_country')
                            ->required()
                            ->maxLength(255),
                    ]),

                Section::make('Dates')
                    ->columns(2)
                    ->schema([
                        DateTimePicker::make('shipped_at')
                            ->nullable(),

                        DateTimePicker::make('delivered_at')
                            ->nullable(),
                    ]),

                Section::make('Order Items')
                    ->schema([
                        Repeater::make('items')
                            ->relationship()
                            ->schema([
                                TextInput::make('product_name')
                                    ->required()
                                    ->maxLength(255),

                                TextInput::make('sku')
                                    ->label('SKU')
                                    ->maxLength(255),

                                TextInput::make('quantity')
                                    ->required()
                                    ->numeric()
                                    ->default(1)
                                    ->minValue(1),

                                TextInput::make('unit_price')
                                    ->required()
                                    ->numeric()
                                    ->prefix('$')
                                    ->minValue(0),

                                TextInput::make('subtotal')
                                    ->required()
                                    ->numeric()
                                    ->prefix('$')
                                    ->minValue(0),
                            ])
                            ->columns(5)
                            ->defaultItems(0)
                            ->collapsible(),
                    ]),
            ]);
    }
}
