<x-emails.layout subject="New Order Received – #{{ $order->order_number }}">
    <!-- Banner -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        <tr>
            <td style="background:linear-gradient(135deg,#1a2171,#2a3491);border-radius:8px;padding:20px 24px;text-align:center;">
                <p style="font-size:22px;font-weight:800;color:#f5c518;margin:0;">🛒 New Order Received!</p>
                <p style="font-size:14px;color:rgba(255,255,255,0.8);margin-top:6px;">Order <strong style="color:#fff;">#{{ $order->order_number }}</strong> was just placed.</p>
            </td>
        </tr>
    </table>

    <!-- Order Info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8ebf7;border-radius:8px;overflow:hidden;margin-bottom:24px;">
        <tr style="background-color:#f8f9ff;">
            <td colspan="2" style="padding:12px 20px;border-bottom:1px solid #e8ebf7;">
                <p style="font-size:12px;font-weight:700;color:#1a2171;text-transform:uppercase;letter-spacing:0.5px;margin:0;">Order Details</p>
            </td>
        </tr>
        <tr>
            <td style="padding:12px 20px;width:140px;color:#666;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid #f0f0f0;">Customer</td>
            <td style="padding:12px 20px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">{{ $order->user->name }}</td>
        </tr>
        <tr>
            <td style="padding:12px 20px;color:#666;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid #f0f0f0;">Email</td>
            <td style="padding:12px 20px;font-size:13px;border-bottom:1px solid #f0f0f0;">
                <a href="mailto:{{ $order->user->email }}" style="color:#1a2171;text-decoration:none;">{{ $order->user->email }}</a>
            </td>
        </tr>
        <tr>
            <td style="padding:12px 20px;color:#666;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid #f0f0f0;">Status</td>
            <td style="padding:12px 20px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">
                <span style="display:inline-block;background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;text-transform:uppercase;">{{ $order->status }}</span>
            </td>
        </tr>
        <tr>
            <td style="padding:12px 20px;color:#666;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid #f0f0f0;">Shipping To</td>
            <td style="padding:12px 20px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">{{ $order->shipping_address }}, {{ $order->shipping_city }}, {{ $order->shipping_country }}</td>
        </tr>
        <tr>
            <td style="padding:12px 20px;color:#666;font-size:13px;font-weight:600;vertical-align:top;">Placed At</td>
            <td style="padding:12px 20px;font-size:13px;color:#333;">{{ $order->created_at->format('M j, Y \a\t g:i A') }}</td>
        </tr>
    </table>

    <!-- Items -->
    <p style="font-size:12px;font-weight:700;color:#1a2171;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Items Ordered</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8ebf7;border-radius:8px;overflow:hidden;margin-bottom:24px;">
        <tr style="background-color:#f8f9ff;">
            <td style="padding:10px 16px;font-size:11px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:0.5px;">Product</td>
            <td style="padding:10px 16px;font-size:11px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:0.5px;text-align:center;">Qty</td>
            <td style="padding:10px 16px;font-size:11px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:0.5px;text-align:right;">Price</td>
        </tr>
        @foreach($order->items as $item)
        <tr style="border-top:1px solid #f0f0f0;">
            <td style="padding:12px 16px;font-size:13px;color:#333;">
                {{ $item->product_name }}
                @if($item->sku)<br><span style="font-size:11px;color:#999;">SKU: {{ $item->sku }}</span>@endif
            </td>
            <td style="padding:12px 16px;font-size:13px;color:#333;text-align:center;">{{ $item->quantity }}</td>
            <td style="padding:12px 16px;font-size:13px;color:#333;text-align:right;">${{ number_format($item->unit_price, 2) }}</td>
        </tr>
        @endforeach
        <!-- Totals -->
        <tr style="border-top:2px solid #e8ebf7;background-color:#f8f9ff;">
            <td colspan="2" style="padding:12px 16px;font-size:13px;font-weight:600;color:#666;">Subtotal</td>
            <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#333;text-align:right;">${{ number_format($order->subtotal, 2) }}</td>
        </tr>
        <tr style="background-color:#f8f9ff;">
            <td colspan="2" style="padding:8px 16px;font-size:13px;color:#666;">Shipping</td>
            <td style="padding:8px 16px;font-size:13px;color:#333;text-align:right;">${{ number_format($order->shipping, 2) }}</td>
        </tr>
        <tr style="background-color:#1a2171;">
            <td colspan="2" style="padding:14px 16px;font-size:14px;font-weight:800;color:#f5c518;">Total</td>
            <td style="padding:14px 16px;font-size:14px;font-weight:800;color:#f5c518;text-align:right;">${{ number_format($order->total, 2) }}</td>
        </tr>
    </table>

    <!-- CTA -->
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td style="text-align:center;">
                <a href="{{ config('app.url') }}/admin/orders/{{ $order->id }}"
                   style="display:inline-block;background-color:#1a2171;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 28px;border-radius:8px;">
                    View Order in Dashboard
                </a>
            </td>
        </tr>
    </table>
</x-emails.layout>
