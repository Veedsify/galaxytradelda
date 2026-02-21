import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBag,
    Heart,
    RotateCcw,
    DollarSign,
    ArrowRight,
    Package,
} from 'lucide-react';
import { OrderStatusBadge, ReturnStatusBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index as ordersIndex, show as ordersShow } from '@/routes/orders';
import { index as returnsIndex } from '@/routes/returns';
import { index as wishlistIndex } from '@/routes/wishlist';
import type { BreadcrumbItem } from '@/types';

interface Stats {
    totalOrders: number;
    totalSpent: string;
    wishlistCount: number;
    pendingReturns: number;
}

interface OrderItem {
    id: number;
    product_name: string;
}

interface Order {
    id: number;
    order_number: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: string;
    created_at: string;
    items: OrderItem[];
}

interface WishlistItem {
    id: number;
    product_name: string;
    price: string;
    in_stock: boolean;
}

interface ReturnRequest {
    id: number;
    return_number: string;
    type: 'return' | 'refund' | 'exchange';
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    created_at: string;
    order: { id: number; order_number: string } | null;
}

interface DashboardProps {
    stats: Stats;
    recentOrders: Order[];
    recentWishlistItems: WishlistItem[];
    recentReturns: ReturnRequest[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

function StatCard({
    label,
    value,
    icon: Icon,
    href,
    accent,
}: {
    label: string;
    value: string | number;
    icon: React.ElementType;
    href: string;
    accent: string;
}) {
    return (
        <Link
            href={href}
            className="group flex flex-col gap-4 rounded-xl border border-sidebar-border/70 bg-card p-5 transition-shadow hover:shadow-md dark:border-sidebar-border"
        >
            <div className="flex items-start justify-between">
                <div className={`rounded-lg p-2 ${accent}`}>
                    <Icon className="size-5 text-white" />
                </div>
                <ArrowRight className="size-4 text-[#1a2171] opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-0.5 text-2xl font-bold tracking-tight">
                    {value}
                </p>
            </div>
        </Link>
    );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
    return (
        <div className="flex items-center justify-between border-l-4 border-[#1a2171] pl-3">
            <h2 className="font-semibold">{title}</h2>
            <Link
                href={href}
                className="flex items-center gap-1 text-sm text-[#1a2171] hover:underline"
            >
                View all <ArrowRight className="size-3.5" />
            </Link>
        </div>
    );
}

export default function Dashboard({
    stats,
    recentOrders,
    recentWishlistItems,
    recentReturns,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Stat cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        label="Total Orders"
                        value={stats.totalOrders}
                        icon={ShoppingBag}
                        href={ordersIndex().url}
                        accent="bg-[#1a2171]"
                    />
                    <StatCard
                        label="Total Spent"
                        value={`$${stats.totalSpent}`}
                        icon={DollarSign}
                        href={ordersIndex().url}
                        accent="bg-emerald-500"
                    />
                    <StatCard
                        label="Wishlist Items"
                        value={stats.wishlistCount}
                        icon={Heart}
                        href={wishlistIndex().url}
                        accent="bg-rose-500"
                    />
                    <StatCard
                        label="Pending Returns"
                        value={stats.pendingReturns}
                        icon={RotateCcw}
                        href={returnsIndex().url}
                        accent="bg-amber-500"
                    />
                </div>

                {/* Recent Orders */}
                <div className="flex flex-col gap-3">
                    <SectionHeader
                        title="Recent Orders"
                        href={ordersIndex().url}
                    />
                    <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 bg-muted/50 text-left dark:border-sidebar-border">
                                    <th className="px-4 py-3 font-semibold">
                                        Order #
                                    </th>
                                    <th className="px-4 py-3 font-semibold">
                                        Items
                                    </th>
                                    <th className="px-4 py-3 font-semibold">
                                        Total
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
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-8 text-center text-sm text-muted-foreground"
                                        >
                                            No orders yet.
                                        </td>
                                    </tr>
                                )}
                                {recentOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-sidebar-border/70 transition-colors last:border-0 hover:bg-muted/30 dark:border-sidebar-border"
                                    >
                                        <td className="px-4 py-3 font-mono font-medium">
                                            {order.order_number}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {order.items.length} item
                                            {order.items.length !== 1
                                                ? 's'
                                                : ''}
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            ${order.total}
                                        </td>
                                        <td className="px-4 py-3">
                                            <OrderStatusBadge status={order.status} />
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link
                                                href={ordersShow(order.id).url}
                                                className="text-sm font-medium text-[#1a2171] hover:underline"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Wishlist Snapshot */}
                    <div className="flex flex-col gap-3">
                        <SectionHeader
                            title="Wishlist"
                            href={wishlistIndex().url}
                        />
                        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-sidebar-border/70 bg-muted/50 text-left dark:border-sidebar-border">
                                        <th className="px-4 py-3 font-semibold">
                                            Product
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            Price
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            Stock
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentWishlistItems.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                Your wishlist is empty.
                                            </td>
                                        </tr>
                                    )}
                                    {recentWishlistItems.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border"
                                        >
                                            <td className="flex items-center gap-2 px-4 py-3 font-medium">
                                                <Package className="size-4 shrink-0 text-muted-foreground" />
                                                <span className="truncate">
                                                    {item.product_name}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
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
                                                        : 'Out'}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Returns Snapshot */}
                    <div className="flex flex-col gap-3">
                        <SectionHeader
                            title="Returns & Refunds"
                            href={returnsIndex().url}
                        />
                        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-sidebar-border/70 bg-muted/50 text-left dark:border-sidebar-border">
                                        <th className="px-4 py-3 font-semibold">
                                            Reference
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            Type
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 font-semibold">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentReturns.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No return requests.
                                            </td>
                                        </tr>
                                    )}
                                    {recentReturns.map((req) => (
                                        <tr
                                            key={req.id}
                                            className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border"
                                        >
                                            <td className="px-4 py-3 font-mono font-medium">
                                                {req.return_number}
                                            </td>
                                            <td className="px-4 py-3 capitalize">
                                                {req.type}
                                            </td>
                                            <td className="px-4 py-3">
                                                <ReturnStatusBadge status={req.status} />
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {new Date(
                                                    req.created_at,
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
