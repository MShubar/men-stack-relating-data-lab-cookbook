const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instructions: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
      }
    ],
    image: { type: String },
    favoritedByUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    dislikedByUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
)

const recipe = mongoose.model('recipe', recipeSchema)

module.exports = recipe
