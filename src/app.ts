import mongoose from "mongoose";
import express, { Application, Request, Response } from "express";

import config from "./config";
import Routes from "./interfaces/routes.interface";
import { error } from "./middlewares";
import path from "path";

class App {
  public app: Application;

  constructor(routes: Routes[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public async listen() {
    console.log("Connecting to mopngodb");
    await this.connectToMongodb();

    this.app.listen(config.PORT, () => {
      console.log("=================================");
      console.log(`======= ENV: ${config.NODE_ENV} =======`);
      console.log(`🚀 App listening on the port ${config.PORT}`);
      console.log("=================================");
    });
  }

  public async connectToMongodb() {
    try {
      if (config.NODE_ENV !== "production") {
        mongoose.set("debug", true);
      }

      await mongoose.connect(config.MONGODB_URI);
    } catch (error) {
      console.log(error);
      process.exit(0);
    }
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });

    if (process.env.NODE_ENV === "production") {
      this.app.use(
        express.static(path.join(__dirname, "..", "client", "dist"))
      );
      this.app.get("(.*)", (req: Request, res: Response) => {
        res.sendFile(
          path.resolve(__dirname, "..", "client", "dist", "index.html")
        );
      });
    } else {
      this.app.get("/", (req, res) => {
        res.send("API is running....");
      });
    }
  }

  private initializeErrorHandling() {
    this.app.use(error);
  }
}

export default App;
