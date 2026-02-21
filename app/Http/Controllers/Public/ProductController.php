<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $sort = $request->get('sort', 'default');

        $query = Product::with(['images', 'category'])
            ->where('is_active', true);

        match ($sort) {
            'name_asc'  => $query->orderBy('name'),
            'name_desc' => $query->orderByDesc('name'),
            'featured'  => $query->orderByDesc('is_featured')->orderBy('name'),
            'newest'    => $query->orderByDesc('created_at'),
            default     => $query->orderByDesc('is_featured')->orderBy('name'),
        };

        return Inertia::render('products', [
            'products' => $query->paginate(32)->withQueryString(),
            'sort'     => $sort,
        ]);
    }

    public function show(Product $product): Response
    {
        abort_unless($product->is_active, 404);

        $product->load(['images', 'sizes', 'category']);

        return Inertia::render('product-show', [
            'product' => $product,
        ]);
    }
}
