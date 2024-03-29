// utils/authUtils.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// function generateToken(user) {
//     return jwt.sign({ id: user.id }, config.secretKey, { expiresIn: '1h' });
// }
function generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, config.secretKey, { expiresIn: '1h' });
}
function verifyToken(token) {
    return jwt.verify(token, config.secretKey);
}
function authorize(role) {
    return (req, res, next) => {
        // Get the token from the request headers
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        // Check if the token starts with "Bearer "
        const [bearer, token] = authorizationHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({ msg: 'Invalid token format' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, config.secretKey);
            const userRole = decoded.role;

            // Check if the user's role matches the required role
            if (userRole !== role) {
                return res.status(403).json({ msg: 'Unauthorized' });
            }

            // If the role matches, proceed to the next middleware
            next();
        } catch (err) {
            console.error(err.message);
            res.status(401).json({ msg: 'Token is not valid' });
        }
    };
}

// function authorize(role) {
//     return (req, res, next) => {

//         const token = req.headers.authorization;

//         if (!token) {
//             return res.status(401).json({ msg: 'No token, authorization denied' });
//         }

//         try {
//             const decoded = jwt.verify(token, config.secretKey);
//             const userRole = decoded.role;
//             if (userRole !== role) {
//                 return res.status(403).json({ msg: 'Unauthorized' });
//             }

//             next();
//         } catch (err) {
//             console.error(err.message);
//             res.status(401).json({ msg: 'Token is not valid' });
//         }
//     };
// }
module.exports = { generateToken, verifyToken, authorize };