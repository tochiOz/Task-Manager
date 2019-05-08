const express = require('express');
const chalk = require('chalk');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const app = express();


const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', userRouter);
app.use('/', taskRouter)

app.listen(port, () => {
    console.log(chalk.italic.cyan('App running on server ' + port))
});

const multer = require('multer')

// next is to configure multer based on the type o file uploaded
const upload = multer({
    dest: 'images'
})

//setting an endpoint to post upload
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}) 