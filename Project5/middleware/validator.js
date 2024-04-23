//check if the route parameter is a valid ObjectId
const { body, validationResult } = require('express-validator');

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

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateLogin = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateResult = (req, res, next) =>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);  
        });
        return res.redirect('back');
    } else{
        return next();
    }
};

exports.validateEvent = [body('title', 'Tile cannot be empty').notEmpty().trim().escape(),
body('details', 'Details must be at least 10 characters').isLength({min: 10}).trim().escape(),
body('startTime', 'Start time must be after todays date').isISO8601().isAfter(Date().toString()).escape(),
body('endTime', 'End time must be after start time').custom((value, { req }) =>{
    if (!validationResult.isISO8601(value)){
        throw new Error('Invaild date format');
    }
    const start = new Date(req.body.startTime);
    const end = new Date(value);
    if(end <= start){
        throw new Error('Event end date must be after start date');
    }
    return true;
}),
body('location', 'Location cannot be empty').isEmpty().trim().escape(),
body('category', 'Must choose a valid category from list').isIn(['American Recipe', 'Foreign Recipe', 'Quick And Easy', 'Favorites', 'Books']).escape()];

exports.validateRSVP = [body('rsvp').notEmpty().trim().isIn(['YES', 'NO', 'MAYBE']).escape(),
body('user').notEmpty().trim().escape(),
body('event').notEmpty().trim().escape()];