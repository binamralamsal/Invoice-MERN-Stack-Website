import { axios } from "@/lib/axios";

export const deleteInvoice = (id: string): Promise<{ message: string; status: number }> => {
  return axios.delete(`/api/invoices/${id}`);
};
