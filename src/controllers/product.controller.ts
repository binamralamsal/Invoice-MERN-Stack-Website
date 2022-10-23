import { Request, Response } from "express";
import { Product } from "../models";
import config from "../config";
import { HttpException } from "../exceptions";
import mongoose from "mongoose";

class ProductController {
  /**
   * @desc    Get all products
   * @route   GET /api/products/
   * @access  Admin
   */
  public async getProducts(req: Request, res: Response) {
    const page = +(req.query.page || 1);

    const totalProducts = await Product.countDocuments();
    // const products = await Product.find({})
    //   .select("name totalRemainingStock createdAt")
    //   .skip((page - 1) * config.PAGINATION_ITEMS_PER_PAGE)
    //   .limit(config.PAGINATION_ITEMS_PER_PAGE);

    const products = await Product.aggregate([
      { $match: {} },
      {
        $addFields: {
          totalRemainingStock: {
            $reduce: {
              input: "$sizes",
              initialValue: 0,
              in: {
                $add: ["$$value", "$$this.remainingStock"],
              },
            },
          },
        },
      },
      { $project: { name: 1, totalRemainingStock: 1 } },
      { $skip: (page - 1) * config.PAGINATION_ITEMS_PER_PAGE },
      { $limit: config.PAGINATION_ITEMS_PER_PAGE },
    ]);

    res.json({
      products,
      currentPage: page,
      hasNextPage: config.PAGINATION_ITEMS_PER_PAGE * page < totalProducts,
      hasPreviousPage: page > 1,
      totalPages: Math.ceil(totalProducts / config.PAGINATION_ITEMS_PER_PAGE),
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

  /**
   * @desc    Get a product
   * @route   GET /api/products/:id
   * @access  Admin
   */
  public async getProduct(req: Request, res: Response) {
    const product = (
      await Product.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
        {
          $addFields: {
            totalRemainingStock: {
              $reduce: {
                input: "$sizes",
                initialValue: 0,
                in: {
                  $add: ["$$value", "$$this.remainingStock"],
                },
              },
            },
          },
        },
      ])
    )[0];

    if (!product) throw new HttpException(404, "Product not found");
    res.json(product);
  }

  /**
   * @desc    Update a product
   * @route   PUT /api/products/:id
   * @access  Admin
   */
  public async putProduct(req: Request, res: Response) {
    await Product.updateOne({ id: req.params.id }, req.body);
    res.json({ status: 200, message: "Product updated successfully" });
  }

  /**
   * @desc    Delete a product
   * @route   DELETE /api/products/:id
   * @access  Admin
   */
  public async deleteProduct(req: Request, res: Response) {
    await Product.deleteOne({ id: req.params.id });
    res.json({ status: 200, message: "Product deleted successfully" });
  }
}

export default ProductController;
