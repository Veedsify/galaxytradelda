<?php

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;

test('guests are redirected when visiting orders index', function () {
    $this->get(route('orders.index'))->assertRedirect(route('login'));
});

test('authenticated users can visit orders index', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('orders.index'))
        ->assertOk()
        ->assertInertia(fn($page) => $page->component('orders/index'));
});

test('orders index only shows orders belonging to the authenticated user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $ownOrder = Order::factory()->for($user)->create();
    Order::factory()->for($otherUser)->create();

    $this->actingAs($user)
        ->get(route('orders.index'))
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('orders/index')
                ->where('orders.data.0.id', $ownOrder->id)
                ->where('orders.total', 1),
        );
});

test('authenticated users can view their own order', function () {
    $user = User::factory()->create();
    $order = Order::factory()->for($user)->has(OrderItem::factory()->count(2), 'items')->create();

    $this->actingAs($user)
        ->get(route('orders.show', $order))
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('orders/show')
                ->where('order.id', $order->id),
        );
});

test('users cannot view another users order', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $order = Order::factory()->for($otherUser)->create();

    $this->actingAs($user)
        ->get(route('orders.show', $order))
        ->assertForbidden();
});
