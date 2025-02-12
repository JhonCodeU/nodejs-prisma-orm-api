import { Router } from "express";
import prisma from "../db.js";

const router = Router();

router.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      categories: true,
    }
  });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

router.post('/products', async (req, res) => {
  console.log(req.body);
  
  const newProduct = await prisma.product.create({
    data: req.body,
  });
  res.json(newProduct);
});

router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: req.body,
  });

  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(updatedProduct);
});

router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  if (!deletedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(deletedProduct);
});

export default router;