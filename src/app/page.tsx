import { getProducts } from '@/services/productService';
import { Header } from '@/components/Header/Header';
import { CategoryFilters } from '@/components/CategoryFilters/CategoryFilters';
import { ProductCarousel } from '@/components/ProductCarousel/ProductCarousel';
import { SortingTabs } from '@/components/SortingTabs/SortingTabs';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import { FilterParameters } from '@/types/product';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const sortParam = typeof params.sort === 'string' ? parseInt(params.sort) : 0;

  // Fetch products
  // Note: we can map our tabs to real API orderBy values if we knew them.
  // 0: TOP?, 1: BestSeller?, etc.
  // We'll pass the index as orderBy for now.

  const filterOverrides: Partial<FilterParameters> = {
    orderBy: sortParam,
  };

  // If we had a way to filter by category name in API, we would add it here.
  // Currently category name won't affect API as discussed, but mechanisms are there.

  const products = await getProducts(filterOverrides);

  // For carousel, we might want "Best Sellers" which might be a different query.
  // Or just use the same products snippet.
  // Let's assume we want top products for carousel.
  const carouselProducts = products.slice(0, 10);

  return (
    <div className="container">
      <Header />
      <CategoryFilters />
      <ProductCarousel products={carouselProducts} />
      <SortingTabs />
      <ProductGrid products={products} />
    </div>
  );
}
