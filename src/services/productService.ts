import { Product, ApiResponse, FilterParameters } from '../types/product';

const API_URL = 'https://www.alza.cz/Services/RestService.svc/v2/products';

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
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filterParameters: {
                    ...DEFAULT_FILTER,
                    ...filterOverrides,
                },
            }),
            // Revalidate every 60 seconds (ISR)
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.err > 0) {
            throw new Error(data.msg || 'Unknown API error');
        }

        return data.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        // Return empty array or rethrow depending on needs
        // For this interview task, we might want to see the error
        return [];
    }
}
