import { useState, useCallback } from 'react';

export const useCarousel = (totalItems: number, visibleItems: number = 5) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, [totalItems]);

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }, [totalItems]);

    return {
        currentIndex,
        next,
        prev,
    };
};
