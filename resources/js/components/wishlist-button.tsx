import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { store as wishlistStore } from '@/routes/wishlist';
import type { Auth } from '@/types';

interface Props {
    productId: number;
    className?: string;
    showLabel?: boolean;
}

function HeartOutline() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}

function HeartFilled() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}

export default function WishlistButton({ productId, className = '', showLabel = false }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (!auth?.user) {
            router.visit('/login');
            return;
        }

        if (saved || loading) return;

        setLoading(true);
        router.post(
            wishlistStore.url(),
            { product_id: productId },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSaved(true);
                    setLoading(false);
                },
                onError: () => setLoading(false),
            },
        );
    }

    return (
        <button
            onClick={handleClick}
            title={saved ? 'Saved to wishlist' : 'Save to wishlist'}
            disabled={loading}
            className={`flex items-center gap-1 rounded transition-colors disabled:opacity-50 ${
                saved
                    ? 'text-red-500'
                    : 'text-gray-400 hover:text-red-500'
            } ${className}`}
        >
            {saved ? <HeartFilled /> : <HeartOutline />}
            {showLabel && (
                <span className="text-sm font-semibold">
                    {saved ? 'Saved' : 'Wishlist'}
                </span>
            )}
        </button>
    );
}
