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

export type ProductResponse = {
  _id: string;
  name: string;
  sizes: {
    _id: string;
    name: string;
    remainingStock: number;
  }[];
  costPrice: number;
  sellingPrice: number;
  totalRemainingStock: number;
  createdAt: string;
  updatedAt: string;
};
