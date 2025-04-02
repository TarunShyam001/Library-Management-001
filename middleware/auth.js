
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authorization = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        // Decode the JWT token
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(user);

        // Find the user by userId extracted from the token
        const foundUser = await User.findByPk(user.userId);

        if (!foundUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach the user to the request object for use in other routes
        req.user = foundUser;
        
        // Call next to proceed to the next middleware or route
        next();
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    authorization
};