const model = require('../models/event');

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
    let image = './images/' + req.file.filename
    console.log(req.body)
    let start = new Date(req.body.start)
    let end = new Date(req.body.end)
    
    event.image = image
    event.save()
    .then((event) => res.redirect('/events'))
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
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then((event) => {
      if (event) {
        console.log('the event is ' + event)
        return res.render('./event/show', { event })
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
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
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
    //res.send('update event with id ' + req.params.id);
    //let event = { ...req.body, image: req?.file?.path };
    let image = './images/' + req.file.filename
    let event = {...req.body, image}
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event =>{
        if(event){
            event.image = image
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

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event =>{
        if(event){
            res.redirect('/events');
        }
        else{
            let err = new Error('Cannot find the event with id ' + id);
        err.status = 404;
        next(err);
    }   
    })
    .catch(err=> next(err))
        
};