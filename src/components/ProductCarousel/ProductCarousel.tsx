'use client';

import { Product } from '@/types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import { useCarousel } from '@/hooks/useCarousel';
import { useEffect, useState } from 'react';

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const { currentIndex, next, prev } = useCarousel(products.length);

  const [windowWidth, setWindowWidth]: number | null = useState(null);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisibleProducts = () => {
    if (products.length === 0) return [];

    let visibleProductsCount = 4;
    if (windowWidth < 640) {
      visibleProductsCount = 1;
    } else if (windowWidth < 768) {
      visibleProductsCount = 2;
    } else if (windowWidth < 1024) {
      visibleProductsCount = 3;
    }

    const items = [];
    for (let i = 0; i < visibleProductsCount; i++) {
      items.push(products[(currentIndex + i) % products.length]);
    }
    return items;
  };

  const visibleProducts = getVisibleProducts();

  if (products.length === 0) return null;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-light text-black mb-4">Nejprodávanější</h2>

      <div className="bg-secondary pb-4 flex items-center gap-4">
        <button
          onClick={prev}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
          aria-label="Previous"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex-grow overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {visibleProducts.map((product, index) => (
              <div key={`${product.id}-${index}`} className="min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
          aria-label="Next"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
