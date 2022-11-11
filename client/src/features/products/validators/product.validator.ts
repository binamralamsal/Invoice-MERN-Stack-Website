import { z } from "zod";

export const productValidator = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  sizes: z
    .array(
      z.object({
        name: z.string({ required_error: "Size name is required" }).min(1),
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

export type ProductCredentialsDTO = z.infer<typeof productValidator>;
