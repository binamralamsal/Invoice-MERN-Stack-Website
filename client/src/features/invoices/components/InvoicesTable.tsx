import { Group, Table, Anchor, ActionIcon, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { deleteInvoice } from "../api/deleteInvoice";
import { useInvoices } from "../hooks/useInvoices";
import { Invoice, InvoicesResponse } from "../types";

export const InvoicesTable = () => {
  const { data, refetch } = useInvoices<InvoicesResponse>();
  const mutation = useMutation(deleteInvoice, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleDeleteInvoice = (invoice: Invoice) => {
    openConfirmModal({
      title: "Delete your invoice",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this invoice (of {invoice.customerName} #{invoice._id})?
        </Text>
      ),
      labels: { confirm: "Delete Invoice", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        mutation.mutate(invoice._id);
      },
    });
  };

  return (
    <Table highlightOnHover mt="xl" verticalSpacing="md">
      <thead>
        <tr>
          <th>S.n.</th>
          <th>Customer Name</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.invoices.map((invoice, index) => (
          <tr key={invoice._id}>
            <td>{(data.currentPage - 1) * data.limit + index + 1}</td>
            <td>
              <Anchor component={Link} to={`/invoices/${invoice._id}`}>
                {invoice.customerName} #{invoice._id}
              </Anchor>
            </td>
            <td>{new Date(invoice.createdAt).toLocaleString()}</td>
            <td>
              <Group>
                <ActionIcon
                  variant="outline"
                  component={Link}
                  to={`/invoices/${invoice._id}/edit`}
                  color="blue"
                >
                  <IconEdit size={18} />
                </ActionIcon>
                <ActionIcon
                  variant="outline"
                  color="red"
                  onClick={() => handleDeleteInvoice(invoice)}
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
