import mongoose from 'mongoose';

const tireSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Tire', tireSchema);
