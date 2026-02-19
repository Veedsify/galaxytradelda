<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReturnRequest>
 */
class ReturnRequestFactory extends Factory
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
            'order_id' => Order::factory(),
            'return_number' => 'RET-' . strtoupper(fake()->bothify('##????##')),
            'type' => fake()->randomElement(['return', 'refund', 'exchange']),
            'status' => fake()->randomElement(['pending', 'approved', 'rejected', 'completed']),
            'reason' => fake()->sentence(),
            'refund_amount' => fake()->optional()->randomFloat(2, 5, 200),
            'resolved_at' => fake()->optional()->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
