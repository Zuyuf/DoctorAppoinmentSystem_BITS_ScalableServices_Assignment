// services/userService.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

async function registerUser(userData) {
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create a new user record in the database
        const user = await User.query().insert({
            username: userData.username,
            email: userData.email,
            hashedPassword: hashedPassword,
            role: userData.role,
            // Add additional user-specific attributes as needed
        });

        return user;
    } catch (error) {
        throw new Error('Error registering user');
    }
}

async function loginUser(email, password) {
    try {
        // Find user by email
        const user = await User.query().findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.hashedPassword);
        if (!validPassword) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        return {
            token,
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
    } catch (error) {
        throw new Error('Error logging in user');
    }
}

async function getUserProfile(userId) {
    try {
        const user = await User.query().findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error retrieving user profile');
    }
}

async function updateUserProfile(userId, updatedData) {
    try {
        const updatedUser = await User.query().patchAndFetchById(userId, updatedData);
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user profile');
    }
}

async function deleteUserProfile(userId) {
    try {
        const deletedUser = await User.query().deleteById(userId);
        return deletedUser;
    } catch (error) {
        throw new Error('Error deleting user profile');
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};
