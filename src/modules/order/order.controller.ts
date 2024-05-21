import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const zodParsedData = orderValidationSchema.parse(order);
    const result = await OrderServices.createOrderIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        (error instanceof Error && error.message) || 'Something went wrong',
      data: error,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await OrderServices.getAllOrderIntoDb(email);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        (error instanceof Error && error.message) || 'Something went wrong',
      data: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
