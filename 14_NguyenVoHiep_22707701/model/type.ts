export interface Category {
    id: number;
    name: string;
    remote_id?: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    unit: string;
    description?: string;
    image_uri?: string;
    category_id: number;
    remote_id?: string;
    updated_at: string;
    is_deleted: boolean;
}