import express from 'express';
import Fuel from '../models/Fuel.js';
import FuelSale from '../models/FuelSale.js';
import FuelEntry from '../models/FuelEntry.js';
import { verifyJWT, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyJWT);

router.get('/', async (req, res) => {
  const fuels = await Fuel.find();
  res.json(fuels);
});

router.post('/', requireRole('admin', 'manager'), async (req, res) => {
  const fuel = await Fuel.create(req.body);
  res.status(201).json(fuel);
});

router.put('/:id', requireRole('admin', 'manager'), async (req, res) => {
  const fuel = await Fuel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(fuel);
});

router.delete('/:id', requireRole('admin', 'manager'), async (req, res) => {
  await Fuel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

router.post('/:id/sale', requireRole('admin', 'manager', 'employee'), async (req, res) => {
  const { quantity, employee } = req.body;
  const fuel = await Fuel.findById(req.params.id);
  if (!fuel) return res.status(404).json({ message: 'Fuel not found' });
  const totalPrice = quantity * fuel.pricePerLiter;
  const sale = await FuelSale.create({ fuel: fuel._id, quantity, totalPrice, employee });
  fuel.stock -= quantity;
  await fuel.save();
  res.status(201).json(sale);
});

router.post('/:id/entry', requireRole('admin', 'manager'), async (req, res) => {
  const { quantity, cost } = req.body;
  const fuel = await Fuel.findById(req.params.id);
  if (!fuel) return res.status(404).json({ message: 'Fuel not found' });
  const entry = await FuelEntry.create({ fuel: fuel._id, quantity, cost });
  fuel.stock += quantity;
  await fuel.save();
  res.status(201).json(entry);
});

export default router;
