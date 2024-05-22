import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().min(1, 'type is required'),
  value: z.string().min(1, 'value is required'),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().min(1, 'quantity is required'),
  inStock: z.boolean(),
});

export const productValidationSchema = z.object({
  name: z.string().min(1, 'name is required'),
  description: z.string().min(1, 'description is required'),
  price: z.number().min(1, 'price is required'),
  category: z.string().min(1, 'category is required'),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
  isDeleted: z.boolean().optional(),
});

const variantValidationUpdateSchema = z.object({
  type: z.string().optional(),
  value: z.string().optional(),
});

const inventoryValidationUpdateSchema = z.object({
  quantity: z.number().optional(),
  inStock: z.boolean().optional(),
});

export const productValidationUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(variantValidationUpdateSchema).optional(),
  inventory: inventoryValidationUpdateSchema.optional(),
  isDeleted: z.boolean().optional(),
});

export const validationSchema = {
  productValidationSchema,
  productValidationUpdateSchema,
};
