import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ImagePlaceholder from '@/components/image-placeholder';
import PublicFooter from '@/components/public-footer';
import PublicNav from '@/components/public-nav';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import WishlistButton from '@/components/wishlist-button';
import { contact } from '@/routes';
import { products as productsRoute } from '@/routes';
import { store as checkoutStore } from '@/routes/checkout';
import { guest as checkoutGuest } from '@/routes/checkout';
import type { Auth } from '@/types';

interface ProductImage {
    id: number;
    url: string;
    alt_text: string | null;
    is_primary: boolean;
    sort_order: number;
}

interface ProductSize {
    id: number;
    name: string;
    stock_quantity: number;
    is_available: boolean;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    sku: string;
    price: string;
    sale_price: string | null;
    is_featured: boolean;
    images: ProductImage[];
    sizes: ProductSize[];
    category: { name: string } | null;
}

interface Props {
    product: Product;
}

function GalleryImage({ src, alt }: { src: string | null; alt: string }) {
    const [errored, setErrored] = useState(false);

    if (!src || errored) {
        return <ImagePlaceholder className="h-full w-full" />;
    }
    return (
        <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setErrored(true)}
        />
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid gap-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

const inputCls =
    'w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#1a2171] focus:outline-none focus:ring-1 focus:ring-[#1a2171]';

export default function ProductShow({ product }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const user = auth?.user ?? null;

    const images = product.images;
    const primaryImage = images.find((i) => i.is_primary) ?? images[0] ?? null;

    const [activeIdx, setActiveIdx] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);

    const active = images[activeIdx] ?? primaryImage;
    const activeSrc = active?.url ?? null;
    const hasMultiple = images.length > 1;

    function prevImage() {
        setActiveIdx((i) => (i - 1 + images.length) % images.length);
    }
    function nextImage() {
        setActiveIdx((i) => (i + 1) % images.length);
    }

    const effectivePrice = product.sale_price ?? product.price;

    // ── Logged-in order form ──────────────────────────────────────────────
    const orderForm = useForm({
        product_id: product.id,
        size_id: null as number | null,
        quantity: 1,
        shipping_address: user?.shipping_address ?? '',
        shipping_city: user?.shipping_city ?? '',
        shipping_country: user?.shipping_country ?? '',
    });

    // ── Guest checkout form ───────────────────────────────────────────────
    const guestForm = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        product_id: product.id,
        size_id: null as number | null,
        quantity: 1,
        shipping_address: '',
        shipping_city: '',
        shipping_country: '',
    });

    function openModal() {
        orderForm.setData({
            product_id: product.id,
            size_id: selectedSize,
            quantity,
            shipping_address: (user?.shipping_address as string) ?? '',
            shipping_city: (user?.shipping_city as string) ?? '',
            shipping_country: (user?.shipping_country as string) ?? '',
        });
        guestForm.setData('product_id', product.id);
        guestForm.setData('size_id', selectedSize);
        guestForm.setData('quantity', quantity);
        setOpen(true);
    }

    function submitOrder(e: React.FormEvent) {
        e.preventDefault();
        orderForm.post(checkoutStore.url(), {
            onSuccess: () => setOpen(false),
        });
    }

    function submitGuest(e: React.FormEvent) {
        e.preventDefault();
        guestForm.post(checkoutGuest.url(), {
            onSuccess: () => setOpen(false),
        });
    }

    return (
        <>
            <Head title={product.name} />
            <div className="flex min-h-screen flex-col bg-gray-50 text-[#1b1b18]">
                <PublicNav />

                <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                        <Link
                            href={productsRoute.url()}
                            className="hover:text-[#1a2171] hover:underline"
                        >
                            Products
                        </Link>
                        <span>/</span>
                        {product.category && (
                            <>
                                <span>{product.category.name}</span>
                                <span>/</span>
                            </>
                        )}
                        <span className="font-medium text-[#1a2171]">
                            {product.name}
                        </span>
                    </nav>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                        {/* ── Image Carousel ── */}
                        <div className="flex flex-col gap-3">
                            {/* Main image + arrows */}
                            <div className="group relative aspect-square w-full overflow-hidden rounded-sm border border-gray-200 bg-white">
                                <GalleryImage src={activeSrc} alt={active?.alt_text ?? product.name} />

                                {hasMultiple && (
                                    <>
                                        {/* Prev */}
                                        <button
                                            onClick={prevImage}
                                            aria-label="Previous image"
                                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
                                        >
                                            <svg className="h-5 w-5 text-[#1a2171]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        {/* Next */}
                                        <button
                                            onClick={nextImage}
                                            aria-label="Next image"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
                                        >
                                            <svg className="h-5 w-5 text-[#1a2171]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        {/* Counter */}
                                        <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white">
                                            {activeIdx + 1} / {images.length}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail strip */}
                            {hasMultiple && (
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {images.map((img, idx) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setActiveIdx(idx)}
                                            className={`h-16 w-16 shrink-0 overflow-hidden rounded-sm border-2 transition-colors ${
                                                activeIdx === idx
                                                    ? 'border-[#1a2171]'
                                                    : 'border-gray-200 hover:border-[#1a2171]'
                                            }`}
                                        >
                                            <img
                                                src={img.url}
                                                alt={img.alt_text ?? product.name}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {images.length === 0 && (
                                <p className="text-sm italic text-gray-400">
                                    No images attached to this product.
                                </p>
                            )}
                        </div>

                        {/* ── Product Info ── */}
                        <div className="flex flex-col gap-6">
                            {product.category && (
                                <span className="w-fit rounded bg-gray-100 px-2 py-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
                                    {product.category.name}
                                </span>
                            )}

                            <h1 className="text-2xl font-extrabold text-[#1a2171] sm:text-3xl">
                                {product.name}
                            </h1>

                            <p className="text-xs text-gray-400">
                                SKU: {product.sku}
                            </p>

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                {product.sale_price ? (
                                    <>
                                        <span className="text-2xl font-bold text-[#1a2171]">
                                            ${product.sale_price}
                                        </span>
                                        <span className="text-base text-gray-400 line-through">
                                            ${product.price}
                                        </span>
                                        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                                            Sale
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold text-[#1a2171]">
                                        ${product.price}
                                    </span>
                                )}
                            </div>

                            {/* Sizes */}
                            {product.sizes.length > 0 && (
                                <div>
                                    <h2 className="mb-2 text-sm font-semibold text-gray-700">
                                        Select Size
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size.id}
                                                disabled={!size.is_available}
                                                onClick={() =>
                                                    setSelectedSize(
                                                        size.id === selectedSize
                                                            ? null
                                                            : size.id,
                                                    )
                                                }
                                                className={`rounded border px-3 py-1 text-sm font-medium transition-colors ${
                                                    !size.is_available
                                                        ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400 line-through'
                                                        : selectedSize ===
                                                            size.id
                                                          ? 'border-[#1a2171] bg-[#1a2171] text-white'
                                                          : 'border-[#1a2171] bg-white text-[#1a2171] hover:bg-[#1a2171] hover:text-white'
                                                }`}
                                                title={
                                                    size.is_available
                                                        ? undefined
                                                        : 'Out of stock'
                                                }
                                            >
                                                {size.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div>
                                <h2 className="mb-2 text-sm font-semibold text-gray-700">
                                    Quantity
                                </h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            setQuantity(
                                                Math.max(1, quantity - 1),
                                            )
                                        }
                                        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-600 hover:border-[#1a2171] hover:text-[#1a2171]"
                                    >
                                        −
                                    </button>
                                    <span className="w-10 text-center text-sm font-semibold">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setQuantity(
                                                Math.min(100, quantity + 1),
                                            )
                                        }
                                        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-600 hover:border-[#1a2171] hover:text-[#1a2171]"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div>
                                    <h2 className="mb-2 text-sm font-semibold text-gray-700">
                                        Description
                                    </h2>
                                    <div
                                        className="prose prose-sm max-w-none text-gray-600 [&_a]:text-[#1a2171] [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5"
                                        dangerouslySetInnerHTML={{
                                            __html: product.description,
                                        }}
                                    />
                                </div>
                            )}

                            {/* CTA */}
                            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                                <button
                                    onClick={openModal}
                                    className="flex-1 rounded bg-[#1a2171] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#f5c518] hover:text-[#1a2171]"
                                >
                                    Place Order
                                </button>
                                <WishlistButton
                                    productId={product.id}
                                    showLabel
                                    className="flex-1 justify-center rounded border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-600 transition-colors hover:border-red-400 hover:text-red-500"
                                />
                                <a
                                    href={contact.url()}
                                    className="flex-1 rounded border border-[#1a2171] px-6 py-3 text-center text-sm font-semibold text-[#1a2171] transition-colors hover:bg-[#1a2171] hover:text-white"
                                >
                                    Send Inquiry
                                </a>
                                <Link
                                    href={productsRoute.url()}
                                    className="flex-1 rounded border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
                                >
                                    ← Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                <PublicFooter />
            </div>

            {/* ── Order Modal ── */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {user
                                ? 'Complete Your Order'
                                : 'Create Account & Order'}
                        </DialogTitle>
                    </DialogHeader>

                    {/* Order summary */}
                    <div className="mb-4 rounded bg-gray-50 p-3 text-sm">
                        <p className="font-semibold text-[#1a2171]">
                            {product.name}
                        </p>
                        <p className="text-gray-500">
                            Qty: {quantity}
                            {selectedSize &&
                            product.sizes.find((s) => s.id === selectedSize)
                                ? ` · Size: ${product.sizes.find((s) => s.id === selectedSize)!.name}`
                                : ''}
                        </p>
                        <p className="mt-1 font-bold text-[#1a2171]">
                            Total: $
                            {(parseFloat(effectivePrice) * quantity).toFixed(2)}
                        </p>
                    </div>

                    {/* Logged-in form */}
                    {user && (
                        <form onSubmit={submitOrder} className="space-y-4">
                            <Field
                                label="Shipping Address"
                                error={orderForm.errors.shipping_address}
                            >
                                <input
                                    className={inputCls}
                                    value={
                                        orderForm.data
                                            .shipping_address as string
                                    }
                                    onChange={(e) =>
                                        orderForm.setData(
                                            'shipping_address',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="123 Main St"
                                    required
                                />
                            </Field>
                            <div className="grid grid-cols-2 gap-3">
                                <Field
                                    label="City"
                                    error={orderForm.errors.shipping_city}
                                >
                                    <input
                                        className={inputCls}
                                        value={
                                            orderForm.data
                                                .shipping_city as string
                                        }
                                        onChange={(e) =>
                                            orderForm.setData(
                                                'shipping_city',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </Field>
                                <Field
                                    label="Country"
                                    error={orderForm.errors.shipping_country}
                                >
                                    <input
                                        className={inputCls}
                                        value={
                                            orderForm.data
                                                .shipping_country as string
                                        }
                                        onChange={(e) =>
                                            orderForm.setData(
                                                'shipping_country',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </Field>
                            </div>
                            <button
                                type="submit"
                                disabled={orderForm.processing}
                                className="w-full rounded bg-[#1a2171] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#f5c518] hover:text-[#1a2171] disabled:opacity-60"
                            >
                                {orderForm.processing
                                    ? 'Placing order…'
                                    : 'Confirm Order'}
                            </button>
                        </form>
                    )}

                    {/* Guest form */}
                    {!user && (
                        <form onSubmit={submitGuest} className="space-y-4">
                            <p className="text-xs text-gray-500">
                                Already have an account?{' '}
                                <a
                                    href="/login"
                                    className="text-[#1a2171] underline"
                                >
                                    Sign in
                                </a>
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <Field
                                    label="Full Name"
                                    error={guestForm.errors.name}
                                >
                                    <input
                                        className={inputCls}
                                        value={guestForm.data.name}
                                        onChange={(e) =>
                                            guestForm.setData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </Field>
                                <Field
                                    label="Phone (optional)"
                                    error={guestForm.errors.phone}
                                >
                                    <input
                                        className={inputCls}
                                        value={guestForm.data.phone}
                                        onChange={(e) =>
                                            guestForm.setData(
                                                'phone',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </Field>
                            </div>
                            <Field label="Email" error={guestForm.errors.email}>
                                <input
                                    type="email"
                                    className={inputCls}
                                    value={guestForm.data.email}
                                    onChange={(e) =>
                                        guestForm.setData(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                            </Field>
                            <div className="grid grid-cols-2 gap-3">
                                <Field
                                    label="Password"
                                    error={guestForm.errors.password}
                                >
                                    <input
                                        type="password"
                                        className={inputCls}
                                        value={guestForm.data.password}
                                        onChange={(e) =>
                                            guestForm.setData(
                                                'password',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        minLength={8}
                                    />
                                </Field>
                                <Field label="Confirm Password">
                                    <input
                                        type="password"
                                        className={inputCls}
                                        value={
                                            guestForm.data.password_confirmation
                                        }
                                        onChange={(e) =>
                                            guestForm.setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </Field>
                            </div>
                            <hr className="border-gray-200" />
                            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                Shipping Details
                            </p>
                            <Field
                                label="Shipping Address"
                                error={guestForm.errors.shipping_address}
                            >
                                <input
                                    className={inputCls}
                                    value={guestForm.data.shipping_address}
                                    onChange={(e) =>
                                        guestForm.setData(
                                            'shipping_address',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                            </Field>
                            <div className="grid grid-cols-2 gap-3">
                                <Field
                                    label="City"
                                    error={guestForm.errors.shipping_city}
                                >
                                    <input
                                        className={inputCls}
                                        value={guestForm.data.shipping_city}
                                        onChange={(e) =>
                                            guestForm.setData(
                                                'shipping_city',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </Field>
                                <Field
                                    label="Country"
                                    error={guestForm.errors.shipping_country}
                                >
                                    <input
                                        className={inputCls}
                                        value={guestForm.data.shipping_country}
                                        onChange={(e) =>
                                            guestForm.setData(
                                                'shipping_country',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </Field>
                            </div>
                            <button
                                type="submit"
                                disabled={guestForm.processing}
                                className="w-full rounded bg-[#1a2171] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#f5c518] hover:text-[#1a2171] disabled:opacity-60"
                            >
                                {guestForm.processing
                                    ? 'Creating account & placing order…'
                                    : 'Create Account & Place Order'}
                            </button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

interface ProductImage {
    id: number;
    url: string;
    alt_text: string | null;
    is_primary: boolean;
    sort_order: number;
}

interface ProductSize {
    id: number;
    name: string;
    stock_quantity: number;
    is_available: boolean;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    sku: string;
    price: string;
    sale_price: string | null;
    is_featured: boolean;
    images: ProductImage[];
    sizes: ProductSize[];
    category: { name: string } | null;
}

interface Props {
    product: Product;
}
