const express = require('express')
const app = express()
const router = express.Router()
const listingController = require('../controllers/listings')

router.post('/', listingController.create)
router.get('/new', listingController.new)
router.get('/', listingController.index)
router.get('/:listingsId', listingController.show)
router.get('/:listingsId/edit', listingController.showEdit)
router.put('/:listingsId', listingController.edit)
router.delete('/:listingsId', listingController.delete)
router.post('/:listingsId/favorited-by/:userId', listingController.favoritedBy)
router.delete('/:listingsId/favorited-by/:userId', listingController.unfavorite)
router.post('/:listingsId/disliked-by/:userId', listingController.dislikedBy)
router.delete(
  '/:listingsId/disliked-by/:userId',
  listingController.removeDisliked
)
module.exports = router
