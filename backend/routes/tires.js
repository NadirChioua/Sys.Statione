import express from 'express';
import Tire from '../models/Tire.js';
import { verifyJWT, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyJWT);

router.get('/', async (req, res) => {
  const tires = await Tire.find();
  res.json(tires);
});

router.post('/', requireRole('admin', 'manager'), async (req, res) => {
  const tire = await Tire.create(req.body);
  res.status(201).json(tire);
});

router.put('/:id', requireRole('admin', 'manager'), async (req, res) => {
  const tire = await Tire.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tire);
});

router.delete('/:id', requireRole('admin', 'manager'), async (req, res) => {
  await Tire.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
