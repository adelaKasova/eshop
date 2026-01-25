'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import { IconButton } from '@carbon/react';
import { ChevronLeft, ChevronRight } from '@carbon/icons-react';
import styles from './ProductCarousel.module.css';
import { useCarousel } from '@/hooks/useCarousel';

interface ProductCarouselProps {
    products: Product[];
}

export const ProductCarousel = ({ products }: ProductCarouselProps) => {
    const { currentIndex, next, prev } = useCarousel(products.length);

    // For infinite loop visual effect, we need to render products in a way that handles the wrap.
    // A simple way is to reorder the array based on currentIndex.
    // Or translate a long strip.
    // Requirement: "nekonečná smyčka" (infinite loop)
    // Requirement: "Move 1 item"

    // Let's use the reordering approach for simplicity in React without complex animations logic needed for infinite scroll
    // But for "smooth animation", we might need CSS transition.

    // Alternative: Render [last, ...items, first] and translate?
    // Let's stick to a simpler sliding window for now:
    // Visible items: 5 (desktop).
    // We render a subset or the whole list shifted?

    // If we want TRUE smooth infinite scroll with 1 item move, we need to translate the track 
    // and jump back silently when reaching ends.

    // Simplified implementation: Just translate based on index and wrap visually?
    // Actually, let's just show visible items + buffer.

    const getVisibleProducts = () => {
        if (products.length === 0) return [];

        // Create a circular list of sufficient length for display (e.g., 5 items)
        // We want to show 5 items startin from currentIndex
        const items = [];
        for (let i = 0; i < 5; i++) {
            items.push(products[(currentIndex + i) % products.length]);
        }
        return items;
    };

    const visibleProducts = getVisibleProducts();

    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.title}>Nejprodávanější</h2>

            <div className={styles.controls}>
                <IconButton kind="ghost" label="Previous" onClick={prev} align="right">
                    <ChevronLeft size={24} />
                </IconButton>

                <div className={styles.trackContainer}>
                    <div className={styles.track}>
                        {visibleProducts.map((product, index) => (
                            // Use index in key to force re-render/animate if needed, or product.id to keep state
                            // Using product.id might cause items to "jump" slots. 
                            // To animate efficiently we need a stable key for position, but "infinite" makes this hard.
                            // Let's just render the grid for now.
                            <div key={`${product.id}-${index}`} className={styles.item}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                <IconButton kind="ghost" label="Next" onClick={next} align="right">
                    <ChevronRight size={24} />
                </IconButton>
            </div>
        </div>
    );
};
