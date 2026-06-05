import { fetchProducts } from "@/services/fetchProducts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const PRODUCTS_PER_PAGE = 20

export const useProducts = ({
    page = 1,
    title = "",
    categoryId,
}: {
    page?: number;
    title?: string;
    categoryId?: number;
} = {}) => {
    return useQuery({
        queryKey: ["products", page, title, categoryId],
        queryFn: () =>
            fetchProducts({
                page,
                title,
                categoryId,
                limit: PRODUCTS_PER_PAGE,
            }),
        placeholderData: keepPreviousData,
    });
};