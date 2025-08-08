import mongoose from 'mongoose';

const fuelEntrySchema = new mongoose.Schema(
  {
    fuel: { type: mongoose.Schema.Types.ObjectId, ref: 'Fuel', required: true },
    quantity: { type: Number, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('FuelEntry', fuelEntrySchema);
