import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    home,
    about,
    products,
    certificate,
    contact,
    dashboard,
} from '@/routes';

const navLinks = [
    { label: 'Home', url: home.url() },
    { label: 'About Us', url: about.url() },
    { label: 'Available Products', url: products.url() },
    { label: 'Company Certificate', url: certificate.url() },
    { label: 'Contact Us', url: contact.url() },
];

export default function PublicNav() {
    const { auth } = usePage().props as { auth: { user: unknown } };
    const current =
        typeof window !== 'undefined' ? window.location.pathname : '';
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full">
            {/* Top info bar */}
            <div className="bg-[#1a2171] px-4 md:px-6">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    {/* Contact info — hidden on very small screens */}
                    <div className="hidden items-center gap-2 py-2 text-sm text-white sm:flex">
                        <svg
                            className="h-4 w-4 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="flex flex-wrap gap-x-1">
                            WhatsApp :{' '}
                            <a
                                href="https://wa.me/351963978321"
                                className="hover:text-[#f5c518]"
                            >
                                +351963978321
                            </a>{' '}
                            | Email Us :{' '}
                            <a
                                href="mailto:info@galaxytradelda.com"
                                className="hover:text-[#f5c518]"
                            >
                                info@galaxytradelda.com
                            </a>
                        </span>
                    </div>

                    {/* On xs: show email only */}
                    <a
                        href="mailto:info@galaxytradelda.com"
                        className="flex items-center gap-1 py-2 text-xs text-white/80 hover:text-[#f5c518] sm:hidden"
                    >
                        <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        info@galaxytradelda.com
                    </a>

                    <Link
                        href={contact.url()}
                        className="flex items-center gap-2 bg-[#f5c518] px-3 py-2 text-xs font-semibold text-[#1a2171] transition-opacity hover:opacity-90 sm:px-4 sm:text-sm"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="hidden sm:inline">Get A Quote</span>
                        <span className="sm:hidden">Quote</span>
                    </Link>
                </div>
            </div>

            {/* Main nav */}
            <div className="border-b-4 border-[#f5c518] bg-white px-4 shadow-sm md:px-6">
                <div className="mx-auto flex max-w-6xl items-center justify-between py-3">
                    {/* Logo */}
                    <Link href={home.url()} className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1a2171] bg-[#1a2171] md:h-12 md:w-12">
                            <svg
                                viewBox="0 0 40 42"
                                className="h-6 w-6 fill-white md:h-7 md:w-7"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M17.2 5.63325L8.6 0.855469L0 5.63325V32.1434L16.2 41.1434L32.4 32.1434V23.699L40 19.4767V9.85547L31.4 5.07769L22.8 9.85547V18.2999L17.2 21.411V5.63325ZM38 18.2999L32.4 21.411V15.2545L38 12.1434V18.2999ZM36.9409 10.4439L31.4 13.5221L25.8591 10.4439L31.4 7.36561L36.9409 10.4439ZM24.8 18.2999V12.1434L30.4 15.2545V21.411L24.8 18.2999ZM23.8 20.0323L29.3409 23.1105L16.2 30.411L10.6591 27.3328L23.8 20.0323ZM7.6 27.9212L15.2 32.1434V38.2999L2 30.9666V7.92116L7.6 11.0323V27.9212ZM8.6 9.29991L3.05913 6.22165L8.6 3.14339L14.1409 6.22165L8.6 9.29991ZM30.4 24.8101L17.2 32.1434V38.2999L30.4 30.9666V24.8101ZM9.6 11.0323L15.2 7.92117V22.5221L9.6 25.6333V11.0323Z"
                                />
                            </svg>
                        </div>
                        <div className="leading-tight">
                            <div className="text-sm font-extrabold tracking-wide text-[#1a2171] md:text-base">
                                GALAXYTR
                            </div>
                            <div className="text-[10px] font-bold tracking-widest text-[#1a2171] md:text-xs">
                                ADELDA
                            </div>
                        </div>
                    </Link>

                    {/* Desktop nav links */}
                    <nav className="hidden items-center gap-6 md:flex">
                        {navLinks.map(({ label, url }) => (
                            <Link
                                key={label}
                                href={url}
                                className={`text-sm font-medium transition-colors ${
                                    current === url
                                        ? 'font-semibold text-[#1a2171]'
                                        : 'text-[#333] hover:text-[#1a2171]'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop right: phone + auth */}
                    <div className="hidden items-center gap-4 md:flex">
                        <a
                            href="tel:+351967054585"
                            className="flex items-center gap-2"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#f5c518]">
                                <svg
                                    className="h-5 w-5 text-[#1a2171]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                    />
                                </svg>
                            </span>
                            <span className="text-sm font-bold text-[#1a2171]">
                                +351967054585
                            </span>
                        </a>
                        <>
                            {auth?.user && (
                                <Link
                                    href={dashboard()}
                                    className="rounded bg-[#1a2171] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#141a5e]"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </>
                    </div>

                    {/* Mobile right: hamburger */}
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        className="flex h-9 w-9 items-center justify-center rounded text-[#1a2171] transition hover:bg-[#1a2171]/10 md:hidden"
                    >
                        {menuOpen ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="border-b border-[#e5e7eb] bg-white shadow-md md:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
                        {navLinks.map(({ label, url }) => (
                            <Link
                                key={label}
                                href={url}
                                onClick={() => setMenuOpen(false)}
                                className={`border-b border-[#f3f4f6] py-3 text-sm font-medium transition-colors last:border-0 ${
                                    current === url
                                        ? 'font-semibold text-[#1a2171]'
                                        : 'text-[#333] hover:text-[#1a2171]'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}

                        {/* Phone in mobile menu */}
                        <a
                            href="tel:+351967054585"
                            className="flex items-center gap-2 border-t border-[#f3f4f6] py-3 text-sm font-bold text-[#1a2171]"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#f5c518]">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                    />
                                </svg>
                            </span>
                            +351967054585
                        </a>

                        <>
                            {auth?.user && (
                                <Link
                                    href={dashboard()}
                                    onClick={() => setMenuOpen(false)}
                                    className="mt-1 mb-2 rounded bg-[#1a2171] px-4 py-2 text-center text-sm font-semibold text-white"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </>
                    </nav>
                </div>
            )}
        </header>
    );
}
