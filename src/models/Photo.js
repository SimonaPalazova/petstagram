const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters'],
    },
    image:{
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Invalid URL'],
        /*
        validate: {
            validator: function (v) {
              const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
              return urlRegex.test(v);
            },
            message: (props) => `${props.value} is not a valid URL`,
        },
    */
    },
    age:{
        type: Number,
        required: [true, 'Age is required!'],
        min: 1,
        max: 100,
    },
    description:{
        type: String,
        required: [true,'Description is required!'],
        minLength: [5, 'Description must be at least 10 characters long!'],
        maxLength: [50, 'Description must be at max 50 characters long'],
    },
    location :{
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'Location must be at least 10 characters long!'],
        maxLength: [50, 'Location must be at max 50 characters long'],
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User',
            },
            message:{
                type: String,
                required: [true, 'Command message is required!'],
            },
        }
    ]
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;