'use client';

import { Suspense, useEffect, useState } from 'react';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/product';
import { useSearchParams } from 'next/navigation';
import { CategoryFilters } from '../CategoryFilters/CategoryFilters';
import { ProductCarousel } from '../ProductCarousel/ProductCarousel';
import { SortingTabs } from '../SortingTabs/SortingTabs';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import { Header } from '../Header/Header';

export const ProductSection = () => {
    // Carousel state (loads with sort 0, only reloads on category change)
    const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [carouselLoading, setCarouselLoading] = useState(true);

    // Grid state (reloads on sort or category change)
    const [gridProducts, setGridProducts] = useState<Product[]>([]);
    const [gridLoading, setGridLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const [sortParam, setSortParam] = useState<number | null>(0);
    const [categoryParam, setCategoryParam] = useState<number | null>(null);

    // Fetch carousel data - only depends on category, always uses sort 0
    useEffect(() => {
        const fetchCarouselData = async () => {
            setCarouselLoading(true);
            try {
                const result = await getProducts({ orderBy: 0 });
                setCarouselProducts(result.products.slice(0, 10));
                setCategoryName(result.categoryName);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load carousel');
            } finally {
                setCarouselLoading(false);
            }
        };

        fetchCarouselData();
    }, [categoryParam]);

    // Fetch grid data - depends on sort and category
    useEffect(() => {
        const fetchGridData = async () => {
            setGridLoading(true);
            try {
                const orderBy = sortParam ? parseInt(sortParam) : 0;
                const result = await getProducts({ orderBy });
                setGridProducts(result.products);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load products');
            } finally {
                setGridLoading(false);
            }
        };

        fetchGridData();
    }, [sortParam, categoryParam]);

    // Show full loading only on initial load (both carousel and grid loading)
    const initialLoading = carouselLoading && gridLoading && carouselProducts.length === 0;

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
          <Suspense
            fallback={
              <div className="flex justify-center py-16">
                <div className="text-gray-500"></div>
              </div>
            }
          >
            <Header categoryName={categoryName} />
          </Suspense>

            <CategoryFilters />
          <Suspense
            fallback={
              <div className="flex justify-center py-16">
                <div className="text-gray-500">Načítám carousel</div>
              </div>
            }
          >
            <ProductCarousel products={carouselProducts} />
          </Suspense>
            <SortingTabs sortParam={sortParam} setSortParam={setSortParam} />
          <Suspense
            fallback={
              <div className="flex justify-center py-16">
                <div className="text-gray-500">Načítám produky</div>
              </div>
            }
          >
            <ProductGrid products={gridProducts} loading={gridLoading} />
          </Suspense>
        </>
    );
};
