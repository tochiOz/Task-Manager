const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-db', {
    useNewUrlParser: true,
    useCreateIndex: true
});

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
        ref: 'User'
    }
});

const Task = mongoose.model( 'tasks', taskSchema )

module.exports = Task;