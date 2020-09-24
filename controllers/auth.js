const User = require('../models/User');


exports.isAuth = (req, res, next) => {
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Para poder realizar esto debes de logearte' });
}


exports.checkRoles = role => (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
        return next();
    } else {
        res.status(401).json({ msg: 'Tu tipo de usuario no puede realizar esta acción' });
    }
}