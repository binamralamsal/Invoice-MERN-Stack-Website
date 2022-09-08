import { Request, Response } from "express";
import { Product } from "../models";

class ProductController {
  /**
   * @desc    Get all products
   * @route   GET /api/products/
   * @access  Admin
   */
  public async getProducts(req: Request, res: Response) {
    const products = await Product.find({});

    res.json(products);
  }
}

export default ProductController;
