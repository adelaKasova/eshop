'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/product';
import { useSearchParams } from 'next/navigation';
import { CategoryFilters } from '../CategoryFilters/CategoryFilters';
import { ProductCarousel } from '../ProductCarousel/ProductCarousel';
import { SortingTabs } from '../SortingTabs/SortingTabs';
import { ProductGrid } from '../ProductGrid/ProductGrid';

export const ProductSection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const sortParam = searchParams.get('sort');
    // Category param could filter API if supported, or just client-side logic
    const categoryParam = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const orderBy = sortParam ? parseInt(sortParam) : 0;
                const data = await getProducts({ orderBy });
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sortParam, categoryParam]);

    if (loading) {
        return (
            <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <h3 className="font-bold">Error loading products</h3>
                <p>{error}</p>
                <p className="text-sm mt-2 text-red-500">
                    Note: Ensure the local API proxy is running correctly.
                </p>
            </div>
        );
    }

    // Slice for carousel - e.g., top 10
    const carouselProducts = products.slice(0, 10);

    return (
        <>
            <CategoryFilters />
            <ProductCarousel products={carouselProducts} />
            <SortingTabs />
            <ProductGrid products={products} />
        </>
    );
};
