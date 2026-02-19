<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\ReturnRequest;
use App\Models\User;
use App\Models\WishlistItem;
use Filament\Support\Enums\Size;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Category::factory(5)->create();
        Product::factory(50)->create();
        ProductImage::factory(150)->create();
        ProductSize::factory(8)->create();
        Order::factory(20)->create();
        ReturnRequest::factory(10)->create();
        OrderItem::factory(100)->create();
        WishlistItem::factory(30)->create();
    }
}
