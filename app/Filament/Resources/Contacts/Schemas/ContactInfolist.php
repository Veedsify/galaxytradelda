<?php

namespace App\Filament\Resources\Contacts\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ContactInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Sender')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('name'),

                        TextEntry::make('email')
                            ->copyable(),

                        TextEntry::make('subject')
                            ->placeholder('(no subject)'),

                        TextEntry::make('created_at')
                            ->label('Received At')
                            ->dateTime('M j, Y g:i A'),

                        TextEntry::make('ip_address')
                            ->label('IP Address')
                            ->placeholder('—'),

                        TextEntry::make('read_at')
                            ->label('Read At')
                            ->dateTime('M j, Y g:i A')
                            ->placeholder('Not yet read'),
                    ]),

                Section::make('Message')
                    ->schema([
                        TextEntry::make('message')
                            ->prose()
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
