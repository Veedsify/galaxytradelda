<?php

namespace App\Http\Middleware;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'quickLinks' => $this->getQuickLinks(),
        ];
    }

    /**
     * Top 7 active categories ordered by product count, cached hourly using the file store.
     *
     * @return array<int, array{name: string, slug: string}>
     */
    private function getQuickLinks(): array
    {
        return Cache::store('file')->remember('footer_quick_links', now()->addHour(), function () {
            return Category::query()
                ->where('is_active', true)
                ->withCount(['products' => fn ($q) => $q->where('is_active', true)])
                ->orderByDesc('products_count')
                ->limit(7)
                ->get(['id', 'name', 'slug'])
                ->map(fn ($c) => ['name' => $c->name, 'slug' => $c->slug])
                ->all();
        });
    }
}
