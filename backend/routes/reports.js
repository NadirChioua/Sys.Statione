import express from 'express';
import { verifyJWT, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyJWT, requireRole('admin', 'manager'));

router.get('/', (req, res) => {
  res.json({ message: 'Reports endpoint placeholder' });
});

export default router;
