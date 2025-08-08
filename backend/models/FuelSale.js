import mongoose from 'mongoose';

const fuelSaleSchema = new mongoose.Schema(
  {
    fuel: { type: mongoose.Schema.Types.ObjectId, ref: 'Fuel', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('FuelSale', fuelSaleSchema);
