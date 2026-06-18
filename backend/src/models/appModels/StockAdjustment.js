const mongoose = require('mongoose');

const stockAdjustmentSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin', required: true },
  number: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  warehouse: {
    type: mongoose.Schema.ObjectId,
    ref: 'Warehouse',
    required: true,
    autopopulate: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
      itemName: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['increase', 'decrease'],
        required: true,
        default: 'increase',
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ['draft', 'pending', 'completed', 'cancelled'],
    default: 'draft',
  },
  notes: {
    type: String,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

stockAdjustmentSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('StockAdjustment', stockAdjustmentSchema);
