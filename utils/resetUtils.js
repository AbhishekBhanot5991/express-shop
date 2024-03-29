const crypto = require('crypto');

exports.generateResetToken = () =>{
    return crypto.randomBytes(20).toString('hex');
}

// Function to send reset password email
exports.sendResetPasswordEmail = (email, token) => {
    // Implement your email sending logic here
    // For demonstration purposes, you can just log the reset token
    console.log('Reset token:', token);
    console.log('Reset password email sent to:', email);
};
