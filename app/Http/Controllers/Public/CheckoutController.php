<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Mail\OrderPlaced;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    private function orderRules(): array
    {
        return [
            'product_id'       => ['required', 'exists:products,id'],
            'size_id'          => ['nullable', 'exists:product_sizes,id'],
            'quantity'         => ['required', 'integer', 'min:1', 'max:100'],
            'shipping_address' => ['required', 'string', 'max:255'],
            'shipping_city'    => ['required', 'string', 'max:100'],
            'shipping_country' => ['required', 'string', 'max:100'],
        ];
    }

    private function createOrder(int $userId, array $validated): Order
    {
        $product  = Product::with('images')->findOrFail($validated['product_id']);
        $price    = $product->sale_price ?? $product->price;
        $qty      = (int) $validated['quantity'];
        $subtotal = bcmul((string) $price, (string) $qty, 2);

        $primaryImage = $product->images->where('is_primary', true)->first() ?? $product->images->first();

        $order = Order::create([
            'user_id'          => $userId,
            'order_number'     => 'ORD-' . strtoupper(Str::random(8)),
            'status'           => 'pending',
            'subtotal'         => $subtotal,
            'shipping'         => 0,
            'total'            => $subtotal,
            'shipping_address' => $validated['shipping_address'],
            'shipping_city'    => $validated['shipping_city'],
            'shipping_country' => $validated['shipping_country'],
        ]);

        $order->items()->create([
            'product_name'  => $product->name,
            'product_image' => $primaryImage?->url,
            'sku'           => $product->sku,
            'quantity'      => $qty,
            'unit_price'    => $price,
            'subtotal'      => $subtotal,
        ]);

        $order->load(['user', 'items']);

        $adminEmail = User::where('role', 'admin')->value('email') ?? env('ADMIN_EMAIL', config('mail.from.address'));
        Mail::to($adminEmail)->send(new OrderPlaced($order));

        return $order;
    }

    /** Authenticated checkout */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->orderRules());

        $order = $this->createOrder($request->user()->id, $validated);

        return to_route('orders.show', $order);
    }

    /** Guest checkout — register then create order */
    public function guestStore(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'                  => ['required', 'string', 'max:255'],
            'email'                 => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone'                 => ['nullable', 'string', 'max:20'],
            'password'              => ['required', 'string', 'min:8', 'confirmed'],
            ...$this->orderRules(),
        ]);

        $user = User::create([
            'name'             => $validated['name'],
            'email'            => $validated['email'],
            'phone'            => $validated['phone'] ?? null,
            'password'         => $validated['password'],
            'shipping_address' => $validated['shipping_address'],
            'shipping_city'    => $validated['shipping_city'],
            'shipping_country' => $validated['shipping_country'],
        ]);

        Auth::login($user);

        $order = $this->createOrder($user->id, $validated);

        return to_route('orders.show', $order);
    }
}
