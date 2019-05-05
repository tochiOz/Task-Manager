const express = require('express');
const User = require('../models/user');
const router = new express.Router();

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


//This is used to read all Tasks
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

//This is used to read all Tasks
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

//This is used to read Task by  id and update the data with new information
router.patch('/user/update/:id', async (req, res) => {
    //We have to create an allowable set of data that can be allowed by mongo db
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'name', 'email', 'password' ];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if ( !isValidUpdate ) {
        return res.status(404).send({ Error: 'Invalid key Update'})
    }

    const _id = req.params.id;

    try {
        //locating the object to be changed first.
        const updatedUser = await User.findById( _id )
        // return console.log(updatedUser)
        //updating the update for each user update
        updates.forEach((update) => updatedUser[update] = req.body[update])

        //Save the update
        await updatedUser.save()

        // const updatedUser = await User.findByIdAndUpdate( _id, req.body, {
        //     new: true, runValidators: true
        // });

        if( !updatedUser ) {
            return res.status(404).send( 'Error: User Not Found')
        }
        res.status(200).send({
            Update: 'The Email is updated',
            updatedUser
        })
    } catch(e) {
        res.status(500).send(e)
    }
});

//Deleting a single user
router.delete('/user/delete/:id', async ( req, res ) => {

    const _id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete( _id );

        if (! deletedUser ) {
            return res.status(404).send()
        }

        res.send(deletedUser)
    } catch (e) {
        res.status(500).send(e)
    }

});

module.exports = router;