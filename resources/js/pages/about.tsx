import { Head } from '@inertiajs/react';
import PublicNav from '@/components/public-nav';
import PublicFooter from '@/components/public-footer';
import { home, about } from '@/routes';

const coreValues = [
    { title: 'Integrity', desc: 'We believe in honesty, transparency, and ethical business practices. Our commitment to integrity is the foundation of our relationships with suppliers, clients, and partners.' },
    { title: 'Quality Assurance', desc: 'We prioritize quality in every product we trade, ensuring that all goods meet international standards and customer expectations.' },
    { title: 'Customer Satisfaction', desc: 'Our clients are at the heart of our business. We strive to provide personalized services, timely deliveries, and cost-effective solutions to meet their unique needs.' },
    { title: 'Innovation and Adaptability', desc: 'In an ever-changing market, we continuously evolve by embracing new technologies, improving our processes, and staying ahead of industry trends.' },
    { title: 'Sustainability', desc: 'We are committed to responsible sourcing, minimizing our environmental footprint, and promoting sustainable trade practices.' },
];

const availableProducts = [
    'Beverages & Dairy',
    'Agricultural & Food Products',
    'Frozen & Seafood',
    'Livestock & Animal Feed',
    'Edible Oils & Fats',
    'Scrap & Recycling',
    'Machinery & Vehicles',
    'Wood & Biomass',
    'Electronics & Accessories',
    'Industrial & Miscellaneous',
    'Household & Baby Products',
];

const whyChooseReasons = [
    { title: 'Global Network & Reliable Supply Chain', desc: 'We have established strong partnerships across various markets, allowing us to provide an uninterrupted supply of high-demand products. Our logistics and supply chain expertise ensure smooth operations, timely deliveries, and cost-effective solutions for our clients.' },
    { title: 'Commitment to Quality', desc: 'We adhere to strict quality control measures, ensuring that every product meets industry standards and customer requirements. Our sourcing process includes rigorous inspections, certifications, and compliance checks to guarantee excellence.' },
    { title: 'Competitive Pricing', desc: 'By leveraging our vast network and long-term supplier relationships, we negotiate the best deals, passing on cost savings to our customers. Our competitive pricing strategy ensures that businesses get the highest value for their investments.' },
    { title: 'Customer-Centric Approach', desc: 'We prioritize customer satisfaction, offering personalized solutions tailored to specific business needs. Our dedicated team is always available to provide support, guidance, and expert advice to help clients make informed purchasing decisions.' },
    { title: 'Sustainable & Ethical Trade Practices', desc: 'We are deeply committed to responsible business practices. From ethical sourcing to environmentally friendly packaging and sustainable supply chain management, we take conscious steps to reduce our carbon footprint and promote sustainable growth.' },
];

