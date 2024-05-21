import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductIntoDB = async (searchTerm: string) => {
  if (searchTerm) {
    const result = await Product.find({ $text: { $search: searchTerm } });
    return result;
  } else {
    const result = await Product.find();
    return result;
  }
};

const getSingleProductIntoDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const updateSingleProductIntoDB = async (id: string, product: TProduct) => {
  const result = await Product.updateOne({ _id: id }, { $set: product });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductIntoDB,
  getSingleProductIntoDB,
  deleteProductFromDB,
  updateSingleProductIntoDB,
};
