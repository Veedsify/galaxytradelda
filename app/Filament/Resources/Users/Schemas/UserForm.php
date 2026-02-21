<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Account')
                    ->description('Login credentials and account security.')
                    ->icon('heroicon-o-lock-closed')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        TextInput::make('password')
                            ->password()
                            ->dehydrateStateUsing(fn(string $state): string => Hash::make($state))
                            ->dehydrated(fn(?string $state): bool => filled($state))
                            ->required(fn(string $operation): bool => $operation === 'create')
                            ->rule(Password::default())
                            ->revealable()
                            ->helperText('Leave blank when editing to keep the existing password.'),
                Select::make('role')
                    ->options([
                        'admin' => 'Admin',
                        'user' => 'User',
                    ])
                    ->required(),
                        Select::make('email_verified_at')
                            ->label('Email Status')
                            ->options([
                                'verified' => 'Verified',
                                'unverified' => 'Unverified',
                            ])
                            ->dehydrated(false)
                            ->hidden(),
                    ]),

                Section::make('Profile')
                    ->description('Personal details and contact information.')
                    ->icon('heroicon-o-user')
                    ->columns(2)
                    ->schema([
                        FileUpload::make('avatar')
                            ->label('Avatar')
                            ->image()
                            ->directory('avatars')
                            ->imagePreviewHeight('80')
                            ->maxSize(1024)
                            ->columnSpanFull(),

                        TextInput::make('phone')
                            ->tel()
                            ->maxLength(30)
                            ->placeholder('+1 (555) 000-0000'),

                        DatePicker::make('date_of_birth')
                            ->label('Date of Birth')
                            ->maxDate(now()->subYears(13))
                            ->nullable(),

                        Select::make('gender')
                            ->options([
                                'male' => 'Male',
                                'female' => 'Female',
                                'other' => 'Other / Non-binary',
                                'prefer_not_to_say' => 'Prefer not to say',
                            ])
                            ->nullable(),
                    ]),

                Section::make('Billing Address')
                    ->description('Default billing address used at checkout.')
                    ->icon('heroicon-o-credit-card')
                    ->columns(2)
                    ->collapsible()
                    ->collapsed()
                    ->schema([
                        TextInput::make('billing_name')
                            ->label('Full Name')
                            ->maxLength(255)
                            ->columnSpanFull(),

                        TextInput::make('billing_address')
                            ->label('Street Address')
                            ->maxLength(255)
                            ->columnSpanFull(),

                        TextInput::make('billing_city')
                            ->label('City')
                            ->maxLength(255),

                        TextInput::make('billing_state')
                            ->label('State / Province')
                            ->maxLength(255),

                        TextInput::make('billing_country')
                            ->label('Country')
                            ->maxLength(255),

                        TextInput::make('billing_postcode')
                            ->label('Postcode / ZIP')
                            ->maxLength(20),
                    ]),

                Section::make('Shipping Address')
                    ->description('Default shipping address used at checkout.')
                    ->icon('heroicon-o-truck')
                    ->columns(2)
                    ->collapsible()
                    ->collapsed()
                    ->schema([
                        TextInput::make('shipping_name')
                            ->label('Full Name')
                            ->maxLength(255)
                            ->columnSpanFull(),

                        TextInput::make('shipping_address')
                            ->label('Street Address')
                            ->maxLength(255)
                            ->columnSpanFull(),

                        TextInput::make('shipping_city')
                            ->label('City')
                            ->maxLength(255),

                        TextInput::make('shipping_state')
                            ->label('State / Province')
                            ->maxLength(255),

                        TextInput::make('shipping_country')
                            ->label('Country')
                            ->maxLength(255),

                        TextInput::make('shipping_postcode')
                            ->label('Postcode / ZIP')
                            ->maxLength(20),
                    ]),

                Section::make('Preferences')
                    ->description('Communication and localisation preferences.')
                    ->icon('heroicon-o-adjustments-horizontal')
                    ->columns(2)
                    ->collapsible()
                    ->schema([
                        Select::make('preferred_currency')
                            ->label('Currency')
                            ->options([
                                'USD' => 'USD — US Dollar',
                                'EUR' => 'EUR — Euro',
                                'GBP' => 'GBP — British Pound',
                                'CAD' => 'CAD — Canadian Dollar',
                                'AUD' => 'AUD — Australian Dollar',
                                'JPY' => 'JPY — Japanese Yen',
                                'NGN' => 'NGN — Nigerian Naira',
                            ])
                            ->default('USD'),

                        Select::make('preferred_language')
                            ->label('Language')
                            ->options([
                                'en' => 'English',
                                'fr' => 'French',
                                'de' => 'German',
                                'es' => 'Spanish',
                                'pt' => 'Portuguese',
                            ])
                            ->default('en'),

                        Toggle::make('newsletter_subscribed')
                            ->label('Newsletter')
                            ->helperText('Receive email newsletters and promotions.')
                            ->default(false),

                        Toggle::make('marketing_opt_in')
                            ->label('Marketing Emails')
                            ->helperText('Receive personalised product recommendations.')
                            ->default(false),
                    ]),

                Section::make('Admin Settings')
                    ->description('Internal settings visible only to admins.')
                    ->icon('heroicon-o-shield-check')
                    ->columns(2)
                    ->collapsible()
                    ->schema([
                Select::make('role')
                    ->label('Role')
                    ->options([
                        'user'  => 'User',
                        'admin' => 'Admin',
                    ])
                    ->default('user')
                    ->required(),

                Toggle::make('is_active')
                            ->label('Active Account')
                            ->helperText('Inactive users cannot log in.')
                            ->default(true),

                        TextInput::make('loyalty_points')
                            ->label('Loyalty Points')
                            ->numeric()
                            ->default(0)
                            ->minValue(0),

                        Textarea::make('notes')
                            ->label('Internal Notes')
                            ->placeholder('Visible only to admins — never shown to the user.')
                            ->rows(4)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
