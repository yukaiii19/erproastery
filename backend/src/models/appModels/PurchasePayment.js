const mongoose = require('mongoose');

const purchasePaymentSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },

  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin', autopopulate: true, required: true },
  number: {
    type: Number,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier',
    autopopulate: true,
    required: true,
  },
  purchaseInvoice: {
    type: mongoose.Schema.ObjectId,
    ref: 'PurchaseInvoice',
    required: true,
    autopopulate: true,
  },
  paymentMode: {
    type: mongoose.Schema.ObjectId,
    ref: 'PaymentMode',
    autopopulate: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'NA',
    uppercase: true,
    required: true,
  },
  ref: {
    type: String,
  },
  description: {
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
purchasePaymentSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('PurchasePayment', purchasePaymentSchema);
