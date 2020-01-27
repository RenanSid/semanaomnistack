const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required:true
    },
    coordinates: {
        type: ['number'],
        required: true
    },  
});

module.exports = pointSchema;