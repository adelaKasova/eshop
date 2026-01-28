'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/services/productService';
import { Breadcrumb, Product } from '@/types/product';
import { CategoryFilters } from '../CategoryFilters/CategoryFilters';
import { ProductCarousel } from '../ProductCarousel/ProductCarousel';
import { SortingTabs } from '../SortingTabs/SortingTabs';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import { Header } from '../Header/Header';
import { Breadcrums } from '../Breadcrums/Breadcrums';

export const ProductSection = () => {
  const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [breadcrums, setBreadcrums] = useState<Breadcrumb[] | undefined>();

  const [gridProducts, setGridProducts] = useState<Product[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [sortParam, setSortParam] = useState<number>(0);
  const [categoryParam, setCategoryParam] = useState<number>(18855843);

  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  const [visibleProductsCount, setVisibleProductsCount] = useState(4);

  useEffect(() => {
    if (windowWidth !== null && windowWidth < 640) {
      setVisibleProductsCount(1);
    } else if (windowWidth !== null && windowWidth < 768) {
      setVisibleProductsCount(2);
    } else if (windowWidth !== null && windowWidth < 1024) {
      setVisibleProductsCount(3);
    } else {
      setVisibleProductsCount(4);
    }
  }, [windowWidth]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchCarouselData = async () => {
      setCarouselProducts([]);
      setCategoryName(null);
      setBreadcrums(undefined);
      try {
        const result = await getProducts({ orderBy: 0, id: categoryParam });
        setCarouselProducts(result.products.slice(0, 10));
        setCategoryName(result.categoryName);
        setBreadcrums(result.breadcrums);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Nepodařilo se načíst produkty');
      }
    };

    fetchCarouselData();
  }, [categoryParam]);

  useEffect(() => {
    const fetchGridData = async () => {
      setGridProducts([]);
      try {
        const orderBy: number = sortParam ? parseInt(sortParam) : 0;
        const result = await getProducts({ orderBy, id: categoryParam });
        setGridProducts(result.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Nepodařilo se načíst produkty');
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
      <Header categoryName={categoryName} />
      <Breadcrums breadcrums={breadcrums} />
      <CategoryFilters categoryParam={categoryParam} setCategoryParam={setCategoryParam} />

      <ProductCarousel visibleProductsCount={visibleProductsCount} products={carouselProducts} />

      <SortingTabs sortParam={sortParam} setSortParam={setSortParam} />

      <ProductGrid visibleProductsCount={visibleProductsCount} products={gridProducts} />
    </>
  );
};
