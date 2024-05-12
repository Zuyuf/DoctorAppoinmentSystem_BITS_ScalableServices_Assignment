// Doctor.js

const { Model } = require('objection');

class Doctor extends Model {
    static get tableName() {
        return 'doctors';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['userID', 'name', 'email'],
            properties: {
                id: { type: 'integer' },
                userID: { type: 'integer' },
                profesionalName: { type: 'string', minLength: 1, maxLength: 255 },
                professionalEmail: { type: 'string', format: 'email' },
                // Add other relevant doctor attributes here
            }
        };
    }

    static get relationMappings() {
        const DoctorSpecialization = require('./DoctorSpecialization');
        const Place = require('./Place');
        const Availability = require('./Availability');

        return {
            specializations: {
                relation: Model.HasManyRelation,
                modelClass: DoctorSpecialization,
                join: {
                    from: 'doctors.id',
                    to: 'doctor_specializations.doctorId'
                }
            },
            place: {
                relation: Model.HasOneRelation,
                modelClass: Place,
                join: {
                    from: 'doctors.id',
                    to: 'places.doctorId'
                }
            },
            availability: {
                relation: Model.HasOneRelation,
                modelClass: Availability,
                join: {
                    from: 'doctors.id',
                    to: 'availabilities.doctorId'
                }
            }
        };
    }

    // Other model definitions...
}

module.exports = Doctor;
