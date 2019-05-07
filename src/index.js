const express = require('express');
const chalk = require('chalk');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const app = express();


const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', userRouter);
app.use('/', taskRouter);

app.listen(port, () => {
    console.log(chalk.italic.cyan('App running on server ' + port))
});

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5cd1bb4c6ea0ea0264ed6050')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5cd1b760ac837704c8820d80')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()