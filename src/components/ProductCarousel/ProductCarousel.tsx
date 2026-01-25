'use client';

import { Product } from '@/types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import { useCarousel } from '@/hooks/useCarousel';

interface ProductCarouselProps {
    products: Product[];
}

export const ProductCarousel = ({ products }: ProductCarouselProps) => {
    const { currentIndex, next, prev } = useCarousel(products.length);

    const getVisibleProducts = () => {
        if (products.length === 0) return [];

        const items = [];
        for (let i = 0; i < 4; i++) {
            items.push(products[(currentIndex + i) % products.length]);
        }
        return items;
    };

    const visibleProducts = getVisibleProducts();

    if (products.length === 0) return null;

    return (
        <div className="my-8">
            <h2 className="text-2xl font-light text-black mb-4">Nejprodávanější</h2>

            <div className="bg-secondary p-4 flex items-center gap-4">
                {/* Prev Button */}
                <button
                    onClick={prev}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                    aria-label="Previous"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Track */}
                <div className="flex-grow overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                        {visibleProducts.map((product, index) => (
                            // Using index in key here is acceptable for simple visual rotation 
                            // where we don't need to persist internal state of cards tightly during animation
                            <div key={`${product.id}-${index}`} className="min-w-0">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <button
                    onClick={next}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                    aria-label="Next"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
