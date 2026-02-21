import { Link } from '@inertiajs/react';
import { useState } from 'react';
import ImagePlaceholder from '@/components/image-placeholder';
import WishlistButton from '@/components/wishlist-button';
import { contact } from '@/routes';
import { show as productsShow } from '@/routes/products';

interface ProductImage {
    url: string;
    alt_text: string | null;
    is_primary: boolean;
}

function getPrimaryImage(images?: ProductImage[] | null): string | null {
    if (!images || images.length === 0) return null;
    return (images.find((i) => i.is_primary) ?? images[0]).url;
}

interface ProductCardProps {
    productId: number;
    name: string;
    slug: string;
    images?: ProductImage[] | null;
    category?: string | null;
    description?: string | null;
    variant?: 'grid' | 'list';
}

/** Parses "Label: text" or "**Label:** text" lines into titled bullet points. */
function DescriptionBullets({ text }: { text: string }) {
    const lines = text
        .split(/\n+/)
        .map((l) => l.trim())
        .filter(Boolean);

    return (
        <ul className="flex flex-col gap-3">
            {lines.map((line, i) => {
                const match = line.match(/^\*{0,2}([^:*]+):\*{0,2}\s*(.+)/);
                if (match) {
                    return (
                        <li key={i}>
                            <p className="text-sm font-bold text-gray-800">{match[1].trim()}:</p>
                            <p className="text-sm leading-relaxed text-gray-600">
                                {match[2].trim()}
                            </p>
                        </li>
                    );
                }
                return (
                    <li key={i} className="text-sm leading-relaxed text-gray-600">
                        {line}
                    </li>
                );
            })}
        </ul>
    );
}

function CardImage({ src, alt, className }: { src: string | null | undefined; alt: string; className: string }) {
    const [errored, setErrored] = useState(false);

    if (!src || errored) {
        return <ImagePlaceholder className={className} />;
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setErrored(true)}
        />
    );
}

export default function ProductCard({
    productId,
    name,
    slug,
    images,
    category,
    description,
    variant = 'grid',
}: ProductCardProps) {
    const src = getPrimaryImage(images);
    const detailUrl = productsShow.url(slug);

    if (variant === 'list') {
        return (
            <div className="flex flex-col overflow-hidden border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                {/* Top: image + content */}
                <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <Link href={detailUrl} data-src={src} className="w-full shrink-0 overflow-hidden sm:w-2/5">
                        <CardImage
                            src={src}
                            alt={name}
                            className="h-full max-h-80 w-full object-cover sm:max-h-none"
                        />
                    </Link>

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-4 p-6">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <Link href={detailUrl}>
                                    <h3 className="text-xl font-bold text-[#1a2171] hover:underline">{name}</h3>
                                </Link>
                                {category && (
                                    <p className="mt-1 text-xs text-gray-400">{category}</p>
                                )}
                            </div>
                            <WishlistButton productId={productId} className="shrink-0 mt-1" />
                        </div>

                        {description ? (
                            <>
                                <p className="text-sm font-semibold text-gray-700">
                                    Why Choose Us:
                                </p>
                                <DescriptionBullets text={description} />
                            </>
                        ) : (
                            <p className="text-sm italic text-gray-400">
                                No description available.
                            </p>
                        )}
                    </div>
                </div>

                {/* Full-width buttons */}
                <div className="flex">
                    <Link
                        href={detailUrl}
                        className="flex-1 border-r border-white/20 bg-[#1a2171] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#141a5e]"
                    >
                        View Details
                    </Link>
                    <a
                        href={contact.url()}
                        className="flex-1 bg-[#1a2171] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#f5c518] hover:text-[#1a2171]"
                    >
                        Send Inquiry
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="group flex flex-col overflow-hidden bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
            <div className="relative aspect-square w-full overflow-hidden">
                <Link
                    href={detailUrl}
                    data-src={src}
                    className="block h-full w-full"
                >
                    <CardImage
                        src={src}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                <WishlistButton
                    productId={productId}
                    className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 shadow hover:bg-white"
                />
            </div>
            <div className="flex flex-col gap-4 p-4">
                <Link href={detailUrl}>
                    <h3 className="text-center text-sm font-semibold text-[#1a2171] hover:underline">
                        {name}
                    </h3>
                </Link>
                <a
                    href={contact.url()}
                    className="block w-full rounded bg-[#1a2171] py-2 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#f5c518] hover:text-[#1a2171]"
                >
                    Send Inquiry
                </a>
            </div>
        </div>
    );
}
