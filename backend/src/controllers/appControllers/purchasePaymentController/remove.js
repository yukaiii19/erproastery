const mongoose = require('mongoose');

const Model = mongoose.model('PurchasePayment');
const PurchaseInvoice = mongoose.model('PurchaseInvoice');

const remove = async (req, res) => {
  // Find document by id and updates with the required fields
  const previousPurchasePayment = await Model.findOne({
    _id: req.params.id,
    removed: false,
  });

  if (!previousPurchasePayment) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No document found ',
    });
  }

  const { _id: purchasePaymentId, amount: previousAmount } = previousPurchasePayment;
  const { id: purchaseInvoiceId, total, discount, credit: previousCredit } = previousPurchasePayment.purchaseInvoice;

  // Find the document by id and delete it
  let updates = {
    removed: true,
  };
  // Find the document by id and delete it
  const result = await Model.findOneAndUpdate(
    { _id: req.params.id, removed: false },
    { $set: updates },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();
  // If no results found, return document not found

  let purchasePaymentStatus =
    total - discount === previousCredit - previousAmount
      ? 'paid'
      : previousCredit - previousAmount > 0
      ? 'partially'
      : 'unpaid';

  const updatePurchaseInvoice = await PurchaseInvoice.findOneAndUpdate(
    { _id: purchaseInvoiceId },
    {
      $pull: {
        payment: purchasePaymentId,
      },
      $inc: { credit: -previousAmount },
      $set: {
        paymentStatus: purchasePaymentStatus,
      },
    },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();

  return res.status(200).json({
    success: true,
    result,
    message: 'Successfully Deleted the document ',
  });
};
module.exports = remove;
