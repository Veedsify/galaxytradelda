import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index as ordersIndex, show as ordersShow } from '@/routes/orders';
import type { BreadcrumbItem } from '@/types';

interface ReturnRequest {
    id: number;
    return_number: string;
    type: string;
    status: string;
    reason: string;
    created_at: string;
}

interface OrderItem {
    id: number;
    product_name: string;
    sku: string | null;
    quantity: number;
    unit_price: string;
    subtotal: string;
}

interface Order {
    id: number;
    order_number: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    subtotal: string;
    shipping: string;
    total: string;
    shipping_address: string;
    shipping_city: string;
    shipping_country: string;
    tracking_number: string | null;
    shipped_at: string | null;
    delivered_at: string | null;
    created_at: string;
    items: OrderItem[];
    return_requests: ReturnRequest[];
}

const statusVariant: Record<Order['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
    pending: 'secondary',
    processing: 'outline',
    shipped: 'default',
    delivered: 'default',
    cancelled: 'destructive',
};

const statusLabel: Record<Order['status'], string> = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
};

export default function OrderShow({ order }: { order: Order }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'My Orders', href: ordersIndex().url },
        { title: order.order_number, href: ordersShow(order.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order ${order.order_number}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Order {order.order_number}</h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <Badge variant={statusVariant[order.status]}>{statusLabel[order.status]}</Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Shipping Info */}
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h2 className="mb-3 font-semibold">Shipping Information</h2>
                        <p className="text-muted-foreground text-sm">{order.shipping_address}</p>
                        <p className="text-muted-foreground text-sm">
                            {order.shipping_city}, {order.shipping_country}
                        </p>
                        {order.tracking_number && (
                            <p className="mt-2 text-sm">
                                <span className="font-medium">Tracking: </span>
                                <span className="font-mono">{order.tracking_number}</span>
                            </p>
                        )}
                        {order.shipped_at && (
                            <p className="text-muted-foreground mt-1 text-sm">
                                Shipped: {new Date(order.shipped_at).toLocaleDateString()}
                            </p>
                        )}
                        {order.delivered_at && (
                            <p className="text-muted-foreground mt-1 text-sm">
                                Delivered: {new Date(order.delivered_at).toLocaleDateString()}
                            </p>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h2 className="mb-3 font-semibold">Order Summary</h2>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${order.subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>${order.shipping}</span>
                            </div>
                            <div className="flex justify-between border-t border-sidebar-border/70 pt-2 font-semibold dark:border-sidebar-border">
                                <span>Total</span>
                                <span>${order.total}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div>
                    <h2 className="mb-3 font-semibold">Items Ordered</h2>
                    <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-muted/50 border-b border-sidebar-border/70 text-left dark:border-sidebar-border">
                                    <th className="px-4 py-3 font-semibold">Product</th>
                                    <th className="px-4 py-3 font-semibold">SKU</th>
                                    <th className="px-4 py-3 font-semibold">Qty</th>
                                    <th className="px-4 py-3 font-semibold">Unit Price</th>
                                    <th className="px-4 py-3 font-semibold text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border"
                                    >
                                        <td className="px-4 py-3 font-medium">{item.product_name}</td>
                                        <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                                            {item.sku ?? '—'}
                                        </td>
                                        <td className="text-muted-foreground px-4 py-3">{item.quantity}</td>
                                        <td className="text-muted-foreground px-4 py-3">${item.unit_price}</td>
                                        <td className="px-4 py-3 text-right font-medium">${item.subtotal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Return Requests */}
                {order.return_requests.length > 0 && (
                    <div>
                        <h2 className="mb-3 font-semibold">Return / Refund Requests</h2>
                        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-muted/50 border-b border-sidebar-border/70 text-left dark:border-sidebar-border">
                                        <th className="px-4 py-3 font-semibold">Reference</th>
                                        <th className="px-4 py-3 font-semibold">Type</th>
                                        <th className="px-4 py-3 font-semibold">Reason</th>
                                        <th className="px-4 py-3 font-semibold">Status</th>
                                        <th className="px-4 py-3 font-semibold">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.return_requests.map((req) => (
                                        <tr
                                            key={req.id}
                                            className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border"
                                        >
                                            <td className="px-4 py-3 font-mono font-medium">{req.return_number}</td>
                                            <td className="px-4 py-3 capitalize">{req.type}</td>
                                            <td className="text-muted-foreground max-w-xs truncate px-4 py-3">
                                                {req.reason}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant="outline" className="capitalize">
                                                    {req.status}
                                                </Badge>
                                            </td>
                                            <td className="text-muted-foreground px-4 py-3">
                                                {new Date(req.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div>
                    <Link href={ordersIndex().url} className="text-primary hover:underline text-sm">
                        ← Back to My Orders
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
