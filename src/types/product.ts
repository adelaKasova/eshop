export interface Product {
    id: number;
    code: string;
    img: string;
    name: string;
    spec: string;
    price: string;
    cprice: string | null;
    priceWithoutVat: string;
    avail: string;
    avail_color: string;
    rating: number;
    url: string;
    inBasket: number;
    promo_cnt: number;
}

export interface FilterParameters {
    id: number;
    isInStockOnly: boolean;
    newsOnly: boolean;
    wearType: number;
    orderBy: number;
    page: number;
    params: string[];
    producers: string[];
    sendPrices: boolean;
    type: string;
    typeId: string;
    branchId: string;
}

export interface ApiResponse {
    err: number;
    msg: string | null;
    data: Product[];
    data_cnt: number;
}
