import {
  TextInput,
  Title,
  Button,
  Stack,
  Container,
  Table,
  Anchor,
  ActionIcon,
  Group,
  Pagination,
  Text,
  Center,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { DashboardBreadcrumb } from "@/components/Misc";

import { deleteProduct } from "../api/deleteProduct";
import { getProducts } from "../api/getProducts";

const breadcrumbItems = [{ to: "/", title: "Products" }];

export const Products = () => {
  const { data, refetch } = useQuery(["products"], getProducts);
  const mutation = useMutation(deleteProduct, {
    onSuccess: () => refetch(),
  });

  const handleDeleteProduct = (id: string) => {
    return () =>
      openConfirmModal({
        title: "Delete your product",
        centered: true,
        children: (
          <Text size="sm">
            Are you sure you want to delete tshi product? This action is destructive and you will
            have to contact support to restore your data.
          </Text>
        ),
        labels: { confirm: "Delete account", cancel: "No don't delete it" },
        confirmProps: { color: "red" },
        onConfirm: () => {
          mutation.mutate(id);
        },
      });
  };

  return (
    <Container size="xl">
      <DashboardBreadcrumb items={breadcrumbItems} />
      <Title order={2} mt="sm" size="h1">
        Products
      </Title>

      <Stack mt="xl" justify="space-between" style={{ flexDirection: "row" }}>
        <TextInput placeholder="Search your query" icon={<IconSearch size={14} />} />
        <Button component={Link} to="/products/new">
          Add Product
        </Button>
      </Stack>

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
                    onClick={handleDeleteProduct(product._id)}
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
        <Pagination withEdges total={data?.totalPages || 0} />
      </Center>
    </Container>
  );
};
