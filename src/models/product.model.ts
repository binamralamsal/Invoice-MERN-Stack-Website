import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";

export class ProductSize {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public costPrice!: number;

  @prop({ required: true })
  public sellingPrice!: number;

  @prop({ required: true })
  public remainingStock!: number;
}

@modelOptions({
  options: {
    customName: "Product",
  },
  schemaOptions: {
    timestamps: true,
  },
})
export class ProductSchema {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, default: [], type: () => ProductSize })
  public sizes!: ProductSize[];
}

export default getModelForClass(ProductSchema);
