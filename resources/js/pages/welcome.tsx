import { Head } from '@inertiajs/react';
import HeroCarousel from '@/components/hero-carousel';
import ProductsSection from '@/components/products-section';
import PublicFooter from '@/components/public-footer';
import PublicNav from '@/components/public-nav';
import ServicesSection from '@/components/services-section';

interface Product {
    id: number;
    name: string;
    slug: string;
    images: { url: string; alt_text: string | null; is_primary: boolean }[];
    category: { name: string } | null;
}

interface Props {
    featuredProducts: Product[];
}

export default function Welcome({ featuredProducts }: Props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18]">
                <PublicNav />
                <HeroCarousel />
                <ServicesSection />
                <ProductsSection products={featuredProducts} />
                <PublicFooter />
            </div>
        </>
    );
}
