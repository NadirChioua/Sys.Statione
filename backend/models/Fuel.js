import mongoose from 'mongoose';

const fuelSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    pricePerLiter: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Fuel', fuelSchema);
