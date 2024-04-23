const express = require('express');
const controller = require('../controllers/eventControllers');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const router = express.Router();

//GET /events: send all events to the user

router.get('/', controller.index);

//GET /events/new: send html form for creating a new event

router.get('/new', controller.new);

//POST /events: create a new event

router.post('/', upload.single('image'), controller.create);

//GET /events/:id: send details of an event identified by id
router.get('/:id', controller.show);

//GET /events/:id/edit: send html form for editing an existing event
router.get('/:id/edit', controller.edit);

//PUT /events/:id: update the event identified by id
router.put('/:id',upload.single('image'), controller.update);

//DELETE /event/:id: delete the event identified by id
router.delete('/:id', controller.delete);



module.exports = router;