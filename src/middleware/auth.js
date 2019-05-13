const jwt = require('jsonwebtoken')
const User = require('../models/user')

//adding a route middleware
const auth = async (req, res, next) => {
    try {
       //firstly is to get the token given by the user
       const token = req.header('Authorization').replace('Bearer ', '')
       //decoding the token to get id and secret value
       const decoded = jwt.verify( token, process.env.SECRET )
       //compare if the decoded value exist in the database and get user
       const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

       if ( !user ) {
           throw new Error('Profile dosen\'t exist')
       }

       userToken = token
       userProfile = user

        next()
    } catch (error) {
        res.status(401).send({ Error: 'Please Make sure you are correctly logged In'})
    }
    //move on
    
}

module.exports = auth;