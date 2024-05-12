const Doctor = require('../models/DoctorModel');
const Specialization = require('../models/SpecializationModel');
const DoctorSpecialization = require('../models/DoctorSpecializationsModel');
const Place = require('../models/PlaceModel');
const Availability = require('../models/AvailabilityModel');
const { validationResult } = require('express-validator');


async function RegisterDoctor(req, res) {
    try {
        // Logic for Doctor Registration
        const { profesionalName, professionalEmail, specializations, place, availability } = req.body;

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create doctor record
        const doctor = await Doctor.create({
            profesionalName,
            professionalEmail,
        });

        // Create doctor specialization records
        await Promise.all(specializations.map(async (specializationId) => {
            await DoctorSpecialization.create({
                doctorId: doctor.id,
                specializationId,
            });
        }));

        // Create place record
        const createdPlace = await Place.create(place);

        // Create availability records
        await Promise.all(availability.map(async (slot) => {
            await Availability.create({
                doctorId: doctor.id,
                ...slot,
            });
        }));

        res.status(201).json({
            ...doctor
        });
    } catch (error) {
        console.error('Error in registering doctor:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

async function GetDoctorProfile(req, res) {
    try {
        // Logic for Doctor Profile Retrieval
        const doctorId = req.params.doctorId;

        const doctor = await Doctor.query()
            .findById(doctorId)
            .withGraphFetched('[specializations, place, availability]');

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        console.error('Error in retrieving doctor profile:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

async function UpdateDoctorProfile(req, res) {
    try {
        // Logic for Doctor Profile Update
        const doctorId = req.params.doctorId;
        const { profesionalName, professionalEmail, specializations, place, availability } = req.body;

        // Update doctor record
        await Doctor.query()
            .findById(doctorId)
            .patch({ profesionalName, professionalEmail });

        // Update doctor specialization records
        await DoctorSpecialization.query()
            .where('doctorId', doctorId)
            .delete();

        await Promise.all(specializations.map(async (specializationId) => {
            await DoctorSpecialization.create({
                doctorId,
                specializationId,
            });
        }));

        // Update place record
        await Place.query()
            .where('id', doctor.placeId)
            .patch(place);

        // Update availability records
        await Availability.query()
            .where('doctorId', doctorId)
            .delete();

        await Promise.all(availability.map(async (slot) => {
            await Availability.create({
                doctorId,
                ...slot,
            });
        }));

        res.status(200).json({ message: 'Doctor profile updated successfully' });
    } catch (error) {
        console.error('Error in updating doctor profile:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

async function DeleteDoctor(req, res) {
    try {
        // Logic for Doctor Deletion
        const doctorId = req.params.doctorId;

        // Delete doctor record
        await Doctor.query().deleteById(doctorId);

        res.status(204).end();
    } catch (error) {
        console.error('Error in deleting doctor:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

async function ListSpecializations(req, res) {
    try {
        // Logic for Specialization Listing
        const specializations = await Specialization.query();

        res.status(200).json({ specializations });
    } catch (error) {
        console.error('Error in listing specializations:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

async function ListAvailability(req, res) {
    try {
        // Logic for Availability Listing
        const doctorId = req.params.doctorId;

        const availability = await Availability.query().where('doctorId', doctorId);

        res.status(200).json({ doctorId, availability });
    } catch (error) {
        console.error('Error in listing availability:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

async function ListAppointmentsByDateRange(req, res) {
    try {
        // Logic for Appointments Listing by Date Range
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        // Query appointments within date range
        // const appointments = await Appointment.query()...
        // Implement your logic here

        res.status(200).json({ appointments });
    } catch (error) {
        console.error('Error in listing appointments by date range:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}


module.exports = {
    RegisterDoctor,
    GetDoctorProfile,
    UpdateDoctorProfile,
    DeleteDoctor,
    ListSpecializations,
    ListAvailability,
    ListAppointmentsByDateRange
};
