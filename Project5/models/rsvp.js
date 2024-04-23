const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    event: {type: Schema.Types.ObjectId, ref: 'Event', require: true},
    status: {type: String, required: [true, 'status is required'],
        enum: ['YES', 'NO', 'MAYBE']}
});

module.exports = mongoose.model('Rsvp', rsvpSchema);