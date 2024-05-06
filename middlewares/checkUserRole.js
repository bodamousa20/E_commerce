const checkUserRole = (req,res,next) => {
    if(req.user.role !== "user"){
        return res.status(403).json({message: "unauthorized"})
    }
    next()
}

module.exports = {checkUserRole}