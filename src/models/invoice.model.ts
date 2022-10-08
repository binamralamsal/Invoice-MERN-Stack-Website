import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { ProductSchema } from "./product.model";

class InvoiceProductSize {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public costPrice!: number;

  @prop({ required: true })
  public sellingPrice!: number;
}

class InvoiceItem {
  @prop({ ref: ProductSchema })
  public product!: Ref<ProductSchema>;

  @prop({ type: InvoiceProductSize })
  public size!: InvoiceProductSize;

  @prop({ required: true })
  public quantity!: number;
}

@modelOptions({
  options: {
    customName: "Invoice",
  },
  schemaOptions: {
    timestamps: true,
  },
})
export class InvoiceSchema {
  @prop({ required: true })
  public customerName!: string;

  @prop({ required: true, default: [], type: () => InvoiceItem })
  public items!: InvoiceItem[];
}

export default getModelForClass(InvoiceSchema);
