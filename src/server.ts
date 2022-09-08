import App from "./app";
import "module-alias/register";

import { AuthRoutes } from "./routes";

const app = new App([new AuthRoutes()]);

app.listen();
