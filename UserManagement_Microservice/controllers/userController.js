const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Controller function for user registration
async function register(req, res) {
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user record in the database
        const user = await User.query().insert({
            username: req.body.username,
            email: req.body.email,
            hashedPassword: hashedPassword,
            role: req.body.role,
            // Add additional user-specific attributes as needed
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Controller function for user login
async function login(req, res) {
    try {
        // Find user by email
        const user = await User.query().findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(req.body.password, user.hashedPassword);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.status(200).json({
            token: token,
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Controller function for retrieving user profile
async function getProfile(req, res) {
    try {
        const user = await User.query().findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Controller function for updating user profile
async function updateProfile(req, res) {
    try {
        const updatedUser = await User.query().patchAndFetchById(req.params.userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// Controller function for deleting user profile
async function deleteProfile(req, res) {
    try {
        const deletedUser = await User.query().deleteById(req.params.userId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { register, login, getProfile, updateProfile, deleteProfile };
