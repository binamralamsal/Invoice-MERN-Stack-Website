import { z } from "zod";

export const invoiceSchema = z.object({
  customerName: z.string({ required_error: "Customer Name is required" }),
  items: z
    .array(
      z.object({
        product: z.string({ required_error: "Product ID is required" }),
        size: z.object({
          _id: z.string({ required_error: "Size ID is required" }),
          name: z.string({ required_error: "Size Name is required" }),
        }),
        costPrice: z.number({ required_error: "Cost price is required" }),
        sellingPrice: z.number({
          required_error: "Selling price is required",
        }),
        quantity: z.number({ required_error: "Quantity is required" }),
      }),
      { required_error: "Items is required" }
    )
    .nonempty("Items can't be empty"),
});

export type InvoiceCredentialsDTO = z.infer<typeof invoiceSchema>;
