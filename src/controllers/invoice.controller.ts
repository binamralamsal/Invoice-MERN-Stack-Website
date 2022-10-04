import { Request, Response } from "express";
import { Invoice } from "../models";

class InvoiceController {
  private ITEMS_PER_PAGE = 20;

  /**
   * @desc    Get all invoices
   * @route   GET /api/invoices/
   * @access  Admin
   */
  public async getInvoices(req: Request, res: Response) {
    const page = +(req.query.page || 1);

    const totalInvoices = await Invoice.countDocuments();
    const invoices = await Invoice.find({})
      .skip((page - 1) * this.ITEMS_PER_PAGE)
      .limit(this.ITEMS_PER_PAGE);

    res.json({
      products: invoices,
      currentPage: page,
      hasNextPage: this.ITEMS_PER_PAGE * page < totalInvoices,
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
  }
}

export default InvoiceController;
