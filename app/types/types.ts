export interface Product {
    id: number;
    title: string;
    price: number;
    discount: number;
    originalPrice?: number;
    images: string[];
    description?: string;
    category?: Category;
}

export interface Category {
    id: number;
    name: string,
    slug: string,
    image: string,
    creationAt: string,
    updatedAt: string
}


export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    password: string;
    address?: string;
    phone?: string;
}
