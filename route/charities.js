const express = require('express')
const router = express.Router()
const charityController = require('../controllers/charities')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', charityController.newCharity)
router.get('/list', charityController.listCharity)

module.exports = router
