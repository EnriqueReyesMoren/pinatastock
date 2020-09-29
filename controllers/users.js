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


//===============================Order and user features ===================

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};

exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};