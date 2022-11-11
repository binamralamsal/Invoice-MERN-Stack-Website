import { EditProduct } from "./EditProduct";
import { NewProduct } from "./NewProduct";
import { Products } from "./Products";
import { SingleProduct } from "./SingleProduct";

export const productsRoutes = [
  { path: "/", element: <Products /> },
  { path: "/products/new", element: <NewProduct /> },
  { path: "/products/:id", element: <SingleProduct /> },
  { path: "/products/:id/edit", element: <EditProduct /> },
];
