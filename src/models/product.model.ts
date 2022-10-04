import {
  modelOptions,
  getModelForClass,
  prop,
  pre,
} from "@typegoose/typegoose";

class ProductSize {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public costPrice!: number;

  @prop({ required: true })
  public remainingStock!: number;
}

@pre<ProductSchema>("save", function () {
  this.totalRemainingStock = this.sizes.reduce(
    (a, b) => a + b.remainingStock,
    0
  );
})
@modelOptions({
  options: {
    customName: "Product",
  },
})
export class ProductSchema {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, default: [], type: () => ProductSize })
  public sizes!: ProductSize[];

  @prop({ required: true, default: 0 })
  public totalRemainingStock!: number;
}

export default getModelForClass(ProductSchema);
