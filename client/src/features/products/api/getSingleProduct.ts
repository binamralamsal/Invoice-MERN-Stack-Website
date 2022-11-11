import { axios } from "@/lib/axios";

import { ProductResponse } from "../types";

export const getSingleProduct = (id: string): Promise<ProductResponse> => {
  return axios.get(`/api/products/${id}`);
};
