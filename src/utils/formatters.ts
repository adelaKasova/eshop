import { decodeHtml } from './htmlParser';

export const formatPrice = (price: string | null | undefined): string => {
    if (!price) return '';
    // Price from API usually comes with &nbsp; and currency
    // We clean it and ensure it looks good
    return decodeHtml(price);
};

export const parseRate = (rating: number): number => {
    // Ensure rating is between 0 and 5
    return Math.max(0, Math.min(5, Math.round(rating * 2) / 2));
};
