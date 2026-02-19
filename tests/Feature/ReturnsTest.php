<?php

use App\Models\Order;
use App\Models\ReturnRequest;
use App\Models\User;

test('guests are redirected when visiting returns index', function () {
    $this->get(route('returns.index'))->assertRedirect(route('login'));
});

test('authenticated users can visit returns index', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('returns.index'))
        ->assertOk()
        ->assertInertia(fn($page) => $page->component('returns/index'));
});

test('returns index only shows requests belonging to the authenticated user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $ownOrder = Order::factory()->for($user)->create();
    $otherOrder = Order::factory()->for($otherUser)->create();

    $ownReturn = ReturnRequest::factory()->for($user)->for($ownOrder)->create();
    ReturnRequest::factory()->for($otherUser)->for($otherOrder)->create();

    $this->actingAs($user)
        ->get(route('returns.index'))
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('returns/index')
                ->where('returnRequests.total', 1)
                ->where('returnRequests.data.0.id', $ownReturn->id),
        );
});

test('authenticated users can view their own return request', function () {
    $user = User::factory()->create();
    $order = Order::factory()->for($user)->create();
    $returnRequest = ReturnRequest::factory()->for($user)->for($order)->create();

    $this->actingAs($user)
        ->get(route('returns.show', $returnRequest))
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('returns/show')
                ->where('returnRequest.id', $returnRequest->id),
        );
});

test('users cannot view another users return request', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $order = Order::factory()->for($otherUser)->create();
    $returnRequest = ReturnRequest::factory()->for($otherUser)->for($order)->create();

    $this->actingAs($user)
        ->get(route('returns.show', $returnRequest))
        ->assertForbidden();
});
