// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');
const siteRoutes = require('./routes/siteRoutes');


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
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use('/', siteRoutes);

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
