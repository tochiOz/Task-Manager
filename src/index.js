const app = require('./app')
const chalk = require('chalk');
const port = process.env.PORT

app.listen(port, () => {
    console.log(chalk.italic.cyan('App running on server ' + port))
})