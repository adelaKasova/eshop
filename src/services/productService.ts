import { Product, ApiResponse, FilterParameters, Breadcrumb } from '../types/product';

export interface ProductsResult {
    products: Product[];
    categoryName: string | null;
}

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
): Promise<ProductsResult> {
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

        // Extract category name from breadcrumbs
        const categoryName = data.breadcrumbs?.[0]?.category?.name ?? null;

        return {
            products: data.data,
            categoryName,
        };
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
}
