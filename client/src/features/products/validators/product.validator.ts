import { z } from "zod";

export const productSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  sizes: z
    .array(
      z.object({
        name: z.string({ required_error: "Size name is required" }),
        costPrice: z.number({ required_error: "Cost price is required" }),
        sellingPrice: z.number({ required_error: "Selling price is required" }),
        remainingStock: z.number({
          required_error: "Remaining stock of product is required",
        }),
      }),
      { required_error: "Sizes is required" }
    )
    .nonempty("Sizes can't be empty"),
});

export type ProductCredentialsDTO = z.infer<typeof productSchema>;
