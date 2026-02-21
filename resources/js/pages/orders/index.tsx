import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { OrderStatusBadge } from '@/components/status-badge';
import type { BreadcrumbItem } from '@/types';
import { index as ordersIndex, show as ordersShow } from '@/routes/orders';
import { dashboard } from '@/routes';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    unit_price: string;
    subtotal: string;
}

interface Order {
    id: number;
    order_number: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: string;
    shipping_city: string;
    shipping_country: string;
    created_at: string;
    items: OrderItem[];
}

interface PaginatedOrders {
    data: Order[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'My Orders', href: ordersIndex().url },
];

export default function OrdersIndex({ orders }: { orders: PaginatedOrders }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Orders" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        My Orders
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {orders.total} order{orders.total !== 1 ? 's' : ''}{' '}
                        total
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-sidebar-border/70 bg-muted/50 text-left dark:border-sidebar-border">
                                <th className="px-4 py-3 font-semibold">
                                    Order #
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Date
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Items
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Destination
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Total
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Status
                                </th>
                                <th className="px-4 py-3 font-semibold"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-10 text-center text-muted-foreground"
                                    >
                                        You have no orders yet.
                                    </td>
                                </tr>
                            )}
                            {orders.data.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-sidebar-border/70 transition-colors last:border-0 hover:bg-muted/30 dark:border-sidebar-border"
                                >
                                    <td className="px-4 py-3 font-mono font-medium">
                                        {order.order_number}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {new Date(
                                            order.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {order.items.length}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {order.shipping_city},{' '}
                                        {order.shipping_country}
                                    </td>
                                    <td className="px-4 py-3 font-medium">
                                        ${order.total}
                                    </td>
                                    <td className="px-4 py-3">
                                        <OrderStatusBadge status={order.status} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={ordersShow(order.id).url}
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {orders.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Page {orders.current_page} of {orders.last_page}
                        </p>
                        <div className="flex gap-2">
                            {orders.prev_page_url && (
                                <Link
                                    href={orders.prev_page_url}
                                    className="rounded-md border border-sidebar-border/70 px-3 py-1.5 text-sm hover:bg-muted/30 dark:border-sidebar-border"
                                >
                                    Previous
                                </Link>
                            )}
                            {orders.next_page_url && (
                                <Link
                                    href={orders.next_page_url}
                                    className="rounded-md border border-sidebar-border/70 px-3 py-1.5 text-sm hover:bg-muted/30 dark:border-sidebar-border"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
