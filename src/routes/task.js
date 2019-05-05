const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

//simple testing router
router.post('/task', async ( req, res ) => {
   res.send('Testing')
});


//This is used to read all Tasks
router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.status(200).send({
            Message: 'Tasks Gotten successfully',
            tasks
        })
    } catch (e) {
        res.status(500).send(e)
    }
});


//this is used to create task
router.post('/task/create', async (req, res) => {

    const task = new Task(req.body);

    try {
        const taskNew = await task.save();
        res.status(201).send({task})
    } catch(err) {
        res.status(400).send(err)
    }
});

//This is used to read Task by id
router.get('/tasks/:id', async (req, res) => {

    try {
        const _id = req.params.id;
        const taskId = await Task.findById(_id);

        if( !taskId ) {
            return res.status(404).send( 'Error: Message Not Found')
        }
        res.status(200).send({
            Message: 'The Task is Gotten successfully',
            taskId
        })
    } catch(e) {
        res.status(500).send(e)
    }
});

//updating task items
router.patch('/task/update/:id', async ( req, res ) => {

    //setting up validation for the keys to be updated
    const updates = Object.keys(req.body);
    const allowableTask = [ 'description', 'completed' ];
    const isValidTask = updates.every((update) => allowableTask.includes(update));

    //Prompt invalid task inputs
    if ( !isValidTask ) {
        return res.status(404).send(' Error: Invalid Task Input ')
    }

    const _id = req.params.id;

    //Send valid data for update
    try {

        const updateTask = await Task.findById( _id )

        updates.forEach((update) => updateTask[update] = req.body[update])

        await updateTask.save()

        if ( !updateTask ) {
            return res.status(404).send('Task not Found')
        }

        return res.status(200).send({
            Message: 'Update Successful',
            updateTask
        })
    }catch (e) {
        console.log(e)
    }
});

//deleting a single task
router.delete('/task/delete/:id', async ( req, res ) => {

    const _id = req.params.id;

    try {
        const deletedTask = await Task.findByIdAndDelete( _id );

        if (! deletedTask ) {
            return res.status(404).send()
        }

        res.send( deletedTask )
    } catch (e) {
        res.status(500).send(e)
    }

});

module.exports = router;