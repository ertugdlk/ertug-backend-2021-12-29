export interface IImage {
    url: string;
    path: string;
    checksum: string;
}

export interface IGarment {
    product_categories_mapped: Array<string>;
    product_id: string;
    url: string;
    gender: string;
    price: number;
    product_description: string;
    image_urls: Array<string>;
    product_imags_src: Array<string>;
    source: string;
    product_categories: Array<string>;
    images: Array<IImage>;
    position: Array<string>;
    product_title: string;
    brand: string;
    currency_code: string;
    stock: number;
    score: number;
}
