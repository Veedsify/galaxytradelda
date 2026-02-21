import { Link } from '@inertiajs/react';
import ProductCard from '@/components/product-card';
import { products as productsRoute } from '@/routes';

interface ProductImage {
    url: string;
    alt_text: string | null;
    is_primary: boolean;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    images: ProductImage[];
    category: { name: string } | null;
}

interface Props {
    products: Product[];
}

export default function ProductsSection({ products }: Props) {
    return (
        <section className="w-full bg-gray-50 px-6 py-16">
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-extrabold text-[#1a2171] md:text-4xl">
                        Our Available Products
                    </h2>
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500">
                        We supply a wide range of quality products globally —
                        from industrial raw materials and scrap metals to food
                        commodities and equipment. Send us an inquiry to get
                        started.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            productId={product.id}
                            name={product.name}
                            slug={product.slug}
                            images={product.images}
                            category={product.category?.name}
                        />
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-12 text-center">
                    <Link
                        href={productsRoute.url()}
                        className="inline-block rounded bg-[#1a2171] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#f5c518] hover:text-[#1a2171]"
                    >
                        View All Available Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
