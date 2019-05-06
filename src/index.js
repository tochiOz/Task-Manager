const express = require('express');
const chalk = require('chalk');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const app = express();


const port = process.env.PORT || 5000;

//adding a route middleware
app.use((req, res, next) => {
    console.log( req.method, req.path )

    //move on
    next()
})

app.use(express.json());
app.use('/', userRouter);
app.use('/', taskRouter);

app.listen(port, () => {
    console.log(chalk.italic.cyan('App running on server ' + port))
});
// const jwt = require('jsonwebtoken')

// const fun = async () => {
//    const token = await jwt.sign({ _id: 'mslkdfopasddsa' }, 'dmaoundlaoiuaso')
//    console.log(token)

//    console.log(jwt.verify(token, 'dmaoundlaoiuaso'))
// }

// fun();