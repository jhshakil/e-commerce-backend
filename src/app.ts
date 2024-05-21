import express, { Application } from 'express';
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

export default app;
