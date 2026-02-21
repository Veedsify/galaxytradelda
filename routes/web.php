<?php

use App\Mail\ContactSubmitted;
use App\Mail\OrderPlaced;
use App\Models\ContactSubmission;
use App\Http\Controllers\Orders\OrderController;
use App\Http\Controllers\Public\CheckoutController;
use App\Http\Controllers\Public\ProductController;
use App\Http\Controllers\Returns\ReturnController;
use App\Http\Controllers\Wishlist\WishlistController;
use App\Models\Order;
use App\Models\Product;
use App\Models\ReturnRequest;
use App\Models\User;
use App\Models\WishlistItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Laravel\Fortify\Features;

Route::get('/', function () {
    $featuredProducts = Product::with(['images', 'category'])
        ->where('is_active', true)
        ->orderByDesc('is_featured')
        ->orderBy('name')
        ->limit(20)
        ->get();

    return Inertia::render('welcome', [
        'canRegister'      => Features::enabled(Features::registration()),
        'featuredProducts' => $featuredProducts,
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::post('/checkout', [CheckoutController::class, 'store'])->middleware(['auth'])->name('checkout.store');
Route::post('/checkout/guest', [CheckoutController::class, 'guestStore'])->name('checkout.guest');

Route::get('/certificate', function () {
    return Inertia::render('certificate');
})->name('certificate');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::post('/contact', function (\Illuminate\Http\Request $request) {
    $request->validate([
        'name'    => 'required|string|max:255',
        'email'   => 'required|email|max:255',
        'subject' => 'nullable|string|max:255',
        'message' => 'required|string|max:5000',
    ]);

    $submission = ContactSubmission::create([
        'name'       => $request->name,
        'email'      => $request->email,
        'subject'    => $request->subject,
        'message'    => $request->message,
        'ip_address' => $request->ip(),
    ]);

    $adminEmail = User::where('role', 'admin')->value('email') ?? env('ADMIN_EMAIL', config('mail.from.address'));
    Mail::to($adminEmail)->send(new ContactSubmitted($submission));

    return back()->with('success', true);
})->name('contact.submit');

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
    Route::post('wishlist', [WishlistController::class, 'store'])->name('wishlist.store');
    Route::delete('wishlist/{wishlistItem}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');

    Route::get('returns', [ReturnController::class, 'index'])->name('returns.index');
    Route::get('returns/{returnRequest}', [ReturnController::class, 'show'])->name('returns.show');
});

require __DIR__ . '/settings.php';
