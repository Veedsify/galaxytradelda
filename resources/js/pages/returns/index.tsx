import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';
import { index as returnsIndex, show as returnsShow } from '@/routes/returns';
import { dashboard } from '@/routes';

interface ReturnRequest {
    id: number;
    return_number: string;
    type: 'return' | 'refund' | 'exchange';
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    reason: string;
    refund_amount: string | null;
    created_at: string;
    order: {
        id: number;
        order_number: string;
    };
}

interface PaginatedReturnRequests {
    data: ReturnRequest[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Returns & Refunds', href: returnsIndex().url },
];

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

export default function ReturnsIndex({
    returnRequests,
}: {
    returnRequests: PaginatedReturnRequests;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Returns & Refunds" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Returns & Refunds
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {returnRequests.total} request
                        {returnRequests.total !== 1 ? 's' : ''} total
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-sidebar-border/70 bg-muted/50 text-left dark:border-sidebar-border">
                                <th className="px-4 py-3 font-semibold">
                                    Reference
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Order
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Type
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Reason
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Refund Amount
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Status
                                </th>
                                <th className="px-4 py-3 font-semibold">
                                    Date
                                </th>
                                <th className="px-4 py-3 font-semibold"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnRequests.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-4 py-10 text-center text-muted-foreground"
                                    >
                                        You have no return or refund requests.
                                    </td>
                                </tr>
                            )}
                            {returnRequests.data.map((req) => (
                                <tr
                                    key={req.id}
                                    className="border-b border-sidebar-border/70 transition-colors last:border-0 hover:bg-muted/30 dark:border-sidebar-border"
                                >
                                    <td className="px-4 py-3 font-mono font-medium">
                                        {req.return_number}
                                    </td>
                                    <td className="px-4 py-3 font-mono text-xs">
                                        {req.order.order_number}
                                    </td>
                                    <td className="px-4 py-3">
                                        {typeLabel[req.type]}
                                    </td>
                                    <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                                        {req.reason}
                                    </td>
                                    <td className="px-4 py-3">
                                        {req.refund_amount
                                            ? `$${req.refund_amount}`
                                            : '—'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            variant={statusVariant[req.status]}
                                            className="capitalize"
                                        >
                                            {req.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {new Date(
                                            req.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link
                                            href={returnsShow(req.id).url}
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

                {returnRequests.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Page {returnRequests.current_page} of{' '}
                            {returnRequests.last_page}
                        </p>
                        <div className="flex gap-2">
                            {returnRequests.prev_page_url && (
                                <Link
                                    href={returnRequests.prev_page_url}
                                    className="rounded-md border border-sidebar-border/70 px-3 py-1.5 text-sm hover:bg-muted/30 dark:border-sidebar-border"
                                >
                                    Previous
                                </Link>
                            )}
                            {returnRequests.next_page_url && (
                                <Link
                                    href={returnRequests.next_page_url}
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
