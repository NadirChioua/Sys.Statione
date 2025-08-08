import express from 'express';
import ButcheryProduct from '../models/ButcheryProduct.js';
import { verifyJWT, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyJWT);

router.get('/', async (req, res) => {
  const products = await ButcheryProduct.find();
  res.json(products);
});

router.post('/', requireRole('admin', 'manager'), async (req, res) => {
  const product = await ButcheryProduct.create(req.body);
  res.status(201).json(product);
});

router.put('/:id', requireRole('admin', 'manager'), async (req, res) => {
  const product = await ButcheryProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

router.delete('/:id', requireRole('admin', 'manager'), async (req, res) => {
  await ButcheryProduct.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