export default function About() {
    return (
        <>
            <Head title="About Us" />
            <div className="flex min-h-screen flex-col bg-white text-[#1b1b18]">
                <PublicNav />

                {/* Hero Banner */}
                <div className="relative h-56 w-full overflow-hidden md:h-72">
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=600&fit=crop"
                        alt="About Us"
                        className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[#1a2171]/70" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className="text-4xl font-bold text-white md:text-5xl">About Us</h1>
                        <nav className="mt-3 flex items-center gap-2 text-sm text-white/80">
                            <a href={home.url()} className="hover:text-[#f5c518] transition-colors">Home</a>
                            <span>›</span>
                            <a href={about.url()} className="text-[#f5c518]">About Us</a>
                        </nav>
                    </div>
                </div>

                <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-14">

                    {/* Why Choose Us */}
                    <section className="mb-10">
                        <h2 className="mb-4 text-lg font-bold text-[#4a90d9]">Why Choose Us</h2>
                        <p className="text-sm leading-relaxed text-gray-700">
                            At <strong>Galaxy Trade LDA</strong>, we take immense pride in being a dynamic and globally recognized trading company. With a well-established presence in <strong>Portugal</strong> and a strategic head office in <strong>Turkey</strong>, we specialize in providing high-quality products across multiple industries. Our extensive reach, unwavering commitment to excellence, and ability to meet the ever-evolving demands of international markets have set us apart as a trusted partner in global trade.
                        </p>
                    </section>

                    {/* Who We Are */}
                    <section className="mb-10">
                        <h2 className="mb-4 text-xl font-bold text-gray-900">Who We Are</h2>
                        <p className="mb-4 text-sm leading-relaxed text-gray-700">
                            Galaxy Trade LDA is a company built on a foundation of trust, integrity, and innovation. We are dedicated to facilitating seamless trade by bridging the gap between manufacturers and buyers worldwide. Our team of experts possesses vast experience in global sourcing, supply chain management, and international trade regulations, ensuring that we provide our customers with superior products and services.
                        </p>
                        <p className="text-sm leading-relaxed text-gray-700">
                            With years of expertise and a keen understanding of market trends, we have cultivated strong relationships with suppliers and manufacturers across various industries. This allows us to offer high-quality goods at competitive prices, backed by reliable logistics and efficient distribution networks.
                        </p>
                    </section>

                    {/* Our Mission */}
                    <section className="mb-10">
                        <h2 className="mb-3 text-xl font-bold text-[#1a2171]">Our Mission</h2>
                        <p className="text-sm leading-relaxed text-gray-700">
                            Our mission is simple yet impactful: to become the preferred trading partner for businesses worldwide by providing exceptional products, unmatched service, and sustainable solutions. We aim to facilitate seamless commerce, ensuring that our clients receive only the best, whether they are sourcing raw materials, industrial products, or consumer goods.
                        </p>
                    </section>

                    {/* Our Vision */}
                    <section className="mb-10">
                        <h2 className="mb-3 text-xl font-bold text-[#1a2171]">Our Vision</h2>
                        <p className="text-sm leading-relaxed text-gray-700">
                            We envision a world where businesses can access high-quality products with ease, fostering economic growth and development across industries. By continuously expanding our network, investing in technology, and maintaining the highest ethical standards, we aspire to redefine global trade and become a leader in the industry.
                        </p>
                    </section>

                    {/* Our Core Values */}
                    <section className="mb-10">
                        <h2 className="mb-3 text-xl font-bold text-[#1a2171]">Our Core Values</h2>
                        <p className="mb-4 text-sm leading-relaxed text-gray-700">
                            At <strong>Galaxy Trade LDA</strong>, we uphold a set of core values that guide our operations and business philosophy:
                        </p>
                        <ul className="flex flex-col gap-3">
                            {coreValues.map((v) => (
                                <li key={v.title} className="flex items-start gap-3 text-sm text-gray-700">
                                    <span className="mt-0.5 shrink-0 font-bold text-[#1a2171]">✓</span>
                                    <span><strong>{v.title}:</strong> {v.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Our Available Product */}
                    <section className="mb-10">
                        <h2 className="mb-3 text-xl font-bold text-[#1a2171]">Our Available Product</h2>
                        <p className="mb-4 text-sm leading-relaxed text-gray-700">
                            Galaxy Trade LDA operates across multiple industries, supplying a diverse range of high-quality products to businesses worldwide. Our extensive portfolio covers:
                        </p>
                        <ul className="mb-4 flex flex-col gap-2">
                            {availableProducts.map((p) => (
                                <li key={p} className="flex items-center gap-3 text-sm text-gray-700">
                                    <span className="shrink-0 font-bold text-[#1a2171]">✓</span>
                                    {p}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm leading-relaxed text-gray-700">
                            Through strategic partnerships with manufacturers, suppliers, and logistics providers, we ensure that our clients receive premium-quality goods, competitive pricing, and efficient service.
                        </p>
                    </section>

                    {/* Why Choose Galaxy Trade LDA */}
                    <section className="mb-10">
                        <h2 className="mb-4 text-xl font-bold text-[#1a2171]">Why Choose Galaxy Trade LDA?</h2>
                        <ol className="flex flex-col gap-5">
                            {whyChooseReasons.map((r, i) => (
                                <li key={r.title} className="flex items-start gap-3 text-sm text-gray-700">
                                    <span className="shrink-0 font-semibold text-gray-900">{i + 1}.</span>
                                    <span><strong>{r.title}</strong> {r.desc}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Contact Info Card */}
                    <section className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-sm text-gray-700">
                        <p className="mb-4 font-semibold text-gray-900">
                            Galaxy Trade LDA — Your Trusted Partner in Global Trade
                        </p>
                        <ul className="flex flex-col gap-3">
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span><strong>Head Office :</strong> Konya, Turkey</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span><strong>Portugal Address:</strong> EDIFICIO PASCO BLOCO 4 1 ANDAR - ZONA INDUSTRIAL DE BARRO BARRO, 3750-353 BARRO AGD</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>✉</span>
                                <span><strong>Email:</strong> <a href="mailto:info@galaxytradelda.com" className="text-[#1a2171] hover:underline">info@galaxytradelda.com</a></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <span><strong>Phone & WhatsApp:</strong> Call: <a href="tel:+351967054585" className="text-[#1a2171] hover:underline">+351967054585</a> &amp; WhatsApp: <a href="https://wa.me/351963978321" className="text-[#1a2171] hover:underline">+351963978321</a></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>🌐</span>
                                <span><strong>Website:</strong> <a href="https://galaxytradelda.com" className="text-[#1a2171] hover:underline">https://galaxytradelda.com</a></span>
                            </li>
                        </ul>
                    </section>
                </main>

                <PublicFooter />
            </div>
        </>
    );
}
