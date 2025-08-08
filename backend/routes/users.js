import express from 'express';
import User from '../models/User.js';
import { verifyJWT, requireRole } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.use(verifyJWT, requireRole('admin'));

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, role });
  res.status(201).json(user);
});

router.put('/:id', async (req, res) => {
  const { password, ...rest } = req.body;
  if (password) rest.password = await bcrypt.hash(password, 10);
  const user = await User.findByIdAndUpdate(req.params.id, rest, { new: true });
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
