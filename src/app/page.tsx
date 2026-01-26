import { ProductSection } from '@/components/ProductSection/ProductSection';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="container mx-auto px-4 max-w-7xl min-h-screen bg-white">
      <Suspense
        fallback={
          <div className="flex justify-center py-16">
            <div className="text-gray-500">Loading shop...</div>
          </div>
        }
      >
        <ProductSection />
      </Suspense>
    </main>
  );
}
