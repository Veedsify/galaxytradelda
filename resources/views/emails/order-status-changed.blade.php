<x-emails.layout subject="Your Order #{{ $order->order_number }} Has Been Updated">
    <!-- Greeting -->
    <p style="font-size:16px;color:#333;margin-bottom:20px;">
        Hi <strong>{{ $order->user->name }}</strong>,
    </p>
    <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:24px;">
        Great news! Your order status has been updated. Here's a summary of what's changed.
    </p>

    <!-- Status Change -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        <tr>
            <td style="text-align:center;padding:24px;background-color:#f8f9ff;border-radius:12px;border:2px solid #e8ebf7;">
                <p style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;">Order Status</p>
                <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                    <tr>
                        <td style="background-color:#fee2e2;color:#991b1b;font-size:13px;font-weight:700;padding:8px 20px;border-radius:20px;text-transform:uppercase;">{{ $oldStatus }}</td>
                        <td style="padding:0 16px;font-size:20px;color:#1a2171;">→</td>
                        <td style="background-color:#{{ $statusColor }};color:#fff;font-size:13px;font-weight:700;padding:8px 20px;border-radius:20px;text-transform:uppercase;">{{ $order->status }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- Order Summary -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8ebf7;border-radius:8px;overflow:hidden;margin-bottom:24px;">
        <tr style="background-color:#f8f9ff;">
            <td colspan="2" style="padding:12px 20px;border-bottom:1px solid #e8ebf7;">
                <p style="font-size:12px;font-weight:700;color:#1a2171;text-transform:uppercase;letter-spacing:0.5px;margin:0;">Order #{{ $order->order_number }}</p>
            </td>
        </tr>
        <tr>
            <td style="padding:12px 20px;width:140px;color:#666;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid #f0f0f0;">Items</td>
            <td style="padding:12px 20px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">{{ $order->items->count() }} item(s)</td>
        </tr>
        <tr>
            <td style="padding:12px 20px;color:#666;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid #f0f0f0;">Total</td>
            <td style="padding:12px 20px;font-size:13px;color:#333;font-weight:700;border-bottom:1px solid #f0f0f0;">${{ number_format($order->total, 2) }}</td>
        </tr>
        <tr>
            <td style="padding:12px 20px;color:#666;font-size:13px;font-weight:600;vertical-align:top;">Shipping To</td>
            <td style="padding:12px 20px;font-size:13px;color:#333;">{{ $order->shipping_address }}, {{ $order->shipping_city }}, {{ $order->shipping_country }}</td>
        </tr>
        @if($order->tracking_number)
        <tr>
            <td style="padding:12px 20px;color:#666;font-size:13px;font-weight:600;vertical-align:top;border-top:1px solid #f0f0f0;">Tracking #</td>
            <td style="padding:12px 20px;font-size:13px;color:#1a2171;font-weight:700;border-top:1px solid #f0f0f0;">{{ $order->tracking_number }}</td>
        </tr>
        @endif
    </table>

    @if($order->status === 'shipped')
    <div style="background:#eff6ff;border-left:4px solid #3b82f6;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:24px;">
        <p style="font-size:13px;color:#1e40af;font-weight:600;margin:0;">📦 Your order is on its way!</p>
        <p style="font-size:13px;color:#3b82f6;margin-top:4px;">You'll receive delivery updates as your package travels to you.</p>
    </div>
    @elseif($order->status === 'delivered')
    <div style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:24px;">
        <p style="font-size:13px;color:#15803d;font-weight:600;margin:0;">✅ Your order has been delivered!</p>
        <p style="font-size:13px;color:#22c55e;margin-top:4px;">We hope you love your purchase. Thank you for shopping with Galaxy Trade LDA!</p>
    </div>
    @endif

    <p style="font-size:13px;color:#888;margin-bottom:24px;">
        If you have any questions about your order, please don't hesitate to
        <a href="mailto:info@galaxytradelda.com" style="color:#1a2171;text-decoration:none;">contact us</a>.
    </p>

    <!-- CTA -->
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td style="text-align:center;">
                <a href="{{ config('app.url') }}/dashboard/orders"
                   style="display:inline-block;background-color:#1a2171;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 28px;border-radius:8px;">
                    View My Orders
                </a>
            </td>
        </tr>
    </table>
</x-emails.layout>
