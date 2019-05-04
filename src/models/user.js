const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-db', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('users', {
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },

    password: {
        type: String,
        default: '1234567890',
        minLength: '4',
        lowercase: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Please check your password and try again')
            }
        }
    }
});

module.exports = User;