import { z } from "zod";

export const invoiceSchema = z.object({
  customerName: z.string({ required_error: "Customer Name is required" }),
  items: z.array(
    z.object({
      product: z.string({ required_error: "Product ID is required" }),
      price: z.string({ required_error: "Price is required" }),
      quantity: z.string({ required_error: "Quantity is required" }),
    }),
    { required_error: "Items is required" }
  ),
});
