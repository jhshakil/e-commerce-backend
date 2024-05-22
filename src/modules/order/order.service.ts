import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  if (await Product.isStockAvailable(order.productId)) {
    const result = await Order.create(order);
    await Product.reduceQuantity(order.productId, order.quantity);
    return result;
  } else {
    throw new Error('Insufficient quantity available in inventory');
  }
};

const getAllOrderIntoDb = async (email: string) => {
  if (email) {
    const result = await Order.find({ email });
    return result;
  } else {
    const result = await Order.find();
    return result;
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderIntoDb,
};
