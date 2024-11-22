const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactions')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/new', transactionController.newTransaction)
router.get('/history', transactionController.transactionHistory)

module.exports = router
