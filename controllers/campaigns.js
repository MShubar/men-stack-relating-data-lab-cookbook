const listCampaign = async (req, res) => {
  try {
    res.render('campaign/list-campaign.ejs')
  } catch (err) {
    console.log(err)
  }
}

const newCampaign = async (req, res) => {
  try {
    res.render('campaign/new-campaign.ejs')
  } catch (err) {
    console.log(err)
  }
}
const createCampaign = async (req, res) => {
  try {
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  listCampaign,
  newCampaign,
  createCampaign
}
