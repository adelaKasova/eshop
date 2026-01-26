'use client';

import { useEffect, useState, useRef } from 'react';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/product';
import { useSearchParams } from 'next/navigation';
import { CategoryFilters } from '../CategoryFilters/CategoryFilters';
import { ProductCarousel } from '../ProductCarousel/ProductCarousel';
import { SortingTabs } from '../SortingTabs/SortingTabs';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import { Header } from '../Header/Header';

export const ProductSection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [gridLoading, setGridLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isInitialLoad = useRef(true);

    const searchParams = useSearchParams();
    const sortParam = searchParams.get('sort');
    const categoryParam = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            // On first load, show full loading. On subsequent loads, only grid loading.
            if (isInitialLoad.current) {
                setInitialLoading(true);
            } else {
                setGridLoading(true);
            }
            setError(null);

            try {
                const orderBy = sortParam ? parseInt(sortParam) : 0;
                const result = await getProducts({ orderBy });
                setProducts(result.products);

                // Only update header/carousel data on initial load
                if (isInitialLoad.current) {
                    setCategoryName(result.categoryName);
                    setCarouselProducts(result.products.slice(0, 10));
                    isInitialLoad.current = false;
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load products');
            } finally {
                setInitialLoading(false);
                setGridLoading(false);
            }
        };

        fetchData();
    }, [sortParam, categoryParam]);

    if (initialLoading) {
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

    return (
        <>
            <Header categoryName={categoryName} />
            <CategoryFilters />
            <ProductCarousel products={carouselProducts} />
            <SortingTabs />
            <ProductGrid products={products} loading={gridLoading} />
        </>
    );
};
