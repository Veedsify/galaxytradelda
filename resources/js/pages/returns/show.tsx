import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { show as ordersShow } from '@/routes/orders';
import { index as returnsIndex, show as returnsShow } from '@/routes/returns';
import type { BreadcrumbItem } from '@/types';

interface OrderItem {
    id: number;
    product_name: string;
    sku: string | null;
    quantity: number;
    unit_price: string;
    subtotal: string;
}

interface ReturnRequest {
    id: number;
    return_number: string;
    type: 'return' | 'refund' | 'exchange';
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    reason: string;
    refund_amount: string | null;
    resolved_at: string | null;
    created_at: string;
    order: {
        id: number;
        order_number: string;
        total: string;
        shipping_address: string;
        shipping_city: string;
        shipping_country: string;
        items: OrderItem[];
    };
}

const statusVariant: Record<
    ReturnRequest['status'],
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    pending: 'secondary',
    approved: 'default',
    rejected: 'destructive',
    completed: 'outline',
};

const typeLabel: Record<ReturnRequest['type'], string> = {
    return: 'Return',
    refund: 'Refund',
    exchange: 'Exchange',
};

export default function ReturnShow({
    returnRequest,
}: {
    returnRequest: ReturnRequest;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Returns & Refunds', href: returnsIndex().url },
        {
            title: returnRequest.return_number,
            href: returnsShow(returnRequest.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Return ${returnRequest.return_number}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {typeLabel[returnRequest.type]} Request —{' '}
                            {returnRequest.return_number}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Submitted on{' '}
                            {new Date(
                                returnRequest.created_at,
                            ).toLocaleDateString()}
                        </p>
                    </div>
                    <Badge
                        variant={statusVariant[returnRequest.status]}
                        className="capitalize"
                    >
                        {returnRequest.status}
                    </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Request Details */}
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h2 className="mb-3 font-semibold">Request Details</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Type
                                </span>
                                <span>{typeLabel[returnRequest.type]}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Status
                                </span>
                                <span className="capitalize">
                                    {returnRequest.status}
                                </span>
                            </div>
                            {returnRequest.refund_amount && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Refund Amount
                                    </span>
                                    <span className="font-semibold">
                                        ${returnRequest.refund_amount}
                                    </span>
                                </div>
                            )}
                            {returnRequest.resolved_at && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Resolved
                                    </span>
                                    <span>
                                        {new Date(
                                            returnRequest.resolved_at,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="mt-3 border-t border-sidebar-border/70 pt-3 dark:border-sidebar-border">
                            <p className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Reason
                            </p>
                            <p className="text-sm">{returnRequest.reason}</p>
                        </div>
                    </div>

                    {/* Related Order */}
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h2 className="mb-3 font-semibold">Related Order</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Order Number
                                </span>
                                <Link
                                    href={
                                        ordersShow(returnRequest.order.id).url
                                    }
                                    className="font-mono text-primary hover:underline"
                                >
                                    {returnRequest.order.order_number}
                                </Link>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Order Total
                                </span>
                                <span>${returnRequest.order.total}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Ship To
                                </span>
                                <span>
                                    {returnRequest.order.shipping_city},{' '}
                                    {returnRequest.order.shipping_country}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div>
                    <h2 className="mb-3 font-semibold">
                        Items in Original Order
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 bg-muted/50 text-left dark:border-sidebar-border">
                                    <th className="px-4 py-3 font-semibold">
                                        Product
                                    </th>
                                    <th className="px-4 py-3 font-semibold">
                                        SKU
                                    </th>
                                    <th className="px-4 py-3 font-semibold">
                                        Qty
                                    </th>
                                    <th className="px-4 py-3 font-semibold">
                                        Unit Price
                                    </th>
                                    <th className="px-4 py-3 text-right font-semibold">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {returnRequest.order.items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {item.product_name}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                                            {item.sku ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {item.quantity}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            ${item.unit_price}
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium">
                                            ${item.subtotal}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <Link
                        href={returnsIndex().url}
                        className="text-sm text-primary hover:underline"
                    >
                        ← Back to Returns & Refunds
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
