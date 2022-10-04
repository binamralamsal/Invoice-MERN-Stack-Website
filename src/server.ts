import App from "./app";

import { AuthRoutes } from "./routes";
import ProductRoutes from "./routes/product.route";
import InvoiceRoutes from "./routes/invoice.route";

const app = new App([
  new AuthRoutes(),
  new ProductRoutes(),
  new InvoiceRoutes(),
]);

app.listen();
