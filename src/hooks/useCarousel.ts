import { useState, useCallback, useEffect } from 'react';

export const useCarousel = (totalItems: number, visibleItems: number = 5) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Infinite loop logic
    // We can just increment index indefinitely and use modulo for rendering, 
    // but for translation we need to handle the wrap around.
    // Simple "infinite" effect by duplicating items is common, 
    // but "move 1 item" with infinite loop often implies circular buffer.

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
