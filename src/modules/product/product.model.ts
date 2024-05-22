import { Schema, model } from 'mongoose';
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './product.interface';

const variantSchema = new Schema<TVariant>({
  type: { type: String, required: [true, 'type is required'] },
  value: { type: String, required: [true, 'value is required'] },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: [true, 'quantity is required'] },
  inStock: { type: Boolean, required: [true, 'inStock is required'] },
});

const productSchema = new Schema<TProduct>({
  name: { type: String, required: [true, 'name is required'] },
  description: { type: String, required: [true, 'description is required'] },
  price: { type: Number, required: [true, 'price is required'] },
  category: { type: String, required: [true, 'category is required'] },
  tags: { type: [String], required: [true, 'tags is required'] },
  variants: { type: [variantSchema], required: [true, 'variants is required'] },
  inventory: {
    type: inventorySchema,
    required: [true, 'inventory is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.statics.isStockAvailable = async function (id: string) {
  const availableStock = await Product.findOne({ _id: id });
  if (availableStock) {
    return availableStock.inventory.inStock;
  } else {
    return false;
  }
};

productSchema.statics.reduceQuantity = async function (
  id: string,
  quantity: number,
) {
  const findProduct = await Product.findOne({ _id: id });
  if (findProduct && quantity <= findProduct.inventory.quantity) {
    await Product.updateOne(
      { _id: id },
      {
        $set: {
          inventory: {
            quantity: findProduct.inventory.quantity - quantity,
            inStock:
              findProduct.inventory.quantity - quantity === 0 ? false : true,
          },
        },
      },
    );
  }
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
