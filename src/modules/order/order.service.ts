import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
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
