import { ProductCredentialsDTO } from "../validators";

export type Product = {
  _id: string;
  name: string;
  totalRemainingStock: number;
};

export type ProductsResponse = {
  products: Product[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  limit: number;
};

export type ProductResponse = ProductCredentialsDTO & {
  _id: string;
  totalRemainingStock: number;
  createdAt: string;
  updatedAt: string;
  sizes: { _id: string }[];
};
