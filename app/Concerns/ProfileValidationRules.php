<?php

namespace App\Concerns;

use App\Models\User;
use Illuminate\Validation\Rule;

trait ProfileValidationRules
{
    /**
     * Get the validation rules used to validate user profiles.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    protected function profileRules(?int $userId = null): array
    {
        return [
            'name'  => $this->nameRules(),
            'email' => $this->emailRules($userId),
            // Personal
            'phone'         => ['nullable', 'string', 'max:20'],
            'date_of_birth' => ['nullable', 'date'],
            'gender'        => ['nullable', 'string', 'in:male,female,other,prefer_not_to_say'],
            // Billing
            'billing_name'     => ['nullable', 'string', 'max:255'],
            'billing_address'  => ['nullable', 'string', 'max:255'],
            'billing_city'     => ['nullable', 'string', 'max:100'],
            'billing_state'    => ['nullable', 'string', 'max:100'],
            'billing_country'  => ['nullable', 'string', 'max:100'],
            'billing_postcode' => ['nullable', 'string', 'max:20'],
            // Shipping
            'shipping_name'     => ['nullable', 'string', 'max:255'],
            'shipping_address'  => ['nullable', 'string', 'max:255'],
            'shipping_city'     => ['nullable', 'string', 'max:100'],
            'shipping_state'    => ['nullable', 'string', 'max:100'],
            'shipping_country'  => ['nullable', 'string', 'max:100'],
            'shipping_postcode' => ['nullable', 'string', 'max:20'],
            // Preferences
            'newsletter_subscribed' => ['nullable', 'boolean'],
            'marketing_opt_in'      => ['nullable', 'boolean'],
            'preferred_currency'    => ['nullable', 'string', 'max:3'],
            'preferred_language'    => ['nullable', 'string', 'max:10'],
        ];
    }

    /**
     * Get the validation rules used to validate user names.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function nameRules(): array
    {
        return ['required', 'string', 'max:255'];
    }

    /**
     * Get the validation rules used to validate user emails.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function emailRules(?int $userId = null): array
    {
        return [
            'required',
            'string',
            'email',
            'max:255',
            $userId === null
                ? Rule::unique(User::class)
                : Rule::unique(User::class)->ignore($userId),
        ];
    }
}
