const express = require('express')
const router = express.Router()
const campaignController = require('../controllers/campaigns')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', campaignController.newCampaign)
router.get('/list', campaignController.listCampaign)

module.exports = router
