const listCharity = async (req, res) => {
  try {
    res.render('charity/list-charity.ejs')
  } catch (err) {
    console.log(err)
  }
}

const newCharity = async (req, res) => {
  try {
    res.render('charity/new-charity.ejs')
  } catch (err) {
    console.log(err)
  }
}
const createCharity = async (req, res) => {
  try {
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  listCharity,
  newCharity,
  createCharity
}
