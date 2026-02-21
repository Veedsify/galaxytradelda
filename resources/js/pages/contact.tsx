import { Head } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import PublicNav from '@/components/public-nav';
import PublicFooter from '@/components/public-footer';
import { home, contact } from '@/routes';

const contactDetails = [
    {
        icon: '📍',
        label: 'Head Office',
        lines: ['2. OSB KOcadere Sk No:7', '42002 Selçuklu, Konya, Turkey'],
    },
    {
        icon: '📍',
        label: 'Portugal Office',
        lines: [
            'EDIFICIO PASCO BLOCO 4 1 ANDAR',
            'ZONA INDUSTRIAL DE BARRO BARRO',
            '3750-353 BARRO AGD',
        ],
    },
    {
        icon: '📞',
        label: 'Phone & WhatsApp',
        lines: ['+351967054585', '+351963978321'],
    },
    {
        icon: '✉️',
        label: 'Email',
        lines: ['info@galaxytradelda.com'],
    },
    {
        icon: '🕐',
        label: 'Business Hours',
        lines: ['Mon – Fri: 8:00 AM – 6:00 PM'],
    },
];

export default function Contact() {
    return (
        <>
            <Head title="Contact Us" />
            <div className="flex min-h-screen flex-col bg-white text-[#1b1b18]">
                <PublicNav />

                {/* Hero Banner */}
                <div className="relative h-56 w-full overflow-hidden md:h-72">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=600&fit=crop"
                        alt="Contact Us"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#1a2171]/70" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className="text-4xl font-bold text-white md:text-5xl">Contact Us</h1>
                        <nav className="mt-3 flex items-center gap-2 text-sm text-white/80">
                            <a href={home.url()} className="transition-colors hover:text-[#f5c518]">Home</a>
                            <span>›</span>
                            <span className="text-[#f5c518]">Contact Us</span>
                        </nav>
                    </div>
                </div>

                <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14">
                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* Contact Info */}
                        <div className="flex flex-col gap-6">
                            <div>
                                <h2 className="mb-1 text-2xl font-bold text-[#1a2171]">Get in Touch</h2>
                                <p className="text-sm leading-relaxed text-gray-500">
                                    Have a question or want to do business with us? Reach out and
                                    our team will get back to you within 24 hours.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {contactDetails.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a2171] text-lg text-white">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#1a2171]">{item.label}</p>
                                            {item.lines.map((line, i) => (
                                                <p key={i} className="text-sm text-gray-600">{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp CTA */}
                            <a
                                href="https://wa.me/351963978321"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                Chat with us on WhatsApp
                            </a>
                        </div>

                        {/* Contact Form */}
                        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                            <h2 className="mb-6 text-2xl font-bold text-[#1a2171]">Send a Message</h2>
                            <Form action={contact.url()} method="post">
                                {({ errors, processing, wasSuccessful }) => (
                                    <div className="flex flex-col gap-5">
                                        {wasSuccessful && (
                                            <div className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                                ✓ Your message has been sent! We'll be in touch soon.
                                            </div>
                                        )}

                                        <div>
                                            <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="name">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#1a2171] focus:ring-2 focus:ring-[#1a2171]/20"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="email">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#1a2171] focus:ring-2 focus:ring-[#1a2171]/20"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="subject">
                                                Subject
                                            </label>
                                            <input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                placeholder="Product inquiry"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#1a2171] focus:ring-2 focus:ring-[#1a2171]/20"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="message">
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                placeholder="Tell us how we can help..."
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#1a2171] focus:ring-2 focus:ring-[#1a2171]/20"
                                            />
                                            {errors.message && (
                                                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full rounded-lg bg-[#1a2171] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#f5c518] hover:text-[#1a2171] disabled:opacity-60"
                                        >
                                            {processing ? 'Sending…' : 'Send Message'}
                                        </button>
                                    </div>
                                )}
                            </Form>
                        </div>

                    </div>
                </main>

                <PublicFooter />
            </div>
        </>
    );
}
