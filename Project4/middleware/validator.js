//check if the route parameter is a valid ObjectId
exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        req.flash('error', err.message);
        res.redirect('back');
        return next(err);
    } else{
        return next();
    }
};