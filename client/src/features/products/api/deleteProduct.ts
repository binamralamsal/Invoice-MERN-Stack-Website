import { axios } from "@/lib/axios";

export const deleteProduct = (id: string): Promise<{ message: string; status: number }> => {
  return axios.delete(`/api/products/${id}`);
};
