const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail } = require('../emails/mail')

//simple testing router
router.post('/user', async ( req, res ) => {
    res.send('Testing')
});

//This is used to create a user login details
router.post('/user/create', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeEmail( user.email, user.name)
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
        whyRemoveAccount( userProfile.email, userProfile.name )

        res.send(userProfile)
    } catch (e) {
        res.status(401).send(e)
    }
});

//uploading a file route
const upload = multer({
    //the dest creates a directory where the file is to be stored
    // dest: 'avatars',
    //use limits to create limits for file
    limits: {
        //for filesize
        fileSize: 1000000
    },
    //fileFilter helps to filter unaccpted file
    fileFilter(req, file, cb) {
        //to check for pdf
            // if ( !file.originalname.endsWith('.doc ') ) {
            //     return cb(new Error('Please upload a Pdf'))   
            // }

            //for doc/docx - expression is \.(doc|docx)$
            if ( !file.originalname.match(/\.(jpg|jpeg|png|svg|PNG)$/) ) {
                return cb(new Error('Please upload a Picture Format document'))   
            }

            cb( undefined, true )
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    //introducing sharp to make fast changes

    const buffer = await sharp( req.file.buffer ).resize({
        width: 250, height: 250
    }).png().toBuffer()


    userProfile.avatar = buffer
    await userProfile.save()
   
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}) 

//Route to get a user image
router.get('/users/:id/avatar', async (req, res) => {

    const _id = req.params.id
    try {

        const user = await User.findById( _id )
        if ( !user || !user.avatar) {
            throw new Error()
        }

        //setting a request header for the image file
        //This is to know that its an image we are asking of
        res.set('Content-Type', 'image/png')

        res.send( user.avatar )
    } catch (error) {
        res.status(404).send()
    }
})

//Means of deleting a user avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    
    userProfile.avatar = undefined
    await userProfile.save()
   
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}) 

module.exports = router;