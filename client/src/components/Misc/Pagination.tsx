import { Center, Pagination } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

export const TablePagination = (props: { totalPages?: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePaginationChange = (page: number) => {
    searchParams.set("page", `${page}`);
    setSearchParams(searchParams);
  };

  const currentPage = +(searchParams.get("page") || 1);
  if (props.totalPages && currentPage > props.totalPages) {
    handlePaginationChange(props.totalPages);
  }

  return (
    <Center mt="lg">
      <Pagination
        withEdges
        page={currentPage}
        total={props.totalPages || 0}
        onChange={handlePaginationChange}
      />
    </Center>
  );
};
