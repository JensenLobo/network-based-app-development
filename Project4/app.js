// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');
const siteRoutes = require('./routes/siteRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/user');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');



//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let url = 'mongodb+srv://jlobo1:bv6qppzwm5hbvCNV@cluster0.sassofv.mongodb.net/?retryWrites=true&w=majority';
app.set('view engine', 'ejs');

//Connect to mongoDB
mongoose.connect(url)
.then(()=>{
    //start the server
    app.listen(port, host, () =>{
    console.log('Server is running on port ', port);
});
})
.catch(err => console.log(err.message))

//mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb+srv://jlobo1:bv6qppzwm5hbvCNV@cluster0.sassofv.mongodb.net/?retryWrites=true&w=majority'}),
        cookie: {maxAge: 60*60*1000}
    })
);

app.use(flash());

app.use((req, res, next) =>{
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use('/', siteRoutes);

app.use('/users', userRoutes);

app.use('/events', eventRoutes);

app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack)
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});
