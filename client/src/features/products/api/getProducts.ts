import { axios } from "@/lib/axios";

import { ProductsResponse } from "../types";

type GetProductDTO = {
  searchQuery?: string | null;
  page?: string | null;
};

export const getProducts = (data?: GetProductDTO): Promise<ProductsResponse> => {
  return axios.get("/api/products", {
    params: {
      search: data?.searchQuery,
      page: data?.page,
    },
  });
};
