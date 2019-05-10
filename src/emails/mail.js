const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    auth: {
        user: 'tozo2345@gmail.com',
        pass: 'tochievt35'
    },
    secure: true
});

const sendWelcomeEmail = ( email, name ) => {
//    const url = 'https://localhost:5000'
    const mailDetails = {
        to: email,
        from: 'tozo2345@gmail.com',
        subject: 'First Send Grid Mail',
        text: `This is a send grid email ${name} that uses a created api and sends information based on how the user wants it to be`,
    }


        transporter.sendMail(mailDetails, function (err, info) {
            if (err) {
                console.log(err)
            }

            console.log(info.response)
        })
    
} 

module.exports = {
    sendWelcomeEmail
}