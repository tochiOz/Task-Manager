const mongoose = require('mongoose');
const User = require('./user')


const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    completed: {
        type: Boolean,
        trim: true,
        lowercase: true,
        default: false
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
}, {
    timestamps: true
});

const Task = mongoose.model( 'tasks', taskSchema )

module.exports = Task;