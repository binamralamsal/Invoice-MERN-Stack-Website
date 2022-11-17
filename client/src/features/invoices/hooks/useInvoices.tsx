import { InfiniteQueryObserverResult, useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";

import { getInvoices } from "../api/getInvoices";

export const useInvoices = <T,>(
  select?: (data: Awaited<ReturnType<typeof getInvoices>>) => T,
  notifyOnChangeProps?: Array<keyof InfiniteQueryObserverResult> | "all"
) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  return useQuery(
    ["invoices", location.search],
    () =>
      getInvoices({
        page: searchParams.get("page"),
        searchQuery: searchParams.get("search"),
      }),
    {
      select,
      notifyOnChangeProps,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
};

export const useTotalInvoicesPagesCount = () => useInvoices((data) => data.totalPages, ["data"]);
