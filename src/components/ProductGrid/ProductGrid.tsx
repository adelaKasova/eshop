'use client';

import { Product } from '@/types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';

interface ProductGridProps {
  products: Product[];
  visibleProductsCount: number;
}

export const ProductGrid = ({ products, visibleProductsCount }: ProductGridProps) => {


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
