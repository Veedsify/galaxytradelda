<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WishlistItem>
 */
class WishlistItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'product_name' => fake()->words(3, true),
            'product_image' => null,
            'sku' => strtoupper(fake()->bothify('??-####')),
            'price' => fake()->randomFloat(2, 5, 500),
            'in_stock' => fake()->boolean(75),
        ];
    }
}
