const mongoose = require('mongoose');

const Model = mongoose.model('PurchasePayment');
const PurchaseInvoice = mongoose.model('PurchaseInvoice');
const custom = require('@/controllers/pdfController');

const { calculate } = require('@/helpers');

const create = async (req, res) => {
  // Creating a new document in the collection
  if (req.body.amount === 0) {
    return res.status(202).json({
      success: false,
      result: null,
      message: `The Minimum Amount couldn't be 0`,
    });
  }

  const currentPurchaseInvoice = await PurchaseInvoice.findOne({
    _id: req.body.purchaseInvoice,
    removed: false,
  });

  const {
    total: previousTotal,
    discount: previousDiscount,
    credit: previousCredit,
  } = currentPurchaseInvoice;

  const maxAmount = calculate.sub(calculate.sub(previousTotal, previousDiscount), previousCredit);

  if (req.body.amount > maxAmount) {
    return res.status(202).json({
      success: false,
      result: null,
      message: `The Max Amount you can add is ${maxAmount}`,
    });
  }
  req.body['createdBy'] = req.admin._id;

  const result = await Model.create(req.body);

  const fileId = 'purchasePayment-' + result._id + '.pdf';
  const updatePath = await Model.findOneAndUpdate(
    {
      _id: result._id.toString(),
      removed: false,
    },
    { pdf: fileId },
    {
      new: true,
    }
  ).exec();
  // Returning successfull response

  const { _id: purchasePaymentId, amount } = result;
  const { id: purchaseInvoiceId, total, discount, credit } = currentPurchaseInvoice;

  let purchasePaymentStatus =
    calculate.sub(total, discount) === calculate.add(credit, amount)
      ? 'paid'
      : calculate.add(credit, amount) > 0
      ? 'partially'
      : 'unpaid';

  const purchaseInvoiceUpdate = await PurchaseInvoice.findOneAndUpdate(
    { _id: req.body.purchaseInvoice },
    {
      $push: { payment: purchasePaymentId.toString() },
      $inc: { credit: amount },
      $set: { paymentStatus: purchasePaymentStatus },
    },
    {
      new: true, // return the new result instead of the old one
      runValidators: true,
    }
  ).exec();

  return res.status(200).json({
    success: true,
    result: updatePath,
    message: 'PurchasePayment PurchaseInvoice created successfully',
  });
};

module.exports = create;
