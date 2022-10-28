import { Group, Table, Anchor, ActionIcon, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { deleteProduct } from "../api/deleteProduct";
import { useProducts } from "../hooks/useProducts";
import { Product, ProductsResponse } from "../types";

export const ProductsTable = () => {
  const { data, refetch, isLoading } = useProducts<ProductsResponse>();
  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    // showNotification({
    //   id: "load-products",
    //   loading: true,
    //   title: "Loading your products",
    //   message: "Products is loading now, you cannot close this yet",
    //   autoClose: false,
    //   disallowClose: true,
    // });
  }

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

  return (
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
            <td>{(data.currentPage - 1) * data.limit + index + 1}</td>
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
  );
};
