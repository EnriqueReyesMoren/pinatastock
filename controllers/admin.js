
const Asset = require("../models/Asset")


exports.getInvalidProducts = async (req, res) => {
  const assets = await Asset.find({ valid: false }).populate("creator")
  console.log(assets)
  res.status(200).json({ assets })
}


exports.checkValidAssets = async (req, res) => {
     const { assetId } = req.params
    const findAssets = await Asset.findByIdAndUpdate(assetId, {
        valid: true
    },{new: true}) 
    console.log(findAssets)
    res.status(200).json({findAssets})
}

