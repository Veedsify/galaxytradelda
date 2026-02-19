<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Product;
use App\Models\ReturnRequest;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected ?string $pollingInterval = '30s';

    protected function getStats(): array
    {
        $totalRevenue = Order::whereIn('status', ['delivered', 'shipped', 'processing'])
            ->sum('total');

        $revenueThisMonth = Order::whereIn('status', ['delivered', 'shipped', 'processing'])
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total');

        $revenueLastMonth = Order::whereIn('status', ['delivered', 'shipped', 'processing'])
            ->whereMonth('created_at', now()->subMonth()->month)
            ->whereYear('created_at', now()->subMonth()->year)
            ->sum('total');

        $revenueTrend = collect(range(5, 0))->map(
            fn ($m) => (int) Order::whereIn('status', ['delivered', 'shipped', 'processing'])
                ->whereMonth('created_at', now()->subMonths($m)->month)
                ->whereYear('created_at', now()->subMonths($m)->year)
                ->sum('total')
        )->values()->all();

        $totalOrders = Order::count();
        $ordersThisMonth = Order::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        $pendingOrders = Order::whereIn('status', ['pending', 'processing'])->count();

        $totalUsers = User::count();
        $newUsersThisMonth = User::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        $activeProducts = Product::where('is_active', true)->count();
        $lowStock = Product::where('is_active', true)->where('stock_quantity', '<=', 5)->count();

        $pendingReturns = ReturnRequest::where('status', 'pending')->count();

        return [
            Stat::make('Total Revenue', '$'.number_format($totalRevenue, 2))
                ->description('$'.number_format($revenueThisMonth, 2).' this month')
                ->descriptionIcon($revenueThisMonth >= $revenueLastMonth ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($revenueThisMonth >= $revenueLastMonth ? 'success' : 'danger')
                ->chart($revenueTrend),

            Stat::make('Total Orders', number_format($totalOrders))
                ->description($ordersThisMonth.' new this month')
                ->descriptionIcon('heroicon-m-shopping-cart')
                ->color('info'),

            Stat::make('Pending Orders', $pendingOrders)
                ->description('awaiting fulfilment')
                ->descriptionIcon('heroicon-m-clock')
                ->color($pendingOrders > 10 ? 'warning' : 'gray'),

            Stat::make('Total Customers', number_format($totalUsers))
                ->description($newUsersThisMonth.' joined this month')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('primary'),

            Stat::make('Active Products', $activeProducts)
                ->description($lowStock.' with low stock (≤5)')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color($lowStock > 0 ? 'warning' : 'success'),

            Stat::make('Pending Returns', $pendingReturns)
                ->description('awaiting review')
                ->descriptionIcon('heroicon-m-arrow-uturn-left')
                ->color($pendingReturns > 0 ? 'danger' : 'success'),
        ];
    }
}
