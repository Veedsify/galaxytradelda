<?php

namespace App\Filament\Resources\Orders\Schemas;


use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class OrderInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Order Information')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('order_number'),

                        TextEntry::make('user.name')
                            ->label('Customer'),

                        TextEntry::make('status')
                            ->badge()
                            ->color(fn(string $state): string => match ($state) {
                                'pending' => 'warning',
                                'processing' => 'info',
                                'shipped' => 'primary',
                                'delivered' => 'success',
                                'cancelled' => 'danger',
                                default => 'gray',
                            }),

                        TextEntry::make('tracking_number')
                            ->placeholder('—'),
                    ]),

                Section::make('Amounts')
                    ->columns(3)
                    ->schema([
                        TextEntry::make('subtotal')
                            ->money('USD'),

                        TextEntry::make('shipping')
                            ->money('USD'),

                        TextEntry::make('total')
                            ->money('USD'),
                    ]),

                Section::make('Shipping Address')
                    ->columns(3)
                    ->schema([
                        TextEntry::make('shipping_address'),

                        TextEntry::make('shipping_city'),

                        TextEntry::make('shipping_country'),
                    ]),

                Section::make('Timeline')
                    ->columns(3)
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Placed At')
                            ->dateTime(),

                        TextEntry::make('shipped_at')
                            ->dateTime()
                            ->placeholder('—'),

                        TextEntry::make('delivered_at')
                            ->dateTime()
                            ->placeholder('—'),
                    ]),
            ]);
    }
}
