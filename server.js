//require
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()
const port = process.env.PORT ? process.env.PORT : '3000'
const session = require('express-session')
const path = require('path')
const multer = require('multer')

//middleware require
const userController = require('./controllers/auth')
const authRouter = require('./route/auth')
const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')
const errorMessage = require('./middleware/error-message')
const sucMessage = require('./middleware/success-message')
const recipeRouter = require('./route/recipes')
const ingredientRouter = require('./route/ingredients')

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(express.static(path.join(__dirname, 'public')))
app.use(passUserToView)
app.use('/auth', authRouter)
app.use('/recipes', isSignedIn, recipeRouter)
app.use('/ingredients', isSignedIn, ingredientRouter)
app.use(errorMessage)
app.use(sucMessage)

//mongodb
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connection to MongoDB ${mongoose.connection.name}`)
})

//listener
app.listen(port, () => {
  console.log(`Listening on Localhost:${port}`)
})

app.get('/', userController.homePage)
