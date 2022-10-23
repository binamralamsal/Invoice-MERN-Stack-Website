import { Group, Table, Anchor, ActionIcon, Text, Center, Pagination } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import { deleteProduct } from "../api/deleteProduct";
import { getProducts } from "../api/getProducts";
import { Product } from "../types";

export const ProductsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { data, refetch } = useQuery(["products"], () =>
    getProducts({
      page: searchParams.get("page"),
      searchQuery: searchParams.get("search"),
    })
  );
  const mutation = useMutation(deleteProduct, {
    onSuccess: () => refetch(),
  });

  const handleDeleteProduct = (product: Product) => {
    openConfirmModal({
      title: "Delete your product",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this product ({product.name} #{product._id})?
        </Text>
      ),
      labels: { confirm: "Delete Product", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        mutation.mutate(product._id);
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [location.search, refetch]);

  const handlePaginationChange = (page: number) => {
    searchParams.set("page", `${page}`);
    setSearchParams(searchParams);
  };

  const currentPage = +(searchParams.get("page") || 1);
  if (data?.totalPages && currentPage > data.totalPages) {
    searchParams.set("page", String(data.totalPages));
    setSearchParams(searchParams);
  }

  return (
    <>
      <Table highlightOnHover mt="xl" verticalSpacing="md">
        <thead>
          <tr>
            <th>S.n.</th>
            <th>Name</th>
            <th>Available Stocks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>
                <Anchor component={Link} to={`/products/${product._id}`}>
                  {product.name}
                </Anchor>
              </td>
              <td>{product.totalRemainingStock}</td>
              <td>
                <Group>
                  <ActionIcon
                    variant="outline"
                    component={Link}
                    to={`/products/edit/${product._id}`}
                    color="blue"
                  >
                    <IconEdit size={18} />
                  </ActionIcon>
                  <ActionIcon
                    variant="outline"
                    color="red"
                    onClick={() => handleDeleteProduct(product)}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Center mt="lg">
        <Pagination
          withEdges
          page={currentPage}
          total={data?.totalPages || 0}
          onChange={handlePaginationChange}
        />
      </Center>
    </>
  );
};
