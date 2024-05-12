// DoctorSpecialization.js

const { Model } = require('objection');

class DoctorSpecialization extends Model {
    static get tableName() {
        return 'doctor_specializations';
    }

    static get idColumn() {
        return ['doctorId', 'specializationId'];
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['doctorId', 'specializationId'],
            properties: {
                doctorId: { type: 'integer' },
                specializationId: { type: 'integer' }
            }
        };
    }

    static get relationMappings() {
        const Doctor = require('./Doctor');
        const Specialization = require('./Specialization');

        return {
            doctor: {
                relation: Model.BelongsToOneRelation,
                modelClass: Doctor,
                join: {
                    from: 'doctor_specializations.doctorId',
                    to: 'doctors.id'
                }
            },
            specialization: {
                relation: Model.BelongsToOneRelation,
                modelClass: Specialization,
                join: {
                    from: 'doctor_specializations.specializationId',
                    to: 'specializations.id'
                }
            }
        };
    }

    // Other model definitions...
}

module.exports = DoctorSpecialization;
