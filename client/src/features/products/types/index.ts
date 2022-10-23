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
};
