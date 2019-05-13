const mongoose = require('mongoose');
const validator = require('validator');
const bcrpyt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

mongoose.connect( process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
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
        trim: true,
        minLength: '4',
        required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Please check your password and try again')
            }
        }
    },

    //this is used to store the generated token back to the login user
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    //help to store the binary image data

    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

//using virtual to create a relationship between user and owned directories
userSchema.virtual('tasks', {
    ref: 'tasks',
    localField: '_id',
    foreignField: 'owner'
})

//creating a method accessing userSchema to find a single user
userSchema.statics.findByCredentials = async ( email, password ) => {
    //locate the specific user
    const user = await User.findOne({ email })

    if ( !email ) {
        throw new Error('Email does not exist')
    }

    //Password comparism with inputed password
    const isMatch = await bcrpyt.compare( password, user.password )

    if ( !isMatch ) {
        throw new Error('Invalid Password')
    }

    return user;
}

//methods to generate token
//NB: statics. method are accessed by the modules/modules method while 
//methods. are accessed by the instances/instance module

userSchema.methods.generateAuthToken = async function () {

    //create a container used to access the user
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET , { expiresIn: '1 week'})
    //save the generated token by concatenation
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token;
}

//methods to hide private data
userSchema.methods.toJSON = function () {
    const user = this

    //changing them to an object
    const userObject = user.toObject()

    //Hide data displayed
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

//creating a middleware where a check is made before accessing restricted pages
userSchema.pre('save', async function (next) {
    const user = this
    // return console.log(JSON.stringify(user))
    if (user.isModified('password')) {
        // return console.log(user.password)
        user.password = await bcrpyt.hash( user.password, 8 )
    }

    //move on to the next route
    next()
})

//creating a middleware to delete tasks as user is deleted
userSchema.pre('remove', async function ( next ) {
    const user = this

    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('users', userSchema);

module.exports = User;