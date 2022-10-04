import { Request, Response } from "express";
import { Invoice, Product } from "../models";
import config from "../config";

class InvoiceController {
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
    res.json(invoice);

    for (const item of invoice.items) {
      await Product.updateOne(
        { _id: item.product, "sizes._id": (item as any).size._id },
        {
          $inc: {
            "sizes.$.remainingStock": -item.quantity,
            totalRemainingStock: -item.quantity,
          },
        }
      );
    }
  }

  /**
   * @desc    Delete an invoice
   * @route   DELETE /api/invoices/:id
   * @access  Admin
   */
  public deleteInvoice() {}
}

export default InvoiceController;
