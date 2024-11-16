const express = require('express')
const router = express.Router()
const Listing = require('../models/listing')
const bcrypt = require('bcrypt')

//create page
const create = async (req, res) => {
  req.body.owner = req.session.user._id
  await Listing.create(req.body)
  res.redirect('/listings')
}
const newListing = (req, res) => {
  res.render('listings/new.ejs')
}
//create page

//main page
const index = async (req, res) => {
  const populatedListings = await Listing.find({}).populate('owner')
  res.render('listings/index.ejs', { listings: populatedListings })
}
//main page

//show page
const show = async (req, res) => {
  const populatedListing = await Listing.findById(
    req.params.listingsId
  ).populate('owner')
  const userHasFavorited = populatedListing.favoritedByUsers.some((user) =>
    user.equals(req.session.user._id)
  )
  const userHasDisliked = populatedListing.dislikedByUsers.some((user) =>
    user.equals(req.session.user._id)
  )
  res.render('listings/show.ejs', {
    listing: populatedListing,
    userHasFavorited,
    userHasDisliked
  })
}
const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.listingsId)
  if (listing.owner.equals(req.session.user._id)) {
    await listing.deleteOne()
    res.redirect('/listings')
  } else {
    res.send("You don't have permission to do that.")
  }
}

const showEdit = async (req, res) => {
  const currentListing = await Listing.findById(req.params.listingsId)
  res.render('listings/edit.ejs', {
    listing: currentListing
  })
}

const edit = async (req, res) => {
  const currentListing = await Listing.findById(req.params.listingsId)
  if (currentListing.owner.equals(req.session.user._id)) {
    await currentListing.updateOne(req.body)
    res.redirect('/listings')
  } else {
    res.send("You don't have permission to do that.")
  }
}

const favoritedBy = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.listingsId, {
    $push: { favoritedByUsers: req.params.userId }
  })
  res.redirect(`/listings/${req.params.listingsId}`)
}

const unfavorite = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.listingsId, {
    $pull: { favoritedByUsers: req.params.userId }
  })
  res.redirect(`/listings/${req.params.listingsId}`)
}
const dislikedBy = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.listingsId, {
    $push: { dislikedByUsers: req.params.userId }
  })
  res.redirect(`/listings/${req.params.listingsId}`)
}
const removeDisliked = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.listingsId, {
    $pull: { dislikedByUsers: req.params.userId }
  })
  res.redirect(`/listings/${req.params.listingsId}`)
}
module.exports = {
  create,
  new: newListing,
  index,
  show,
  showEdit,
  edit,
  delete: deleteListing,
  favoritedBy,
  unfavorite,
  dislikedBy,
  removeDisliked
}
