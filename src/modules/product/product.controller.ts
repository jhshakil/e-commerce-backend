import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { validationSchema } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const zodParsedData =
      validationSchema.productValidationSchema.parse(product);
    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
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

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    const result = await ProductServices.getAllProductIntoDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Get all product successfully',
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductIntoDB(productId);

    res.status(200).json({
      success: true,
      message: 'Get product successfully',
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

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { product } = req.body;
    const zodParsedData =
      validationSchema.productValidationUpdateSchema.parse(product);

    const result = await ProductServices.updateSingleProductIntoDB(
      productId,
      product,
    );

    res.status(200).json({
      success: true,
      message: 'Update product successfully',
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
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

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateSingleProduct,
};
