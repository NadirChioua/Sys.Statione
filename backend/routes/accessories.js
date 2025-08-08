import express from 'express';
import Accessory from '../models/Accessory.js';
import { verifyJWT, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyJWT);

router.get('/', async (req, res) => {
  const items = await Accessory.find();
  res.json(items);
});

router.post('/', requireRole('admin', 'manager'), async (req, res) => {
  const item = await Accessory.create(req.body);
  res.status(201).json(item);
});

router.put('/:id', requireRole('admin', 'manager'), async (req, res) => {
  const item = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete('/:id', requireRole('admin', 'manager'), async (req, res) => {
  await Accessory.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
