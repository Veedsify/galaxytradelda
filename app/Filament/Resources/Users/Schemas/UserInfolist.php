<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class UserInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Account')
                    ->icon('heroicon-o-lock-closed')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('name'),

                        TextEntry::make('email'),

                        TextEntry::make('email_verified_at')
                            ->label('Email Verified')
                            ->dateTime()
                            ->placeholder('Not verified'),

                        IconEntry::make('is_active')
                            ->boolean()
                            ->label('Active Account'),
                    ]),

                Section::make('Profile')
                    ->icon('heroicon-o-user')
                    ->columns(2)
                    ->schema([
                        ImageEntry::make('avatar')
                            ->circular()
                            ->columnSpanFull(),

                        TextEntry::make('phone')
                            ->placeholder('—'),

                        TextEntry::make('date_of_birth')
                            ->label('Date of Birth')
                            ->date()
                            ->placeholder('—'),

                        TextEntry::make('gender')
                            ->placeholder('—')
                            ->formatStateUsing(fn(?string $state): string => match ($state) {
                                'male' => 'Male',
                                'female' => 'Female',
                                'other' => 'Other / Non-binary',
                                'prefer_not_to_say' => 'Prefer not to say',
                                default => '—',
                            }),
                    ]),

                Section::make('Billing Address')
                    ->icon('heroicon-o-credit-card')
                    ->columns(2)
                    ->collapsible()
                    ->schema([
                        TextEntry::make('billing_name')
                            ->label('Full Name')
                            ->placeholder('—')
                            ->columnSpanFull(),

                        TextEntry::make('billing_address')
                            ->label('Street')
                            ->placeholder('—'),

                        TextEntry::make('billing_city')
                            ->label('City')
                            ->placeholder('—'),

                        TextEntry::make('billing_state')
                            ->label('State')
                            ->placeholder('—'),

                        TextEntry::make('billing_country')
                            ->label('Country')
                            ->placeholder('—'),

                        TextEntry::make('billing_postcode')
                            ->label('Postcode')
                            ->placeholder('—'),
                    ]),

                Section::make('Shipping Address')
                    ->icon('heroicon-o-truck')
                    ->columns(2)
                    ->collapsible()
                    ->schema([
                        TextEntry::make('shipping_name')
                            ->label('Full Name')
                            ->placeholder('—')
                            ->columnSpanFull(),

                        TextEntry::make('shipping_address')
                            ->label('Street')
                            ->placeholder('—'),

                        TextEntry::make('shipping_city')
                            ->label('City')
                            ->placeholder('—'),

                        TextEntry::make('shipping_state')
                            ->label('State')
                            ->placeholder('—'),

                        TextEntry::make('shipping_country')
                            ->label('Country')
                            ->placeholder('—'),

                        TextEntry::make('shipping_postcode')
                            ->label('Postcode')
                            ->placeholder('—'),
                    ]),

                Section::make('Preferences')
                    ->icon('heroicon-o-adjustments-horizontal')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('preferred_currency')
                            ->label('Currency'),

                        TextEntry::make('preferred_language')
                            ->label('Language'),

                        IconEntry::make('newsletter_subscribed')
                            ->boolean()
                            ->label('Newsletter'),

                        IconEntry::make('marketing_opt_in')
                            ->boolean()
                            ->label('Marketing Emails'),
                    ]),

                Section::make('Admin Settings')
                    ->icon('heroicon-o-shield-check')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('loyalty_points')
                            ->label('Loyalty Points')
                            ->numeric(),

                        TextEntry::make('notes')
                            ->label('Internal Notes')
                            ->placeholder('No notes.')
                            ->columnSpanFull(),
                    ]),

                Section::make('Timestamps')
                    ->icon('heroicon-o-clock')
                    ->columns(2)
                    ->collapsible()
                    ->schema([
                        TextEntry::make('created_at')
                            ->dateTime(),

                        TextEntry::make('updated_at')
                            ->dateTime(),
                    ]),
            ]);
    }
}
