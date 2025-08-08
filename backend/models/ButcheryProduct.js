import mongoose from 'mongoose';

const butcheryProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pricePerKg: { type: Number, required: true },
    stockKg: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('ButcheryProduct', butcheryProductSchema);
