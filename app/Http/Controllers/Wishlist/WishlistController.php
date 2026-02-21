<?php

namespace App\Http\Controllers\Wishlist;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\WishlistItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class WishlistController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $items = WishlistItem::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(20);

        return Inertia::render('wishlist/index', [
            'items' => $items,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
        ]);

        $product = Product::with('primaryImage')->findOrFail($validated['product_id']);

        WishlistItem::firstOrCreate(
            [
                'user_id' => $request->user()->id,
                'sku'     => $product->sku,
            ],
            [
                'product_name'  => $product->name,
                'product_image' => $product->primaryImage?->url,
                'price'         => $product->sale_price ?? $product->price,
                'in_stock'      => $product->stock_quantity > 0,
            ]
        );

        return back();
    }

    public function destroy(Request $request, WishlistItem $wishlistItem): RedirectResponse
    {
        abort_unless($wishlistItem->user_id === $request->user()->id, 403);

        $wishlistItem->delete();

        return back();
    }
}
