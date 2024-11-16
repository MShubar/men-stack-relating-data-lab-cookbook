const express = require('express')
const router = express.Router()
const ingredientController = require('../controllers/ingredients')
const multer = require('multer')

// Middleware setup
router.use(express.urlencoded({ extended: false }))

// Configure multer for file uploads
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

// Define routes
router.post('/', upload.single('image'), ingredientController.create) // Create ingredient
router.get('/new', ingredientController.new) // New ingredient page
router.get('/', ingredientController.index) // List all ingredients
router.get('/:ingredientsId', ingredientController.show) // Show single ingredient
router.get('/:ingredientsId/edit', ingredientController.showEdit) // Edit ingredient page
router.put('/:ingredientsId', ingredientController.edit) // Edit ingredient
router.delete('/:ingredientsId', ingredientController.delete) // Delete ingredient

module.exports = router
