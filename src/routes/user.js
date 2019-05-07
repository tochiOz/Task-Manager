const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth')

//simple testing router
router.post('/user', async ( req, res ) => {
    res.send('Testing')
});

//This is used to create a user login details
router.post('/user/create', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();

        //generating a new token for the saved user
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (err) {
        res.status(400).send(err.message)
    }
});

//This is used Log-In 
router.post('/user/login', async (req, res) => {
    
    try {
        const user = await User.findByCredentials( req.body.email, req.body.password )
        //token handler
        const token = await user.generateAuthToken()

        res.status(200).send({
            Message: 'User Gotten successfully',
            user,
            token
        })
    } catch( e ) {
        res.status(500).send(e)
    }
});

//This is used to read all Users
router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        
        res.status(200).send({
            Message: 'Users Gotten successfully',
            users
        })
    } catch( e ) {
        res.status(500).send(e)
    }
});

//This is used to log-Out a single user
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        //filtering away the used/active token
        userProfile.tokens = []
        // return console.log(tokens)
        await userProfile.save( )
        res.send()
        console.log('User Logged Out ALL')
    } catch (e) {
        res.status(500).send(e)
    }
});

//This is used to log-Out from all sessions 
router.post('/user/logout', auth, async (req, res) => {
    try {
        //filtering away the used/active token
        userProfile.tokens = userProfile.tokens.filter((token) => {
            return token.token !== userToken
        })

        await userProfile.save( )
        res.send()
        console.log('User Logged Out')
    } catch (e) {
        res.status(500).send(e  )
    }
});

//This is used to log-In a single user
router.get('/user/me', auth, (req, res) => {
    res.send(userProfile)
});

//This is used to read Task by  id and update the data with new information
router.patch('/user/update/me', auth, async (req, res) => {
    //We have to create an allowable set of data that can be allowed by mongo db
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'name', 'email', 'password' ];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if ( !isValidUpdate ) {
        return res.status(404).send({ Error: 'Invalid key Update'})
    }

    try {
        // return console.log(updatedUser)
        //updating the update for each user update
        updates.forEach((update) => userProfile[update] = req.body[update])

        //Save the update
        await userProfile.save()

        res.status(200).send({
            Update: 'The Email is updated',
            userProfile
        })
    } catch(e) {
        res.status(500).send(e)
    }
});

//Deleting a single user
router.delete('/user/me', auth, async ( req, res ) => {

    try {
        await userProfile.remove()
        res.send(userProfile)
    } catch (e) {
        res.status(401).send(e)
    }
});

module.exports = router;