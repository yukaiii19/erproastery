const mongoose = require('mongoose');

const goodsReceiptSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin', required: true },
  number: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  purchaseOrder: {
    type: mongoose.Schema.ObjectId,
    ref: 'PurchaseOrder',
    autopopulate: true,
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier',
    required: true,
    autopopulate: true,
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
      quantityReceived: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['draft', 'received'],
    default: 'draft',
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

goodsReceiptSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('GoodsReceipt', goodsReceiptSchema);
