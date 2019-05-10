const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = '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'

sgMail.setApiKey(sendGridAPIKey) 

const sendWelcomeEmail = ( email, name ) => {
    sgMail.send({
        to: email,
        from: 'tozo2345@gmail.com',
        content: [{"type":"text/html","value":"0"}],
        subject: 'First Send Grid Mail',
        text: `This is a send grid email ${name} that uses a created api and sends information based on how the user wants it to be`,
        
    })
} 

const whyRemoveAccount = ( email, name ) => {
    sgMail.send({
        to: email,
        from: 'tozo2345@gmail.com',
        content: [{"type":"text/html","value":"0"}],
        subject: 'Reasons For Account Cancellation',
        text: `Your account has been successfully deleted ${name}, Please state reasons for this action and Thank you for using our services.`,
        
    })
} 

module.exports = {
    sendWelcomeEmail,
    whyRemoveAccount
}