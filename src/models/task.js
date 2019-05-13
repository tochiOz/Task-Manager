const mongoose = require('mongoose');
const User = require('./user')

mongoose.connect( process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
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
        ref: 'users'
    }
}, {
    timestamps: true
});

const Task = mongoose.model( 'tasks', taskSchema )

module.exports = Task;