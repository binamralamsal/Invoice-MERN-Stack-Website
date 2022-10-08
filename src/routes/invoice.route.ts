import { Router } from "express";
import { InvoiceController } from "../controllers";
import Routes from "../interfaces/routes.interface";
import { auth, validate } from "../middlewares";
import { invoiceSchema } from "../validators";

class InvoiceRoutes implements Routes {
  public path = "/api/invoices";
  public router = Router();
  public invoiceController = new InvoiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.invoiceController.getInvoices);
    this.router.post(
      "/",
      auth,
      validate(invoiceSchema),
      this.invoiceController.postInvoice
    );
    this.router.get("/:id", auth, this.invoiceController.getInvoice);
    this.router.put(
      "/:id",
      auth,
      validate(invoiceSchema),
      this.invoiceController.putInvoice
    );
    this.router.delete("/:id", auth, this.invoiceController.deleteInvoice);
  }
}

export default InvoiceRoutes;
