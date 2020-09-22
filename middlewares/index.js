exports.catchErrors = ctlr => (req, res, next) => ctlr(req, res).catch(next)
