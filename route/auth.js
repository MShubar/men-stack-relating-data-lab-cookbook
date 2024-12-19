const express = require('express')
const app = express()
const router = express.Router()
const userController = require('../controllers/auth')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/sign-up', userController.signUp)
router.post('/sign-up', userController.newUser)
router.get('/sign-in', userController.signIn)
router.post('/sign-in', userController.signingIn)
router.get('/sign-out', isSignedIn, userController.signOut)
router.get('/vip-lounge', isSignedIn, userController.vipLounge)

module.exports = router
