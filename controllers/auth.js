const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
  try {
    res.render('auth/sign-up.ejs')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const newUser = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (userInDatabase) {
      return res.send('Username already taken')
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and confirm password must match')
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const user = await User.create(req.body)
    res.redirect('/auth/sign-in')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const signIn = async (req, res) => {
  try {
    res.render('auth/sign-in.ejs')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const signingIn = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (!userInDatabase) {
      return res.send('Login failed, Please try again')
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      return res.send('Login failed, Please try again')
    }
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    }
    req.session.successMessage = 'Signed in successfully'
    res.redirect('/recipes')
  } catch (err) {
    req.session.errMessage = 'Please try again later'
    console.log(err)
  }
}

const signOut = async (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
}

const vipLounge = async (req, res) => {
  try {
    res.send(`Welcome to the party ${req.session.user.username}`)
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const homePage = async (req, res) => {
  try {
    res.redirect('/auth/sign-up')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  homePage,
  signUp,
  newUser,
  signIn,
  signingIn,
  signOut,
  vipLounge
}
