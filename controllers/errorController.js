exports.get404 = (req, res, next) => {
    res.json({success: false ,errorMessage: "this is an error"})
};
