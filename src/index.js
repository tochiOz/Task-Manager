const express = require('express');
const chalk = require('chalk');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
app.use(express.json());
app.use('/', userRouter);
app.use('/', taskRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(chalk.italic.cyan('App running on server ' + port))
});
const jwt = require('jsonwebtoken')

const fun = async () => {
   const token = await jwt.sign({ _id: 'mslkdfopasddsa' }, 'dmaoundlaoiuaso')
   console.log(token)

   console.log(jwt.verify(token, 'dmaoundlaoiuaso'))
}

fun();