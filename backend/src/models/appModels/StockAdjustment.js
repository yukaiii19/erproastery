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

stockAdjustmentSchema.post('save', async function (doc, next) {
  try {
    const Product = mongoose.model('Product');
    for (const item of doc.items) {
      if (item.product && item.quantity) {
        const product = await Product.findById(item.product);
        if (product) {
          const change = item.type === 'increase' ? item.quantity : -item.quantity;
          product.stockQuantity = (product.stockQuantity || 0) + change;
          await product.save();
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('StockAdjustment', stockAdjustmentSchema);
