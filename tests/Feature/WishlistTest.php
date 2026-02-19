<?php

use App\Models\User;
use App\Models\WishlistItem;

test('guests are redirected when visiting wishlist', function () {
    $this->get(route('wishlist.index'))->assertRedirect(route('login'));
});

test('authenticated users can visit wishlist index', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('wishlist.index'))
        ->assertOk()
        ->assertInertia(fn($page) => $page->component('wishlist/index'));
});

test('wishlist only shows items belonging to the authenticated user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $ownItem = WishlistItem::factory()->for($user)->create();
    WishlistItem::factory()->for($otherUser)->create();

    $this->actingAs($user)
        ->get(route('wishlist.index'))
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('wishlist/index')
                ->where('items.total', 1)
                ->where('items.data.0.id', $ownItem->id),
        );
});

test('users can remove a wishlist item they own', function () {
    $user = User::factory()->create();
    $item = WishlistItem::factory()->for($user)->create();

    $this->actingAs($user)
        ->delete(route('wishlist.destroy', $item))
        ->assertNoContent();

    $this->assertModelMissing($item);
});

test('users cannot remove another users wishlist item', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $item = WishlistItem::factory()->for($otherUser)->create();

    $this->actingAs($user)
        ->delete(route('wishlist.destroy', $item))
        ->assertForbidden();

    $this->assertModelExists($item);
});
