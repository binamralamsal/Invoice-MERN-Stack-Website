import { TextInput, Title, Button, Stack, Container } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { Link } from "react-router-dom";

import { DashboardBreadcrumb } from "@/components/Misc";

import { ProductsTable } from "../components/ProductsTable";

const breadcrumbItems = [{ to: "/", title: "Products" }];

export const Products = () => {
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

      <ProductsTable />
    </Container>
  );
};
