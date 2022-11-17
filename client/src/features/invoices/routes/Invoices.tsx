import { Container, Stack, TextInput, Title, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import { DashboardBreadcrumb } from "@/components/Misc";
import { TablePagination } from "@/components/Misc/Pagination";

import { InvoicesTable } from "../components/InvoicesTable";
import { useTotalInvoicesPagesCount } from "../hooks/useInvoices";

const breadcrumbItems = [{ to: "/invoices", title: "Invoices" }];

export const Invoices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: totalInvoicesPages } = useTotalInvoicesPagesCount();
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
        Invoices
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
        <Button component={Link} to="/invoices/new" size="md">
          Add Invoice
        </Button>
      </Stack>

      <InvoicesTable />
      <TablePagination totalPages={totalInvoicesPages} />
    </Container>
  );
};
