const User = require("../models/User")
const Asset = require("../models/Asset")

exports.getAssets = async(req, res) => {
    const assets = await Asset.find()
    res.status(200).json({ assets })
}

exports.getAsset = async(req, res) => {
    const assets = await Asset.findById(
        req.params.assetsId)
    res.status(200).json({ assets })
}


exports.createAsset = async(req, res) => {
    // 1. extraer la informacion
    const { name, description, price, quantity, sold } = req.body
        /*  const { path: image } = req.file */
        /*   const { id: creator } = req.user */
        // 2. creamos el producto en base al usuario en sesion
    const newAsset = await Asset.create({
        name,
        description,
        price,
        quantity,
        sold,
        creator: req.user.id
            /*  image, */
            /*  creator, */
    })
    await User.findByIdAndUpdate(req.user.id, {
            $push: {
                publish: newAsset._id
            }
        })
        .then((newAsset) => res.status(200).json({ newAsset }))
        .catch((err) => res.status(500).json({ err }));
}

exports.updateAsset= async (req, res) => {
  const { name, description, price, quantity } = req.body
  console.log(req.body)
  const assets = await Asset.findById(
        req.params.assetsId)
        console.log(assets)
  const { digitalId } = req.params
  const digitalProduct = await Asset.findByIdAndUpdate(
    assets._id,
    {
      name,
      description,
      price,
      quantity
    },
    { new: true }
  )
  console.log(digitalId)
  res.status(200).json({ digitalProduct })
}


exports.deleteAsset = async(req, res) => {
    const { assetId } = req.params
    await Asset.findOneAndRemove(assetId)
    res.status(200).json({ message: "asset deleted" })
}