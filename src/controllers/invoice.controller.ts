import { Request, Response } from "express";
import { Invoice, Product, ProductSchema } from "../models";
import config from "../config";
import { HttpException } from "../exceptions";
import mongoose from "mongoose";
import { Ref } from "@typegoose/typegoose";

class InvoiceController {
  private static generateUpdateOperation(
    productId: Ref<ProductSchema, mongoose.Types.ObjectId | undefined>,
    sizeId: any,
    newQuantity: number
  ) {
    return {
      updateOne: {
        filter: { _id: productId, "sizes._id": sizeId },
        update: {
          $inc: {
            "sizes.$.remainingStock": newQuantity,
          },
        },
      },
    };
  }
  /**
   * @desc    Get all invoices
   * @route   GET /api/invoices/
   * @access  Admin
   */
  public async getInvoices(req: Request, res: Response) {
    const page = +(req.query.page || 1);
    console.log("get", config.PAGINATION_ITEMS_PER_PAGE);

    const totalInvoices = await Invoice.countDocuments();
    const invoices = await Invoice.find({})
      .select("customerName createdAt")
      .sort({ createdAt: "desc" })
      .skip((page - 1) * config.PAGINATION_ITEMS_PER_PAGE)
      .limit(config.PAGINATION_ITEMS_PER_PAGE);

    res.json({
      products: invoices,
      currentPage: page,
      hasNextPage: config.PAGINATION_ITEMS_PER_PAGE * page < totalInvoices,
      hasPreviousPage: page > 1,
    });
  }

  /**
   * @desc    Add new Invoice
   * @route   POST /api/invoices/
   * @access  Admin
   */
  public async postInvoice(req: Request, res: Response) {
    const invoice = await Invoice.create(req.body);
    res.status(401).json(invoice);

    const bulkOperations = invoice.items.map((item) => {
      return InvoiceController.generateUpdateOperation(
        item.product,
        (item as any).size._id,
        -item.quantity
      );
    });

    await Product.bulkWrite(bulkOperations);
  }

  /**
   * @desc    Get an invoice
   * @route   GET /api/invoices/:id
   * @access  Admin
   */
  public async getInvoice(req: Request, res: Response) {
    const invoice = (
      await Invoice.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
        {
          $addFields: {
            totalCostPrice: {
              $sum: {
                $map: {
                  input: "$items",
                  in: {
                    $multiply: ["$$this.quantity", "$$this.size.costPrice"],
                  },
                },
              },
            },
            totalSellingPrice: {
              $reduce: {
                input: "$items",
                initialValue: 0,
                in: {
                  $add: [
                    "$$value",
                    {
                      $multiply: [
                        "$$this.quantity",
                        "$$this.size.sellingPrice",
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      ])
    )[0];
    if (!invoice) throw new HttpException(404, "Invoice not found");

    const { totalSellingPrice, totalCostPrice } = invoice;
    const profit = `${
      ((totalSellingPrice - totalCostPrice) / totalCostPrice) * 100
    }%`;
    res.json({ ...invoice, profit });
  }

  /**
   * @desc    Update an invoice
   * @route   PUT /api/invoices/:id
   * @access  Admin
   */
  public async putInvoice(req: Request, res: Response) {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body);
    if (!invoice) throw new HttpException(422, "Invoice not found");

    const oldItems = invoice.items;
    const newItems = req.body.items;
    const currentItemsIds: string[] = [];
    const allOperations = [];

    // Operations for the items which aren't removed and are still in updated document
    for (const newItem of newItems) {
      currentItemsIds.push(newItem.size._id);
      const oldItem = oldItems.find(
        (a) =>
          ((a as any).size._id as mongoose.Types.ObjectId).toHexString() ===
          newItem.size._id
      );

      const newQuantity = (oldItem?.quantity || 0) - newItem.quantity;
      if (newQuantity === 0) continue;

      allOperations.push(
        InvoiceController.generateUpdateOperation(
          newItem.product,
          (newItem as any).size._id,
          newQuantity
        )
      );
    }

    // Operations for the items which are removed
    const removedItems = oldItems.filter(
      (a) => !currentItemsIds.includes((a as any).size._id.toHexString())
    );
    removedItems.forEach((item) => {
      allOperations.push(
        InvoiceController.generateUpdateOperation(
          item.product,
          (item as any).size._id,
          item.quantity
        )
      );
    });

    await Product.bulkWrite(allOperations);
    res.json({ status: 200, message: "Invoice updated successfully" });
  }

  /**
   * @desc    Delete an invoice
   * @route   DELETE /api/invoices/:id
   * @access  Admin
   */
  public async deleteInvoice(req: Request, res: Response) {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    res.json("Invoice deleted successfully");

    if (!invoice) return;

    const bulkOperations = invoice.items.map((item) =>
      InvoiceController.generateUpdateOperation(
        item.product,
        (item as any).size._id,
        item.quantity
      )
    );

    await Product.bulkWrite(bulkOperations);
  }
}

export default InvoiceController;
