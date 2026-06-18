const mongoose = require('mongoose');

const stockTransferSchema = new mongoose.Schema({
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
  sourceWarehouse: {
    type: mongoose.Schema.ObjectId,
    ref: 'Warehouse',
    required: true,
    autopopulate: true,
  },
  destinationWarehouse: {
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

stockTransferSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('StockTransfer', stockTransferSchema);
