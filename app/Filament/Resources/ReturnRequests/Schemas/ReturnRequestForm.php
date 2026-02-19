<?php

namespace App\Filament\Resources\ReturnRequests\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ReturnRequestForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Return Details')
                    ->columns(2)
                    ->schema([
                        TextInput::make('return_number')
                            ->required()
                            ->maxLength(255)
                            ->disabled()
                            ->dehydrated(),

                        Select::make('user_id')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),

                        Select::make('order_id')
                            ->relationship('order', 'order_number')
                            ->searchable()
                            ->preload()
                            ->required(),

                        Select::make('type')
                            ->options([
                                'return' => 'Return',
                                'refund' => 'Refund',
                                'exchange' => 'Exchange',
                            ])
                            ->required(),

                        Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'approved' => 'Approved',
                                'rejected' => 'Rejected',
                                'completed' => 'Completed',
                            ])
                            ->required()
                            ->default('pending'),

                        TextInput::make('refund_amount')
                            ->numeric()
                            ->prefix('$')
                            ->minValue(0)
                            ->nullable(),
                    ]),

                Section::make('Reason')
                    ->schema([
                        Textarea::make('reason')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                    ]),

                Section::make('Resolution')
                    ->schema([
                        DateTimePicker::make('resolved_at')
                            ->nullable(),
                    ]),
            ]);
    }
}
