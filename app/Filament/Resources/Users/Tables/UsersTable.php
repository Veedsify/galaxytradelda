<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('avatar')
                    ->circular()
                    ->defaultImageUrl(fn($record) => 'https://ui-avatars.com/api/?name=' . urlencode($record->name) . '&color=7F9CF5&background=EBF4FF'),

                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('email')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('phone')
                    ->searchable()
                    ->placeholder('—')
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('email_verified_at')
                    ->label('Verified')
                    ->dateTime()
                    ->sortable()
                    ->placeholder('Not verified'),

                IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),

                TextColumn::make('role')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'admin' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('loyalty_points')
                    ->label('Points')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('preferred_currency')
                    ->label('Currency')
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('shipping_country')
                    ->label('Country')
                    ->placeholder('—')
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('orders_count')
                    ->label('Orders')
                    ->counts('orders')
                    ->sortable(),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Active'),

                TernaryFilter::make('email_verified_at')
                    ->label('Email Verified')
                    ->nullable(),

                TernaryFilter::make('newsletter_subscribed')
                    ->label('Newsletter'),

                SelectFilter::make('role')
                    ->label('Role')
                    ->options([
                        'user'  => 'User',
                        'admin' => 'Admin',
                    ]),

                SelectFilter::make('preferred_currency')
                    ->label('Currency')
                    ->options([
                        'USD' => 'USD',
                        'EUR' => 'EUR',
                        'GBP' => 'GBP',
                        'CAD' => 'CAD',
                        'AUD' => 'AUD',
                        'NGN' => 'NGN',
                    ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
