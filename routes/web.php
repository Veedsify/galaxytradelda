<?php

use App\Http\Controllers\Orders\OrderController;
use App\Http\Controllers\Returns\ReturnController;
use App\Http\Controllers\Wishlist\WishlistController;
use App\Models\Order;
use App\Models\ReturnRequest;
use App\Models\WishlistItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function (Request $request) {
    $userId = $request->user()->id;

    $totalOrders = Order::query()->where('user_id', $userId)->count();
    $totalSpent = Order::query()->where('user_id', $userId)->whereNotIn('status', ['cancelled'])->sum('total');
    $wishlistCount = WishlistItem::query()->where('user_id', $userId)->count();
    $pendingReturns = ReturnRequest::query()->where('user_id', $userId)->whereIn('status', ['pending', 'approved'])->count();

    $recentOrders = Order::query()
        ->where('user_id', $userId)
        ->with('items')
        ->latest()
        ->limit(5)
        ->get();

    $recentWishlistItems = WishlistItem::query()
        ->where('user_id', $userId)
        ->latest()
        ->limit(5)
        ->get();

    $recentReturns = ReturnRequest::query()
        ->where('user_id', $userId)
        ->with('order:id,order_number')
        ->latest()
        ->limit(5)
        ->get();

    return Inertia::render('dashboard', [
        'stats' => [
            'totalOrders' => $totalOrders,
            'totalSpent' => number_format((float) $totalSpent, 2),
            'wishlistCount' => $wishlistCount,
            'pendingReturns' => $pendingReturns,
        ],
        'recentOrders' => $recentOrders,
        'recentWishlistItems' => $recentWishlistItems,
        'recentReturns' => $recentReturns,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{order}', [OrderController::class, 'show'])->name('orders.show');

    Route::get('wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
    Route::delete('wishlist/{wishlistItem}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');

    Route::get('returns', [ReturnController::class, 'index'])->name('returns.index');
    Route::get('returns/{returnRequest}', [ReturnController::class, 'show'])->name('returns.show');
});

require __DIR__ . '/settings.php';
