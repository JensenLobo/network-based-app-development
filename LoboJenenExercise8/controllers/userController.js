const User = require('../models/user');

exports.new = (req, res)=>{
    res.render('./user/new');
};

exports.login = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    //get the user that matches the email
    User.findOne({email: email})
    .then(user=>{
        if(user){
            //user found in the database
            user.comparePassword(password)
            .then(result=>{
                if(result){
                    req.session.user = user._id; //store user's id in the session
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('./profile');
                }
                else{
                    console.log('wrong password');
                    req.flash('error', 'Wrong Password!');
                    res.redirect('./login');
                }
            })
        }
        else{
            console.log('wrong email address');
            req.flash('error', 'Wrong Email Address!');
            res.redirect('./login');
        }
    })
    .catch(err=>next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    User.findById(id)
    .then(user=>res.render('./user/profile', {user}))
    .catch(err=>next(err));
};

exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err)
            return next(err);
        else
            res.redirect('./login');
    });
};

exports.create = (req, res, next)=>{
    let user = new User(req.body);
    user.save()
    .then(()=>res.redirect('./login'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('./new');
        }

        if(err.code === 11000){
            req.flash('error', 'Email address has been used');
            return res.redirect('./new');
        }

        next(err);

    });
};

exports.loginPage = (req, res)=>{
    res.render('./user/login');
};