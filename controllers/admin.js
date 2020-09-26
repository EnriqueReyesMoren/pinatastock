
const Asset = require("../models/Asset")

const Category = require("../models/Category")


exports.getInvalidProducts = async (req, res) => {
  const assets = await Asset.find({ valid: false }).populate("creator")
  console.log(assets)
  res.status(200).json({ assets })
}


exports.checkValidAssets = async (req, res) => {
     const { assetId } = req.params
    const categoryFind = await Asset.findById(assetId)
    const categoryName = categoryFind.category
    const findAssets = await Asset.findByIdAndUpdate(assetId, {
        valid: true,
    },{new: true}) 
    console.log(categoryName)
    const newCategory = await Category.create({

     name: categoryName,
    }
   
    )

    await Category.findByIdAndUpdate(newCategory._id,{
      $push: {
                asset: assetId
            }
    })
    
    res.status(200).json({findAssets})
}

