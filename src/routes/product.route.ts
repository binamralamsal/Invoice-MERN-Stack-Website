import { Router } from "express";
import ProductController from "../controllers/product.controller";
import Routes from "../interfaces/routes.interface";
import { auth, validate } from "../middlewares";
import { productSchema } from "../validators/product.validator";

class ProductRoutes implements Routes {
  public path = "/api/products";
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.productController.getProducts);
    this.router.post(
      "/",
      auth,
      validate(productSchema),
      this.productController.postProduct
    );
    this.router.get("/:id", auth, this.productController.getProduct);
    this.router.put(
      "/:id",
      auth,
      validate(productSchema),
      this.productController.putProduct
    );
    this.router.delete("/:id", auth, this.productController.deleteProduct);
  }
}

export default ProductRoutes;
