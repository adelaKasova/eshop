import { Product, ApiResponse, FilterParameters } from '../types/product';

// Point to local proxy
const API_URL = '/api/products';

const DEFAULT_FILTER: FilterParameters = {
    id: 18855843, // Notebooks category
    isInStockOnly: false,
    newsOnly: false,
    wearType: 0,
    orderBy: 0,
    page: 1,
    params: [],
    producers: [],
    sendPrices: true,
    type: 'action',
    typeId: '',
    branchId: '',
};

export async function getProducts(
    filterOverrides: Partial<FilterParameters> = {}
): Promise<Product[]> {
    try {
        // Client-side fetch to local proxy
        // Browser automatically handles Host, Origin, Cookie, etc. relative to current domain
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                filterParameters: {
                    ...DEFAULT_FILTER,
                    ...filterOverrides,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Service fetch failed: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.err > 0) {
            throw new Error(data.msg || 'Unknown API error');
        }

        return data.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
}
