<?php

namespace App\Filament\Resources\ReturnRequests\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ReturnRequestInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Return Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('return_number'),

                        TextEntry::make('user.name')
                            ->label('Customer'),

                        TextEntry::make('order.order_number')
                            ->label('Order'),

                        TextEntry::make('type')
                            ->badge()
                            ->color(fn(string $state): string => match ($state) {
                                'return' => 'warning',
                                'refund' => 'danger',
                                'exchange' => 'info',
                                default => 'gray',
                            }),

                        TextEntry::make('status')
                            ->badge()
                            ->color(fn(string $state): string => match ($state) {
                                'pending' => 'warning',
                                'approved' => 'success',
                                'rejected' => 'danger',
                                'completed' => 'info',
                                default => 'gray',
                            }),

                        TextEntry::make('refund_amount')
                            ->money('USD')
                            ->placeholder('—'),
                    ]),

                Section::make('Reason')
                    ->schema([
                        TextEntry::make('reason')
                            ->columnSpanFull(),
                    ]),

                Section::make('Timestamps')
                    ->columns(3)
                    ->schema([
                        TextEntry::make('created_at')
                            ->dateTime(),

                        TextEntry::make('updated_at')
                            ->dateTime(),

                        TextEntry::make('resolved_at')
                            ->dateTime()
                            ->placeholder('—'),
                    ]),
            ]);
    }
}
