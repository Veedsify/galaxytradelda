import { usePage } from '@inertiajs/react';
import { home, about, products, certificate, contact } from '@/routes';

const navLinks = [
    { label: 'Home', href: home.url() },
    { label: 'About Us', href: about.url() },
    { label: 'Available Products', href: products.url() },
    { label: 'Company Certificate', href: certificate.url() },
    { label: 'Contact Us', href: contact.url() },
];

export default function PublicFooter() {
    const { quickLinks } = usePage().props;
    return (
        <footer className="relative w-full overflow-hidden bg-[#1a2171] text-white">
            {/* Decorative background shapes */}
            <div className="pointer-events-none absolute inset-0">
                <svg
                    className="absolute top-1/2 -left-16 h-72 w-72 -translate-y-1/2 opacity-10"
                    viewBox="0 0 200 200"
                    fill="none"
                >
                    <path
                        d="M100 10 L120 80 L190 100 L120 120 L100 190 L80 120 L10 100 L80 80 Z"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                    <path
                        d="M100 40 L112 80 L152 100 L112 120 L100 160 L88 120 L48 100 L88 80 Z"
                        stroke="white"
                        strokeWidth="1.5"
                        fill="none"
                    />
                </svg>
                <svg
                    className="absolute -right-16 bottom-8 h-64 w-64 opacity-10"
                    viewBox="0 0 200 200"
                    fill="none"
                >
                    <path
                        d="M100 10 L120 80 L190 100 L120 120 L100 190 L80 120 L10 100 L80 80 Z"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                    <path
                        d="M100 40 L112 80 L152 100 L112 120 L100 160 L88 120 L48 100 L88 80 Z"
                        stroke="white"
                        strokeWidth="1.5"
                        fill="none"
                    />
                </svg>
                <svg
                    className="absolute top-4 right-1/4 h-40 w-40 opacity-5"
                    viewBox="0 0 200 200"
                    fill="none"
                >
                    <path
                        d="M100 10 L120 80 L190 100 L120 120 L100 190 L80 120 L10 100 L80 80 Z"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>
            </div>

            {/* Main footer content */}
            <div className="relative mx-auto max-w-6xl px-6 py-14">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* About Us */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            About Us
                        </h3>
                        <p className="text-sm leading-relaxed text-blue-200">
                            <span className="font-bold text-white">
                                Galaxy Trade LDA
                            </span>{' '}
                            is a global trading company committed to delivering
                            high-quality products across multiple industries.
                            With our headquarters in Portugal and a strong
                            operational base in Turkey, we have built a solid
                            reputation as a reliable supplier catering to
                            diverse market needs.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            Services
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="flex items-center gap-2 text-sm text-blue-200 transition-colors duration-200 hover:text-[#f5c518]"
                                    >
                                        <span className="text-xs">›</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {(quickLinks ?? []).map((cat) => (
                                <li key={cat.slug}>
                                    <a
                                        href={`${products.url()}?category=${cat.slug}`}
                                        className="flex items-center gap-2 text-sm text-blue-200 transition-colors duration-200 hover:text-[#f5c518]"
                                    >
                                        <span className="text-xs">›</span>
                                        {cat.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Corporate Office */}
                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            Corporate Office
                        </h3>
                        <ul className="flex flex-col gap-4 text-sm text-blue-200">
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5 shrink-0 text-base">
                                    📱
                                </span>
                                <span>
                                    Head Office : 2. OSB KOcadere Sk No:7, 42002
                                    Selçuklu, Konya, Turkey
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="shrink-0 text-base">📞</span>
                                <a
                                    href="tel:+351963978321"
                                    className="transition-colors duration-200 hover:text-[#f5c518]"
                                >
                                    +351963978321
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="shrink-0 text-base">✉️</span>
                                <a
                                    href="mailto:info@galaxytradelda.com"
                                    className="transition-colors duration-200 hover:text-[#f5c518]"
                                >
                                    info@galaxytradelda.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5 shrink-0 text-base">
                                    🏢
                                </span>
                                <span>
                                    Portugal Address: EDIFICIO PASCO BLOCO 4 1
                                    ANDAR - ZONA INDUSTRIAL DE BARRO BARRO,
                                    3750-353 BARRO AGD
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="relative border-t border-white/10 bg-[#141a5e]">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-6 py-4 sm:flex-row sm:justify-between">
                    <p className="text-xs text-blue-200">
                        ©Copyright 2025 All Rights Reserved By Galaxy Trade LDA
                    </p>
                    <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-blue-200">
                        {navLinks.map((link, i) => (
                            <span
                                key={link.label}
                                className="flex items-center gap-3"
                            >
                                {i > 0 && (
                                    <span className="opacity-40">&#xb7;</span>
                                )}
                                <a
                                    href={link.href}
                                    className="transition-colors duration-200 hover:text-[#f5c518]"
                                >
                                    {link.label}
                                </a>
                            </span>
                        ))}
                    </nav>
                </div>
            </div>

            {/* WhatsApp floating button */}
            <div className="fixed bottom-6 left-4 z-50 flex items-center gap-2 group">
                <a
                    href="https://wa.me/351963978321"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110"
                    aria-label="WhatsApp"
                >
                    <svg
                        className="h-6 w-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </a>
                <span className="opacity-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow transition-opacity duration-300 group-hover:opacity-100">
                    Contact us
                </span>
            </div>
        </footer>
    );
}
