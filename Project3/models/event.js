const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    details: {type: String, required: [true, 'details is requried']},
    startTime: {type: Date, required: [true, 'start Time is required']},
    endTime: {type: Date, required: [true, 'end time is required']},
    hostName: {type: String, required: [true, 'host name is required']},
    location: {type: String, required: [true, 'location is required']},
    category: {type: String, required: [true, 'category is required'], 
        enum: ['American Recipe', 'Foreign Recipe', 'Quick And Easy', 'Favorites']},
    image: {type: String, requried: [true, 'image is requried']}
}
);
//collection name is events in the database
module.exports = mongoose.model('Event', eventSchema);
