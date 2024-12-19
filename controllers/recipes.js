const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')

// Create a new recipe page
const create = async (req, res) => {
  req.body.owner = req.session.user._id
  const imageName = req.file.filename
  await Recipe.create({
    ...req.body,
    image: imageName
  })
  res.redirect('/recipes')
}

// Show the new recipe page with ingredients
const newRecipe = async (req, res) => {
  const ingredients = await Ingredient.find()
  res.render('recipes/new.ejs', { ingredients })
}

// Show all recipes
const index = async (req, res) => {
  const populatedRecipes = await Recipe.find({}).populate('owner ingredients')

  res.render('recipes/index.ejs', {
    recipes: populatedRecipes
  })
}

// Show a single recipe
const show = async (req, res) => {
  const populatedRecipe = await Recipe.findById(req.params.recipeId).populate(
    'owner ingredients'
  )
  const userHasFavorited = populatedRecipe.favoritedByUsers.some((user) =>
    user.equals(req.session.user._id)
  )
  const userHasDisliked = populatedRecipe.dislikedByUsers.some((user) =>
    user.equals(req.session.user._id)
  )
  res.render('recipes/show.ejs', {
    recipe: populatedRecipe,
    userHasFavorited,
    userHasDisliked
  })
}

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId)
  if (recipe.owner.equals(req.session.user._id)) {
    await recipe.deleteOne()
    res.redirect('/recipes')
  } else {
    res.send("You don't have permission to do that.")
  }
}

// Show edit page for a recipe
const showEdit = async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId)
  const ingredients = await Ingredient.find()
  res.render('recipes/edit.ejs', { recipe, ingredients })
}

// Edit a recipe
const edit = async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId)
  if (recipe.owner.equals(req.session.user._id)) {
    await recipe.updateOne(req.body)
    res.redirect('/recipes')
  } else {
    res.send("You don't have permission to do that.")
  }
}

// Favorite a recipe
const favoritedBy = async (req, res) => {
  await Recipe.findByIdAndUpdate(req.params.recipeId, {
    $addToSet: { favoritedByUsers: req.params.userId }
  })
  res.redirect(`/recipes/${req.params.recipeId}`)
}

// Unfavorite a recipe
const unfavorite = async (req, res) => {
  await Recipe.findByIdAndUpdate(req.params.recipeId, {
    $pull: { favoritedByUsers: req.params.userId }
  })
  res.redirect(`/recipes/${req.params.recipeId}`)
}

// Dislike a recipe
const dislikedBy = async (req, res) => {
  await Recipe.findByIdAndUpdate(req.params.recipeId, {
    $addToSet: { dislikedByUsers: req.params.userId }
  })
  res.redirect(`/recipes/${req.params.recipeId}`)
}

// Remove dislike from a recipe
const removeDisliked = async (req, res) => {
  await Recipe.findByIdAndUpdate(req.params.recipeId, {
    $pull: { dislikedByUsers: req.params.userId }
  })
  res.redirect(`/recipes/${req.params.recipeId}`)
}

module.exports = {
  create,
  new: newRecipe,
  index,
  show,
  showEdit,
  edit,
  delete: deleteRecipe,
  favoritedBy,
  unfavorite,
  dislikedBy,
  removeDisliked
}
