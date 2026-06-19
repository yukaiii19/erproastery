const mongoose = require('mongoose');

const fulfillmentSchema = new mongoose.Schema({
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
  salesOrder: {
    type: mongoose.Schema.ObjectId,
    ref: 'SalesOrder',
    autopopulate: true,
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
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
      quantityShipped: {
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
    enum: ['draft', 'picked', 'packed', 'shipped', 'delivered'],
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

fulfillmentSchema.plugin(require('mongoose-autopopulate'));

fulfillmentSchema.post('save', async function (doc, next) {
  try {
    const Product = mongoose.model('Product');
    for (const item of doc.items) {
      if (item.product && item.quantityShipped) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stockQuantity = (product.stockQuantity || 0) - item.quantityShipped;
          await product.save();
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Fulfillment', fulfillmentSchema);
