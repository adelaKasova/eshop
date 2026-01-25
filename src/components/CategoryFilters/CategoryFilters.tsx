'use client';

import { Tag } from '@carbon/react';
import styles from './CategoryFilters.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock categories as we don't have an API for them
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
    const selectedCategory = searchParams.get('category') || '';

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
        <div className={styles.container}>
            <div className={styles.scrollContainer}>
                {CATEGORIES.map((category) => (
                    <Tag
                        key={category}
                        className={styles.tag}
                        type={selectedCategory === category ? 'blue' : 'gray'}
                        onClick={() => handleSelect(category)}
                    >
                        {category}
                    </Tag>
                ))}
            </div>
        </div>
    );
};
