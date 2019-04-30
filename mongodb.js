//CRUD == Create, Read, Update & Delete

//used to access the mongodb content
// const {Mongodb} = require('mongodb')
// //used to create a connection
const { MongoClient, ObjectID } = require('mongodb')
//creating connection variables to mongodb
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//Generating an Object-id to understand
const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to Database')
    }

    const db = client.db(databaseName)

    //using UpdateOne & updateMany to update already created documents
    db.collection('users').updateOne({ _id: new ObjectID("5cc8396d88b0580d50ea4671") }, {
        //$set is used to set the updates to the gotten object by Id
        $set: {
            name: "Ayo"
        }
    }).then(result => console.log(result)).catch(e => console.log(e))

    db.collection('task').updateMany({
        Completed: false
    }, {
        //$set is used to set the updates to the gotten object by Id
        $set: {
            Completed: true
        }
    }).then(result => console.log(result.modifiedCount)).catch(e => console.log(e))


    //using deleteOne & deleteMany to find specific id and delete
    db.collection('users').deleteMany({ 
        age: 30
    }).then(result => console.log(result)).catch(e => console.log(e))

    //this is used to find one data based on the inputted id value
    db.collection('users').findOne({ _id: new ObjectID("5cc88be2d92e7529dcde7139") }, (error, User) => {
        if (error) {
            console.log('Unable to Fetch specified user, Please check and try again')
        } else {
            console.log(User)
        }
    })

    //this gets diferent values that share a common value and returns a cursor
    db.collection('users').find({ age: 30 }).toArray((error, users) => {
        if (error) {
            console.log('Unable to Fetch Users along that range, Please check and try again')
        } else {
            console.log(users)
        }
    })

    db.collection('users').find({ age: 30 }).count((error, count) => {
        if (error) {
            console.log('Unable to Fetch Users along that range, Please check and try again')
        } else {
            console.log(count)
        }
    })


    db.collection('users').insertOne({
        _id: id,
        name: 'Emmanuel',
        age: 30
    }, (error, data) => {
        if (error) {
            console.log('Unable to Insert User')
        } else {
            console.log(data.ops)
        }
    })

    db.collection('users').insertMany([
        {
            name: 'Ayo',
            age: 7889
        },
        {
            name: 'Mercy',
            age: 909082
        }
    ], (error, data) => {
        if (error) {
            console.log('Unable to Insert User')
        } else {
            console.log(data.ops)
        }
    })
    db.collection('task').insertMany([
        {
            Description: 'This is a mongodb database',
            Completed: false
        },
        {
            Description: 'Vue.js Tutorials',
            Completed: true
        }
    ], (error, data) => {
        if (error) {
            console.log('Unable to Insert User')
        } else {
            console.log(data.ops)
        }
    })
    console.log('Connected to the MongoDb')
})