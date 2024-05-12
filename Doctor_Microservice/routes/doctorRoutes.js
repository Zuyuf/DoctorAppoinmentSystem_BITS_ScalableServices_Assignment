// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const doctorController = require('../controllers/doctorController.js');

// Middleware for authentication
const authenticate = require('../middlewares/authMiddleware');

// Doctor Registration
router.post(
    '/register',
    [
        body('name').notEmpty(),
        body('email').isEmail(),
        // Add validation for other relevant doctor attributes
    ],
    doctorController.RegisterDoctor
);

// Doctor Profile Retrieval
router.get('/:doctorId', authenticate, doctorController.GetDoctorProfile);

// Doctor Profile Update
router.put(
    '/:doctorId',
    authenticate,
    [
        body('name').notEmpty(),
        body('email').isEmail(),
        // Add validation for other relevant doctor attributes
    ],
    doctorController.UpdateDoctorProfile
);

// Doctor Deletion
router.delete('/:doctorId', authenticate, doctorController.DeleteDoctor);

// Specialization Listing
router.get('/specializations', doctorController.ListSpecializations);

// Availability Listing
router.get('/:doctorId/availability', doctorController.ListAvailability);

// Appointments Listing by Date Range
router.get('/appointments', authenticate, doctorController.ListAppointmentsByDateRange);

module.exports = router;
