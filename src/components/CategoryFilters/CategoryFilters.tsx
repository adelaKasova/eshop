'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = [
    'Macbook',
    'Herní',
    'Kancelářské',
    'Profesionální',
    'Stylové',
    'Základní',
    'Dotykové',
    'Na splátky',
    'VR Ready',
    'IRIS Graphics',
    'Brašny, batohy',
    'Příslušenství',
];

export const CategoryFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get('category');

    const handleSelect = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (selectedCategory === category) {
            params.delete('category');
        } else {
            params.set('category', category);
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="mb-8 overflow-hidden w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleSelect(category)}
                        className={`
              px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap
              ${selectedCategory === category
                                ? 'bg-gray-400 text-black hover:bg-primary-hover'
                                : 'bg-gray-200 text-black hover:bg-gray-300'
                            }
            `}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};
