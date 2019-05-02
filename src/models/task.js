const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-db', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Task = mongoose.model('task', {
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
    }
})

module.exports = Task