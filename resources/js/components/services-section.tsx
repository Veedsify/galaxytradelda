const steps = [
    {
        title: 'Order Your Product Online',
        description:
            'Provide details such as product name, quantity, destination, and any specific requirements.',
        icon: (
            <svg
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
            >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="9 16 11 18 15 14" />
            </svg>
        ),
    },
    {
        title: 'Get Confirmation',
        description:
            'After reviewing the quotation, confirm your order by providing your company details and shipping address.',
        icon: (
            <svg
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
            >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
    {
        title: 'Delivery Complete',
        description:
            'We will arrange shipment via air, sea, or land transport based on your preference and send tracking details and necessary documents.',
        icon: (
            <svg
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
            >
                <path d="M18 8h2a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                <path d="M2 8h16v9a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
                <circle cx="7" cy="18" r="2" fill="currentColor" stroke="none" />
                <circle cx="15" cy="18" r="2" fill="currentColor" stroke="none" />
                <path d="M5 8V5a1 1 0 011-1h8a1 1 0 011 1v3" />
            </svg>
        ),
    },
];

export default function ServicesSection() {
    return (
        <section className="w-full bg-white px-6 py-16">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
                {steps.map((step) => (
                    <div key={step.title} className="flex flex-col items-center text-center">
                        {/* Tilted navy square icon */}
                        <div className="group mb-8 flex h-28 w-28 rotate-[10deg] items-center justify-center bg-[#1a2171] shadow-lg transition-transform duration-300 ease-in-out hover:rotate-0">
                            <span className="-rotate-[10deg] transition-transform duration-300 ease-in-out group-hover:rotate-0">
                                {step.icon}
                            </span>
                        </div>

                        <h3 className="mb-3 text-lg font-bold text-[#1a2171]">
                            {step.title}
                        </h3>
                        <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
