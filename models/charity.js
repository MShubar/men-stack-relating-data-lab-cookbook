const mongoose = require('mongoose')

const charitySchema = new mongoose.Schema(
  {
    CharityName: { type: String, required: true },
    RegistrationID: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' },
    Location: { type: String, required: true },
    PhoneNumber: { type: Number, required: true },
    Balance: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

const Charity = mongoose.model('Charity', charitySchema)

module.exports = Charity
