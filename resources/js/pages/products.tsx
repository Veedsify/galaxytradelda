import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import ProductCard from '@/components/product-card';
import PublicFooter from '@/components/public-footer';
import PublicNav from '@/components/public-nav';
import { products as productsRoute } from '@/routes';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_featured: boolean;
    images: { url: string; alt_text: string | null; is_primary: boolean }[];
    category: { name: string } | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    per_page: number;
    links: PaginationLink[];
}

interface Props {
    products: PaginatedProducts;
    sort: string;
}

const sortOptions = [
    { value: 'default', label: 'Default sorting' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
    { value: 'featured', label: 'Featured first' },
    { value: 'newest', label: 'Newest first' },
];

function GridIcon({ active }: { active: boolean }) {
    return (
        <svg className="h-5 w-5" fill={active ? 'white' : 'currentColor'} viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    );
}

function ListIcon({ active }: { active: boolean }) {
    return (
        <svg className="h-5 w-5" fill={active ? 'white' : 'currentColor'} viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="2" rx="1" />
            <rect x="3" y="11" width="18" height="2" rx="1" />
            <rect x="3" y="17" width="18" height="2" rx="1" />
        </svg>
    );
}

export default function Products({ products, sort }: Props) {
    const [view, setView] = useState<'grid' | 'list'>('grid');

    function handleSort(e: React.ChangeEvent<HTMLSelectElement>) {
        router.get(productsRoute.url(), { sort: e.target.value }, { preserveScroll: false });
    }

    return (
        <>
            <Head title="Available Products" />
            <div className="flex min-h-screen flex-col bg-gray-50 text-[#1b1b18]">
                <PublicNav />

                <main className="mx-auto w-full max-w-6xl flex-1 px-2 py-8 sm:px-2">
                    {/* Toolbar */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-gray-200 bg-white px-4 py-3">
                        {/* Sort dropdown */}
                        <select
                            value={sort}
                            onChange={handleSort}
                            className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a2171]"
                        >
                            {sortOptions.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>

                        {/* Result count */}
                        <p className="text-sm text-gray-500">
                            {products.from !== null
                                ? `Showing ${products.from}–${products.to} of ${products.total} results`
                                : `${products.total} products`}
                        </p>

                        {/* View toggle */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setView('grid')}
                                aria-label="Grid view"
                                className={`rounded p-2 transition-colors ${view === 'grid' ? 'bg-[#1a2171] text-white' : 'text-gray-400 hover:text-[#1a2171]'}`}
                            >
                                <GridIcon active={view === 'grid'} />
                            </button>
                            <button
                                onClick={() => setView('list')}
                                aria-label="List view"
                                className={`rounded p-2 transition-colors ${view === 'list' ? 'bg-[#1a2171] text-white' : 'text-gray-400 hover:text-[#1a2171]'}`}
                            >
                                <ListIcon active={view === 'list'} />
                            </button>
                        </div>
                    </div>

                    {/* Empty state */}
                    {products.data.length === 0 && (
                        <div className="py-24 text-center text-gray-400">
                            <p className="text-lg">No products found.</p>
                        </div>
                    )}

                    {/* Grid view */}
                    {view === 'grid' && products.data.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {products.data.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    productId={product.id}
                                    name={product.name}
                                    slug={product.slug}
                                    images={product.images}
                                    category={product.category?.name}
                                    variant="grid"
                                />
                            ))}
                        </div>
                    )}

                    {view === 'list' && products.data.length > 0 && (
                        <div className="flex flex-col gap-4">
                            {products.data.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    productId={product.id}
                                    name={product.name}
                                    slug={product.slug}
                                    images={product.images}
                                    category={product.category?.name}
                                    description={product.description}
                                    variant="list"
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-1">
                            {products.links.map((link, i) => {
                                const label = link.label
                                    .replace('&laquo; Previous', '‹')
                                    .replace('Next &raquo;', '›');

                                if (!link.url) {
                                    return (
                                        <span
                                            key={i}
                                            className="flex h-9 min-w-9 items-center justify-center rounded px-3 text-sm text-gray-300"
                                        >
                                            {label}
                                        </span>
                                    );
                                }

                                return (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`flex h-9 min-w-9 items-center justify-center rounded px-3 text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-[#1a2171] text-white'
                                                : 'border border-gray-200 bg-white text-gray-600 hover:bg-[#1a2171] hover:text-white'
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </main>

                <PublicFooter />
            </div>
        </>
    );
}

