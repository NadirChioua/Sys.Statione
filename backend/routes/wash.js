import express from 'express';
import WashTicket from '../models/WashTicket.js';
import { verifyJWT, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyJWT);

router.get('/', async (req, res) => {
  const tickets = await WashTicket.find();
  res.json(tickets);
});

router.post('/', requireRole('admin', 'manager', 'employee'), async (req, res) => {
  const ticket = await WashTicket.create(req.body);
  res.status(201).json(ticket);
});

router.put('/:id', requireRole('admin', 'manager'), async (req, res) => {
  const ticket = await WashTicket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ticket);
});

router.delete('/:id', requireRole('admin', 'manager'), async (req, res) => {
  await WashTicket.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
