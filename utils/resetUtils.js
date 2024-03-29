const crypto = require('crypto');
const nodemailer = require('nodemailer')
exports.generateResetToken = () =>{
    return crypto.randomBytes(20).toString('hex');
}

// Function to send reset password email
exports.sendResetPasswordEmail = (email, token) => {
     // Retrieve email credentials from environment variables
     const emailUsername = process.env.EMAIL_USERNAME;
     const emailPassword = process.env.EMAIL_PASSWORD;
 
     // Create a transporter object using SMTP transport
     const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: emailUsername,
             pass: emailPassword
         }
     });
 
     // Define email options
     const mailOptions = {
         from: emailUsername,
         to: email,
         subject: 'Password Reset Request',
         text: `You have requested to reset your password. Please click on the following link to reset your password: http://your-website.com/reset-password/${token}`
     };
 
     // Send the email
     transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
             console.error('Error sending email:', error);
         } else {
             console.log('Email sent:', info.response);
         }
     });
};
