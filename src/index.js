import express from 'express';

import productsRoutes from './routes/products.routes.js';
import categoriesRoutes from './routes/categories.routes.js';

const app = express();
app.use(express.json());

app.use('/api', productsRoutes);
app.use('/api', categoriesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});