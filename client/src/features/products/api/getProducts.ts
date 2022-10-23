import { axios } from "@/lib/axios";

import { ProductsResponse } from "../types";

export const getProducts = (): Promise<ProductsResponse> => {
  return axios.get("/api/products");
};
