'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const SortingTabs = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sortParam = searchParams.get('sort');
    const selectedIndex = sortParam ? parseInt(sortParam) : 0;

    const TABS = [
        'TOP',
        'Nejprodávanější',
        'Od nejlevnějšího',
        'Od nejdražšího'
    ];

    const handleChange = (index: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', index.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="my-8 border-b border-gray-200">
            <div className="flex space-x-1">
                {TABS.map((label, index) => {
                    const isSelected = selectedIndex === index;
                    return (
                        <button
                            key={index}
                            onClick={() => handleChange(index)}
                            className={`
                px-6 py-3 font-medium text-sm transition-colors border-b-2
                ${isSelected
                                    ? 'border-primary text-black'
                                    : 'border-transparent text-text hover:text-black hover:border-gray-300'
                                }
              `}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
