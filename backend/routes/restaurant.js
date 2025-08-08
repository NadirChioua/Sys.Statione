import express from 'express';
import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';
import { verifyJWT, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyJWT);

// Menu CRUD
router.get('/menu', async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

router.post('/menu', requireRole('admin', 'manager'), async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
});

router.put('/menu/:id', requireRole('admin', 'manager'), async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete('/menu/:id', requireRole('admin', 'manager'), async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Orders
router.post('/orders', requireRole('admin', 'manager', 'employee'), async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
});

router.get('/orders', requireRole('admin', 'manager'), async (req, res) => {
  const orders = await Order.find().populate('items.item');
  res.json(orders);
});

export default router;
