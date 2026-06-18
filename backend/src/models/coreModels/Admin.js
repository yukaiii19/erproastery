const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: false,
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  name: { type: String, required: true },
  surname: { type: String },
  photo: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: 'owner',
    enum: [
      'owner',
      'admin',
      'sales_representative',
      'sales_manager',
      'purchasing_manager',
      'inventory_manager',
      'ar_analyst',
      'ap_analyst',
      'accounting_manager'
    ],
  },
});

module.exports = mongoose.model('Admin', adminSchema);
