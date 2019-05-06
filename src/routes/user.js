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
        res.status(201).send({user})
    } catch (err) {
        res.status(400).send(err.message)
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
        const updatedUser = await User.findByIdAndUpdate( _id, req.body, {
            new: true, runValidators: true
        });

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