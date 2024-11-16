const mongoose = require('mongoose')
const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)
const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient
