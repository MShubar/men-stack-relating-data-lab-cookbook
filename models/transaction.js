const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
  {
    AccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    ReceiverAccountID: { type: String, required: true },
    CampaignID: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
    Amount: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
