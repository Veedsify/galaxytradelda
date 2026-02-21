<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        // Profile
        'phone',
        'date_of_birth',
        'gender',
        'avatar',
        // Billing address
        'billing_name',
        'billing_address',
        'billing_city',
        'billing_state',
        'billing_country',
        'billing_postcode',
        // Shipping address
        'shipping_name',
        'shipping_address',
        'shipping_city',
        'shipping_state',
        'shipping_country',
        'shipping_postcode',
        // Preferences
        'newsletter_subscribed',
        'marketing_opt_in',
        'preferred_currency',
        'preferred_language',
        // Admin
        'is_active',
        'loyalty_points',
        'notes',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'date_of_birth' => 'date',
            'newsletter_subscribed' => 'boolean',
            'marketing_opt_in' => 'boolean',
            'is_active' => 'boolean',
            'loyalty_points' => 'integer',
        ];
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->role === 'admin';
    }

    /** @return HasMany<Order, $this> */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /** @return HasMany<WishlistItem, $this> */
    public function wishlistItems(): HasMany
    {
        return $this->hasMany(WishlistItem::class);
    }

    /** @return HasMany<ReturnRequest, $this> */
    public function returnRequests(): HasMany
    {
        return $this->hasMany(ReturnRequest::class);
    }
}
