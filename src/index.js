const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Testing!')
})

app.post('/user/create', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        console.log(user)
        res.status(200).send({user})
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

app.post('/task/create', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        console.log(task)
        res.status(200).send({task})
    }).catch((err) => {
        res.status(400).send(err)
    })
})



app.listen(port, () => {
    console.log('App running on server ' + port)
})