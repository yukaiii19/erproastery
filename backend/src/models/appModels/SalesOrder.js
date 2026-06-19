const mongoose = require('mongoose');

const salesOrderSchema = new mongoose.Schema({
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
  expectedShipDate: {
    type: Date,
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
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
      description: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  subTotal: {
    type: Number,
    default: 0,
  },
  taxTotal: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: 'NA',
    uppercase: true,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'pending_approval', 'approved', 'rejected', 'fulfilled'],
    default: 'pending_approval',
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

salesOrderSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('SalesOrder', salesOrderSchema);
