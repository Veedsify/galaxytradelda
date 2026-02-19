<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(fake()->numberBetween(2, 4), true);
        $price = fake()->randomFloat(2, 10, 500);
        $onSale = fake()->boolean(30);

        return [
            'category_id' => Category::factory(),
            'name' => ucwords($name),
            'slug' => Str::slug($name) . '-' . fake()->unique()->numberBetween(1, 99999),
            'description' => fake()->paragraph(),
            'sku' => strtoupper(fake()->unique()->bothify('PRD-######')),
            'price' => $price,
            'sale_price' => $onSale ? round($price * fake()->randomFloat(2, 0.5, 0.9), 2) : null,
            'stock_quantity' => fake()->numberBetween(0, 500),
            'is_active' => fake()->boolean(85),
            'is_featured' => fake()->boolean(20),
        ];
    }

    public function active(): static
    {
        return $this->state(fn(array $attributes) => ['is_active' => true]);
    }

    public function featured(): static
    {
        return $this->state(fn(array $attributes) => ['is_featured' => true]);
    }

    public function onSale(): static
    {
        return $this->state(function (array $attributes) {
            $price = $attributes['price'];

            return ['sale_price' => round($price * 0.8, 2)];
        });
    }
}
