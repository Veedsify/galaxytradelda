import { Head } from '@inertiajs/react';
import PublicFooter from '@/components/public-footer';
import PublicNav from '@/components/public-nav';
import { home } from '@/routes';

const pdfs = [
    {
        path: '/certificates/prime-1.pdf',
        title: 'Company Certificate — Document 1',
        filename: 'prime-1.pdf',
    },
    {
        path: '/certificates/prime-2.pdf',
        title: 'Company Certificate — Document 2',
        filename: 'prime-2.pdf',
    },
];

function PdfEmbed({
    path,
    title,
}: {
    path: string;
    title: string;
    filename: string;
}) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between bg-[#1a2171] px-6 py-4">
                <div className="flex items-center gap-3">
                    <span className="text-xl text-white">📄</span>
                    <h3 className="font-bold text-white">{title}</h3>
                </div>
            </div>

            {/* Embed */}
            <div
                className="relative w-full bg-gray-100"
                style={{ height: '780px' }}
            >
                <object
                    data={path}
                    type="application/pdf"
                    className="h-full w-full"
                >
                    {/* Browser fallback */}
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                        <svg
                            className="h-16 w-16 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <p className="text-sm text-gray-400">
                            PDF preview not available in your browser.
                        </p>
                        <a
                            href={path}
                            className="rounded-lg bg-[#1a2171] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#f5c518] hover:text-[#1a2171]"
                        >
                            Open / Download Certificate
                        </a>
                    </div>
                </object>
            </div>

            {/* Footer hint */}
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
                <p className="text-center text-xs text-gray-400">
                    Place the file at{' '}
                    <code className="rounded bg-gray-200 px-1 py-0.5 text-gray-600">
                        public{path}
                    </code>
                </p>
            </div>
        </div>
    );
}

export default function Certificate() {
    return (
        <>
            <Head title="Company Certificate" />
            <div className="flex min-h-screen flex-col bg-white text-[#1b1b18]">
                <PublicNav />

                {/* Hero Banner */}
                <div className="relative h-56 w-full overflow-hidden md:h-72">
                    <img
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=600&fit=crop"
                        alt="Company Certificate"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#1a2171]/70" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className="text-4xl font-bold text-white md:text-5xl">
                            Company Certificate
                        </h1>
                        <nav className="mt-3 flex items-center gap-2 text-sm text-white/80">
                            <a
                                href={home.url()}
                                className="transition-colors hover:text-[#f5c518]"
                            >
                                Home
                            </a>
                            <span>›</span>
                            <span className="text-[#f5c518]">
                                Company Certificate
                            </span>
                        </nav>
                    </div>
                </div>

                <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-14">
                    {/* Intro */}
                    <div className="mb-10 text-center">
                        <h2 className="mb-3 text-2xl font-bold text-[#1a2171]">
                            Our Certifications & Credentials
                        </h2>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500">
                            Galaxy Trade LDA holds all necessary certifications
                            to operate as a compliant, trustworthy, and
                            internationally recognized trading company. Our
                            credentials reflect our commitment to quality,
                            transparency, and ethical business practices.
                        </p>
                    </div>

                    {/* PDF Embeds */}
                    <div className="flex flex-col gap-10">
                        {pdfs.map((pdf) => (
                            <PdfEmbed
                                key={pdf.path}
                                path={pdf.path}
                                title={pdf.title}
                                filename={pdf.filename}
                            />
                        ))}
                    </div>
                </main>

                <PublicFooter />
            </div>
        </>
    );
}
