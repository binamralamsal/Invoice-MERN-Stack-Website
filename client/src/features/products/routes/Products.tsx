import { TextInput, Title, Button, Stack, Container } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import { DashboardBreadcrumb } from "@/components/Misc";

import { ProductsTable } from "../components/ProductsTable";

const breadcrumbItems = [{ to: "/", title: "Products" }];

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearchInputChange = (event: FormEvent) => {
    event.preventDefault();

    searchParams.set("search", searchQuery);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [location.search, searchParams]);

  return (
    <Container size="xl">
      <DashboardBreadcrumb items={breadcrumbItems} />
      <Title order={2} mt="sm" size="h1">
        Products
      </Title>

      <Stack mt="xl" justify="space-between" style={{ flexDirection: "row" }}>
        <form onSubmit={handleSearchInputChange}>
          <TextInput
            placeholder="Search your query"
            icon={<IconSearch size={14} />}
            size="md"
            onChange={(event) => setSearchQuery(event.target.value)}
            value={searchQuery}
          />
        </form>
        <Button component={Link} to="/products/new" size="md">
          Add Product
        </Button>
      </Stack>

      <ProductsTable />
    </Container>
  );
};
