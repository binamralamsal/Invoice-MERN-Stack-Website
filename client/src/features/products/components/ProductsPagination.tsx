import { Center, Pagination } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import { useTotalProductsCount } from "../hooks/useProducts";

export const ProductsPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useTotalProductsCount();

  const handlePaginationChange = (page: number) => {
    searchParams.set("page", `${page}`);
    setSearchParams(searchParams);
  };

  const currentPage = +(searchParams.get("page") || 1);
  if (data && currentPage > data) {
    handlePaginationChange(data);
  }

  return (
    <Center mt="lg">
      <Pagination
        withEdges
        page={currentPage}
        total={data || 0}
        onChange={handlePaginationChange}
      />
    </Center>
  );
};
