import { useState, useEffect, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { products, contact } from '@/routes';

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&q=80&fit=crop',
        title: 'Premium Spices & Commodities',
        subtitle: 'Sourcing the finest agricultural products from trusted global suppliers.',
        cta: { label: 'View Products', href: products.url() },
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&q=80&fit=crop',
        title: 'Agricultural Goods at Scale',
        subtitle: 'Grains, seeds and agro-commodities delivered to industrial and retail markets.',
        cta: { label: 'View Products', href: products.url() },
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&fit=crop',
        title: 'Building & Construction Materials',
        subtitle: 'High-grade cement, steel and supplies sourced from certified manufacturers.',
        cta: { label: 'View Products', href: products.url() },
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80&fit=crop',
        title: 'Reliable Trade Partnerships',
        subtitle: 'Your trusted partner for cross-border trade across Africa and beyond.',
        cta: { label: 'Get A Quote', href: contact.url() },
    },
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => {
        setCurrent((c) => (c + 1) % slides.length);
    }, []);

    const prev = useCallback(() => {
        setCurrent((c) => (c - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
    }, [next, paused]);

    return (
        <div
            className="relative w-full overflow-hidden"
            style={{ height: 'clamp(320px, 60vh, 600px)' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Slides */}
            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
                >
                    {/* Background image */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                        loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Text content */}
                    <div className="absolute inset-0 flex items-center justify-center px-16 text-center">
                        <div
                            className="transition-all duration-700"
                            style={{
                                opacity: i === current ? 1 : 0,
                                transform: i === current ? 'translateY(0)' : 'translateY(16px)',
                            }}
                        >
                            <h2 className="mb-3 text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
                                {slide.title}
                            </h2>
                            <p className="mb-6 text-base text-white/85 drop-shadow md:text-lg">
                                {slide.subtitle}
                            </p>
                            <Link
                                href={slide.cta.href}
                                className="inline-block bg-[#f5c518] px-7 py-2.5 text-sm font-bold text-[#1a2171] transition-opacity hover:opacity-90"
                            >
                                {slide.cta.label}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Left arrow */}
            <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1a2171] shadow transition hover:bg-white"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* Right arrow */}
            <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1a2171] shadow transition hover:bg-white"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                            i === current
                                ? 'w-6 bg-[#f5c518]'
                                : 'w-2.5 bg-white/60 hover:bg-white'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
