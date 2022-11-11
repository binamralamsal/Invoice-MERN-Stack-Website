import { axios } from "@/lib/axios";

import { ProductResponse } from "../types";
import { ProductCredentialsDTO } from "../validators";

export const editProduct = (id: string, data: ProductCredentialsDTO): Promise<ProductResponse> => {
  return axios.put(`/api/products/${id}`, data);
};
