export type ProductsResponse = {
  products: {
    _id: string;
    name: string;
    totalRemainingStock: number;
  }[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
};
