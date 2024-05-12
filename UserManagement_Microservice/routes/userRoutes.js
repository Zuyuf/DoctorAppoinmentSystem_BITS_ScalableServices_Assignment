const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// User registration route
router.post('/register', userController.register);

// User login route
router.post('/login', userController.login);

// User profile retrieval route
router.get('/:userId', authenticateToken, userController.getProfile);

// User profile update route
router.put('/:userId', authenticateToken, userController.updateProfile);

// User profile deletion route
router.delete('/:userId', authenticateToken, userController.deleteProfile);

module.exports = router;
