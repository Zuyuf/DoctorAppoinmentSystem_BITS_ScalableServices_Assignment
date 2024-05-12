// authMiddleware.js

const axios = require('axios');

// Middleware function to authenticate user
const authenticateUser = async (req, res, next) => {
    // Extract the authentication token from request headers
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: 'Authentication token is missing.' });
    }

    try {
        // Call UserManagement's User Profile Retrieval API to verify the token
        const userProfileResponse = await axios.get(`${process.env.UserManagementServiceURL}/api/user/profile`, {
            headers: { Authorization: token }
        });

        req.locals.user = userProfileResponse;

        // If the user profile retrieval is successful, continue to the next middleware or route handler
        next();
    } catch (error) {
        // If there's an error in authentication, return an error response
        console.error('Authentication failed:', error.message);
        return res.status(401).json({ error: 'Authentication failed.' });
    }
};

module.exports = authenticateUser;
