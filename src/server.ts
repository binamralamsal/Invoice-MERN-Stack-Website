import App from "./app";

import { AuthRoutes } from "./routes";
import ProductRoutes from "./routes/product.route";

const app = new App([new AuthRoutes(), new ProductRoutes()]);

app.listen();
