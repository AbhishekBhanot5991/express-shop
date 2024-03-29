const User =  require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.registerUser = async (req,res)=>{
    try{
        const {username, email, password, role} = req.body;
        let existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:'User already exists'})
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user' // Set the role to 'user' if not provided in the request body
        });

        await newUser.save();
        res.status(201).json({msg:"User registered Successfully"})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user with the provided email exists
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ msg: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            console.log("Invalid password");
            return res.status(401).json({ msg: 'Invalid password' });
        }

        // If the password is correct, generate a JWT token
        const tokenPayload = {
            id: user._id,
            role: user.role // Include the role in the token payload
        };
        const token = jwt.sign(tokenPayload, config.secretKey, { expiresIn: '1h' });

        console.log("Token generated:", token);

        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.forgotPassword = async(req,res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({msg:'User not found'})
        }

        const resetToken = generateResetToken();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        
        sendResetPasswordEmail(user.email, resetToken);

        res.status(200).json({msg:'Password reset instructions send to your email'})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}

exports.resetPassword = async (req,res) =>{
    try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({resetPasswordToken:token, resetPasswordExpires: {$gt: Date.now()}})
    
        if(!user){
            return res.status(400).json({msg:'Invalid or expired token'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({msg: 'Password Reset Successfully'})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}