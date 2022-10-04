import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import { ProductSchema } from "./product.model";

class InvoiceItem {
  @prop({ ref: ProductSchema })
  public product!: Ref<ProductSchema>;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public quantity!: number;
}

@modelOptions({
  options: {
    customName: "Invoice",
  },
})
export class InvoiceSchema {
  @prop({ required: true })
  public customerName!: string;

  @prop({ required: true, default: [], type: () => InvoiceItem })
  public items!: InvoiceItem[];
}

export default getModelForClass(InvoiceSchema);
