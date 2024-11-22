const mongoose = require('mongoose')

const campaignSchema = new mongoose.Schema(
  {
    campaignName: { type: String, required: true },
    CharityID: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' },
    GoalAmount: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

const Campaign = mongoose.model('Campaign', campaignSchema)

module.exports = Campaign
