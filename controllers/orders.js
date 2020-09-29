const { Order, CartItem } = require('../models/order');

// sendgrid for email npm i @sendgrid/mail
/* const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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'); */

exports.findOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    msg: "No es posible mostrar productos"
                });
            }
            req.order = order;
            next();
        });
};

exports.createOrder = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                msg: "Error al actualizar"
            });
        }
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        /* const emailData = {
            to: 'kaloraat@gmail.com',
            from: 'noreply@ecommerce.com',
            subject: `A new order is received`,
            html: `
            <p>Customer name:</p>
            <p>Total products: ${order.products.length}</p>
            <p>Total cost: ${order.amount}</p>
            <p>Login to dashboard to the order in detail.</p>
        `
        };
        sgMail.send(emailData); */
        res.json(data);
    });
};

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    msg:  "Error al listar ordenes"
                });
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                msg: "Error al actualizar"
            });
        }
        res.json(order);
    });
};