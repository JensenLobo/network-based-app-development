const model = require('../models/event');
const user = require('../models/user');
const Rsvp = require('../models/rsvp');

exports.index = (req, res)=>{
    model.find()
    .then(events=> res.render('./event/index', {events}))
    .catch(err=>next(err));
};

exports.new = (req, res)=>{
    res.render('./event/new');
};

exports.create = (req, res, next)=>{
    let event = new model(req.body) //create a new event document
    event.hostName = req.session.user;
    let image = './images/' + req.file.filename
    console.log(req.body)
    let start = new Date(req.body.start)
    let end = new Date(req.body.end)
    
    event.image = image
    event.save()
    .then((event) => {
        req.flash('success', 'Event was created Successfully');
        res.redirect('/events')
    })
    .catch((err) => {
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
    console.log(event)
};

exports.show = (req, res, next)=>{
    //res.send('send event with id ' + req.params.id);
    let id = req.params.id;
    

    model.findById(id).populate('hostName', '_id firstName lastName')
    .then((event) => {
      if (event) {
        console.log('the event is ' + event)
        Rsvp.countDocuments({ event: id, status: "YES"})
        .then((count)=>{
            return res.render('./event/show', { event, count })
        })
        .catch(err=> next(err));
      } else {
        let err = new Error('Cannot find event with id ' + id)
        err.status = 404
        next(err)
      }
    })
    .catch((err) => next(err))
    
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(event => {
        if(event){
            res.render('./event/edit', {event});
        } else {
            let err = new Error('Cannot find the event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err))
    
};

exports.update = (req, res, next)=>{
    
    let image = './images/' + req.file.filename
    let event = {...req.body, image}
    let id = req.params.id;
    
    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event =>{
        if(event){
            event.image = image
            req.flash('success', 'Event was updated successfully!');
            res.redirect('/events/' +id);
        }
        else {
            let err = new Error('Cannot find the event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });

};

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event =>{
        if(event){
            Rsvp.deleteMany({ event: id})
            .then(()=>{
                req.flash('success', 'Event deleted successfully!');
                res.redirect('/events');
            })
            .catch(err=>next(err));
        }
        else{
            let err = new Error('Cannot find the event with id ' + id);
        err.status = 404;
        next(err);
    }   
    })
    .catch(err=> next(err))
        
};

exports.rsvp = (req, res, next) => {
    let id = req.params.id;

    model.findById(id)
    .then(event=>{
        if (event){
            let action = req.params.action;
            let filter = {user: req.session.user, event: id };
            let update = {};
            update.status = action;
            update.event = id;
            update.user = req.session.user;
            Rsvp.findOneAndUpdate(filter, update, {new: true, upsert: true})
            .then(()=>{
                req.flash('success', 'RSVP updated successfully!');
                res.redirect('/users/profile');
            })
            .catch(err => next(err));
        } else{
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
        })
    .catch(err => next(err));
};
