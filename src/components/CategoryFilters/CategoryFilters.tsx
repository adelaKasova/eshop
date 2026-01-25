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
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleSelect(category)}
                        className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
              ${selectedCategory === category
                                ? 'bg-primary text-white hover:bg-primary-hover'
                                : 'bg-gray-100 text-text hover:bg-gray-200'
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
