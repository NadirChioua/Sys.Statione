import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import fuelRoutes from './routes/fuel.js';
import washRoutes from './routes/wash.js';
import restaurantRoutes from './routes/restaurant.js';
import accessoriesRoutes from './routes/accessories.js';
import tiresRoutes from './routes/tires.js';
import butcheryRoutes from './routes/butchery.js';
import reportsRoutes from './routes/reports.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/wash', washRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/accessories', accessoriesRoutes);
app.use('/api/tires', tiresRoutes);
app.use('/api/butchery', butcheryRoutes);
app.use('/api/reports', reportsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
