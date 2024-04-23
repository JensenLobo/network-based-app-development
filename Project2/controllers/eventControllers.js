const model = require('../models/event');

exports.index = (req, res)=>{
    //res.send('send all events');
    //let events = model.find();
    const allEvents = model.getEvents();
    const distinctCategories = model.getDistinctCategories();
    res.render('./event/index', {events: allEvents, categories: distinctCategories});
};

exports.new = (req, res)=>{
    res.render('./event/new');
};

exports.create = (req, res)=>{
    //res.send('Created a new event');
    let event = { ...req.body, image: req.file.path }; 
    model.save(event);
    res.redirect('/events');
};

exports.show = (req, res, next)=>{
    //res.send('send event with id ' + req.params.id);
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./event/show', {event});
    } else {
        let err = new Error('Cannot find the event with id ' + id);
        err.status = 404;
        next(err);
    }
    
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./event/edit', {event});
    } else {
        let err = new Error('Cannot find the event with id ' + id);
        err.status = 404;
        next(err);
    }
    
    
};

exports.update = (req, res, next)=>{
    //res.send('update event with id ' + req.params.id);
    let event = { ...req.body, image: req?.file?.path };
    let id = req.params.id;
    
    if (model.updateById(id, event)){
        res.redirect('/events/' +id);
    } else {
        let err = new Error('Cannot find the event with id ' + id);
        err.status = 404;
        next(err);
    }

};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/events');
    }else {
        let err = new Error('Cannot find the event with id ' + id);
        err.status = 404;
        next(err);
    }
};