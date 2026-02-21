<?php

namespace App\Filament\Resources\Contacts\Tables;

use App\Filament\Resources\Contacts\Pages\ViewContact;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ContactsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                IconColumn::make('read_at')
                    ->label('Read')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-envelope')
                    ->trueColor('success')
                    ->falseColor('warning')
                    ->getStateUsing(fn($record) => $record->read_at !== null),

                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('semibold'),

                TextColumn::make('email')
                    ->searchable()
                    ->sortable()
                    ->copyable(),

                TextColumn::make('subject')
                    ->placeholder('(no subject)')
                    ->limit(40),

                TextColumn::make('message')
                    ->limit(60)
                    ->placeholder('—')
                    ->toggleable(),

                TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime('M j, Y g:i A')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Filter::make('unread')
                    ->label('Unread only')
                    ->query(fn(Builder $query) => $query->whereNull('read_at'))
                    ->toggle(),
            ])
            ->actions([
                ViewAction::make(),
                DeleteAction::make(),
                Action::make('mark_read')
                    ->label('Mark as Read')
                    ->icon('heroicon-o-check')
                    ->color('success')
                    ->visible(fn($record) => $record->read_at === null)
                    ->action(fn($record) => $record->markAsRead()),
            ]);
    }
}
