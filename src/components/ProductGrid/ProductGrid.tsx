'use client';

import { Product } from '@/types/product';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductGridProps {
    products: Product[];
    loading?: boolean;
}

export const ProductGrid = ({ products, loading = false }: ProductGridProps) => {
    return (
        <div className="my-8 relative">
            {loading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            )}
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 ${loading ? 'opacity-50' : ''}`}>
                {products.map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};
