import { Request, Response } from "express";
import { Product } from "../models";
import config from "../config";

class ProductController {
  /**
   * @desc    Get all products
   * @route   GET /api/products/
   * @access  Admin
   */
  public async getProducts(req: Request, res: Response) {
    const page = +(req.query.page || 1);

    const totalProducts = await Product.countDocuments();
    const products = await Product.find({})
      .skip((page - 1) * config.PAGINATION_ITEMS_PER_PAGE)
      .limit(config.PAGINATION_ITEMS_PER_PAGE);

    res.json({
      products,
      currentPage: page,
      hasNextPage: config.PAGINATION_ITEMS_PER_PAGE * page < totalProducts,
      hasPreviousPage: page > 1,
    });
  }

  /**
   * @desc    Add new product
   * @route   POST /api/products/
   * @access  Admin
   */
  public async postProduct(req: Request, res: Response) {
    const product = await Product.create(req.body);
    res.json(product);
  }
}

export default ProductController;
