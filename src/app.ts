import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/product/product.route';
import { OrderRouters } from './modules/order/order.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRouters);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
