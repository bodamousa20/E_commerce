const checkAdminRole = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "unauthorized" });
    }
    next();
};

module.exports = { checkAdminRole }