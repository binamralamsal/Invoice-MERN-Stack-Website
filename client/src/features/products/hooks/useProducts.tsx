import { InfiniteQueryObserverResult, useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";

import { getProducts } from "../api/getProducts";

export const useProducts = <T,>(
  select?: (data: Awaited<ReturnType<typeof getProducts>>) => T,
  notifyOnChangeProps?: Array<keyof InfiniteQueryObserverResult> | "all"
) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  return useQuery(
    ["products", location.search],
    () =>
      getProducts({
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

export const useTotalProductsCount = () => useProducts((data) => data.totalPages, ["data"]);
