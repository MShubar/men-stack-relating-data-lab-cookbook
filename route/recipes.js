const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipes')
const multer = require('multer')

// Middleware setup
router.use(express.urlencoded({ extended: false }))

// Configure multer for file uploads (optional, only if you need an image for recipes)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
    console.log(file)
  }
})

const upload = multer({ storage: storage })

// Define routes for recipes
router.post('/', upload.single('image'), recipeController.create) // Create recipe
router.get('/new', recipeController.new) // New recipe page
router.get('/', recipeController.index) // List all recipes
router.get('/:recipeId', recipeController.show) // Show single recipe
router.get('/:recipeId/edit', recipeController.showEdit) // Edit recipe page
router.put('/:recipeId', recipeController.edit) // Edit recipe
router.delete('/:recipeId', recipeController.delete) // Delete recipe

// Favorite and unfavorite routes
router.post('/:recipeId/favorite/:userId', recipeController.favoritedBy) // Add favorite
router.post('/:recipeId/unfavorite/:userId', recipeController.unfavorite) // Remove favorite

// Dislike and remove dislike routes
router.post('/:recipeId/dislike/:userId', recipeController.dislikedBy) // Add dislike
router.post('/:recipeId/removeDislike/:userId', recipeController.removeDisliked) // Remove dislike

module.exports = router
