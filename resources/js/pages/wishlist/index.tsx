import { Head, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import {
    index as wishlistIndex,
    destroy as wishlistDestroy,
} from '@/routes/wishlist';
import type { BreadcrumbItem } from '@/types';

interface WishlistItem {
    id: number;
    product_name: string;
    sku: string | null;
    price: string;
    in_stock: boolean;
    created_at: string;
}

interface PaginatedWishlistItems {
    data: WishlistItem[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Wishlist', href: wishlistIndex().url },
];

function removeItem(item: WishlistItem) {
    router.delete(wishlistDestroy(item.id).url, {
        preserveScroll: true,
    });
}

export default function WishlistIndex({
    items,
}: {
    items: PaginatedWishlistItems;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Wishlist" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        My Wishlist
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {items.total} item{items.total !== 1 ? 's' : ''} saved
                    </p>
                </div>

                {items.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-sidebar-border/70 py-20 dark:border-sidebar-border">
                        <p className="text-sm text-muted-foreground">
                            Your wishlist is empty.
                        </p>
                    </div>
                ) : (
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
                                        Price
                                    </th>
                                    <th className="px-4 py-3 font-semibold">
                                        Availability
                                    </th>
                                    <th className="px-4 py-3 font-semibold">
                                        Added
                                    </th>
                                    <th className="px-4 py-3 font-semibold"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-sidebar-border/70 transition-colors last:border-0 hover:bg-muted/30 dark:border-sidebar-border"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {item.product_name}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                                            {item.sku ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            ${item.price}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge
                                                variant={
                                                    item.in_stock
                                                        ? 'default'
                                                        : 'destructive'
                                                }
                                            >
                                                {item.in_stock
                                                    ? 'In Stock'
                                                    : 'Out of Stock'}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(
                                                item.created_at,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeItem(item)}
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {items.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Page {items.current_page} of {items.last_page}
                        </p>
                        <div className="flex gap-2">
                            {items.prev_page_url && (
                                <a
                                    href={items.prev_page_url}
                                    className="rounded-md border border-sidebar-border/70 px-3 py-1.5 text-sm hover:bg-muted/30 dark:border-sidebar-border"
                                >
                                    Previous
                                </a>
                            )}
                            {items.next_page_url && (
                                <a
                                    href={items.next_page_url}
                                    className="rounded-md border border-sidebar-border/70 px-3 py-1.5 text-sm hover:bg-muted/30 dark:border-sidebar-border"
                                >
                                    Next
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
