const Ingredient = require('../models/ingredient')

// Create a new ingredient
const create = async (req, res) => {
  req.body.owner = req.session.user._id
  const imageName = req.file.filename
  await Ingredient.create({
    ...req.body,
    image: imageName,
    ingredients: req.body.ingredients
  })
  res.redirect('/ingredients')
}

// New ingredient page
const newIngredient = (req, res) => {
  res.render('ingredients/new.ejs')
}

// Display all ingredients
const index = async (req, res) => {
  const populatedIngredient = await Ingredient.find({}).populate('owner')
  res.render('ingredients/index.ejs', { ingredients: populatedIngredient })
}

// Show a single ingredient
const show = async (req, res) => {
  const populatedIngredient = await Ingredient.findById(
    req.params.ingredientsId
  ).populate('owner')
  res.render('ingredients/show.ejs', { ingredient: populatedIngredient })
}

// Delete an ingredient
const deleteIngredient = async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.ingredientsId)
  if (ingredient.owner.equals(req.session.user._id)) {
    await ingredient.deleteOne()
    res.redirect('/ingredients')
  } else {
    res.send("You don't have permission to do that.")
  }
}

// Show the edit page for an ingredient
const showEdit = async (req, res) => {
  const currentIngredient = await Ingredient.findById(req.params.ingredientsId)
  res.render('ingredients/edit.ejs', { ingredient: currentIngredient })
}

// Edit an ingredient
const edit = async (req, res) => {
  const currentIngredient = await Ingredient.findById(req.params.ingredientsId)
  if (currentIngredient.owner.equals(req.session.user._id)) {
    await currentIngredient.updateOne(req.body)
    res.redirect('/ingredients')
  } else {
    res.send("You don't have permission to do that.")
  }
}

module.exports = {
  create,
  new: newIngredient,
  index,
  show,
  showEdit,
  edit,
  delete: deleteIngredient
}
