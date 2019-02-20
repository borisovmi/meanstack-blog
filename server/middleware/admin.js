module.exports = function (req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send("You are not authorized to perfrom this action");
    next();
}