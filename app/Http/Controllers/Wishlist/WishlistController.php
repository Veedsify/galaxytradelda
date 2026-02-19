<?php

namespace App\Http\Controllers\Wishlist;

use App\Http\Controllers\Controller;
use App\Models\WishlistItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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

    public function destroy(Request $request, WishlistItem $wishlistItem): Response
    {
        abort_unless($wishlistItem->user_id === $request->user()->id, 403);

        $wishlistItem->delete();

        return response()->noContent();
    }
}
