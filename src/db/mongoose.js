const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect( process.env.MONGO_URL , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})


//here we define the mongoose models of the data to be inputted to the db
//it set types like string, binary, array, number, boolean and so on.
// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         // validate(value) {
//         //     if(value.toLowerCase.includes(name)) {
//         //         throw new Error('This is not a valid name')
//         //     }
//         // }
//     },

//     age: {
//         type: Number
//     }
// })

// const User = mongoose.model('task', {
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if(!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },

//     password: {
//         type: String,
//         default: 1234567890,
//         minLength: 4,
//         lowercase: true,
//         validate(value) {
//             if (value === 'password') {
//                 throw new Error('Please check your password and try again')
//             }
//         }
//     }
// })

// const nameQuery = new User({
//     email: ' EFHJ@NOIN.VM  ',
//     password: 'hoiuupiolknkYUVILHIl'
// })

// nameQuery.save().then(() => {
//     console.log(nameQuery)
// }).catch((err) => {
//     console.log(err)
// })