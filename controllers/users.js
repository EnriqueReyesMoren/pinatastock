const User = require('../models/User');

exports.updateUserCreative = async(req, res) => {
    const { name, portfolio, description } = req.body
        /*  const { path: image } = req.file */
    await User.findByIdAndUpdate(req.params.userId, {
        name,
        description,
        portfolio,
        role: "creator"
    })

    .then((user) => res.status(200).json({ user }))
        .catch((err) => res.status(500).json({ err }));
}


exports.updateUserNegocio = async(req, res) => {
    const { name, description, phone, address } = req.body
        /*  const { path: image } = req.file */
    await User.findByIdAndUpdate(req.params.userId, {
        name,
        description,
        phone,
        address,
        role: "business"
    })

    .then((user) => res.status(200).json({ user }))
        .catch((err) => res.status(500).json({ err }));
}