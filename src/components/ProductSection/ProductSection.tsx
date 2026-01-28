'use client';

import { Suspense, useEffect, useState } from 'react';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/product';
import { CategoryFilters } from '../CategoryFilters/CategoryFilters';
import { ProductCarousel } from '../ProductCarousel/ProductCarousel';
import { SortingTabs } from '../SortingTabs/SortingTabs';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import { Header } from '../Header/Header';

export const ProductSection = () => {

    const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);
    const [categoryName, setCategoryName] = useState<string | null>(null);

    const [gridProducts, setGridProducts] = useState<Product[]>([]);

    const [error, setError] = useState<string | null>(null);

    const [sortParam, setSortParam] = useState<number | null>(0);
    const [categoryParam, setCategoryParam] = useState<number | null>(null);

    useEffect(() => {
        const fetchCarouselData = async () => {
            try {
                const result = await getProducts({ orderBy: 0, id: categoryParam });
                setCarouselProducts(result.products.slice(0, 10));
                setCategoryName(result.categoryName);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Nepodařilo se načíst produkty');
            }
        };

        fetchCarouselData();
    }, [categoryParam]);


    useEffect(() => {
        const fetchGridData = async () => {

            try {
                const orderBy = sortParam ? parseInt(sortParam) : 0;
                const result = await getProducts({ orderBy, id: categoryParam });
                setGridProducts(result.products);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load products');
            }
        };

        fetchGridData();
    }, [sortParam, categoryParam]);

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

            <CategoryFilters categoryParam={categoryParam} setCategoryParam={setCategoryParam}/>
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
            <ProductGrid products={gridProducts} />
          </Suspense>
        </>
    );
};
