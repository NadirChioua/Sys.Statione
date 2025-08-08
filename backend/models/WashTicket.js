import mongoose from 'mongoose';

const washTicketSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'done'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model('WashTicket', washTicketSchema);
