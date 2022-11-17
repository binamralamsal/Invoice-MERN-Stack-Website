import { axios } from "@/lib/axios";

import { InvoicesResponse } from "../types";

type GetInvoicesDTO = {
  searchQuery?: string | null;
  page?: string | null;
};

export const getInvoices = (data?: GetInvoicesDTO): Promise<InvoicesResponse> => {
  return axios.get("/api/invoices", {
    params: {
      search: data?.searchQuery,
      page: data?.page,
    },
  });
};
