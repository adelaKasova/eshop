'use client';

import { Product } from '@/types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';

interface ProductGridProps {
  products: Product[];
  windowWidth: number;
}

export const ProductGrid = ({ products, windowWidth }: ProductGridProps) => {
  const [visibleProductsCount, setVisibleProductsCount] = useState(4);

  useEffect(() => {
    if (windowWidth < 640) {
      setVisibleProductsCount(1);
    } else if (windowWidth < 768) {
      setVisibleProductsCount(2);
    } else if (windowWidth < 1024) {
      setVisibleProductsCount(3);
    } else {
      setVisibleProductsCount(4);
    }
  }, [windowWidth]);

  return (
    <div className="my-8 relative">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4`}
      >
        {products.length === 0
          ? [...Array(visibleProductsCount)].map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
};
