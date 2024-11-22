const transactionHistory = async (req, res) => {
  try {
    res.render('transactions/index.ejs')
  } catch (err) {
    console.log(err)
  }
}

const newTransaction = async (req, res) => {
  try {
    res.render('transactions/new.ejs')
  } catch (err) {
    console.log(err)
  }
}
const createTransaction = async (req, res) => {
  try {
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  transactionHistory,
  newTransaction,
  createTransaction
}
