import { InvoiceCredentialsDTO } from "../validators";

export type Invoice = {
  _id: string;
  customerName: string;
  createdAt: string;
};

export type InvoicesResponse = {
  invoices: Invoice[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  limit: number;
};

export type InvoiceResponse = InvoiceCredentialsDTO & {
  _id: string;
  totalRemainingStock: number;
  createdAt: string;
  updatedAt: string;
  sizes: { _id: string }[];
};
