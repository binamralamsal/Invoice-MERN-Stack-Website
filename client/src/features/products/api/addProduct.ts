import { axios } from "@/lib/axios";

import { ProductResponse } from "../types";
import { ProductCredentialsDTO } from "../validators";

export const addProduct = (data: ProductCredentialsDTO): Promise<ProductResponse> => {
  return axios.post("/api/products", data);
};
