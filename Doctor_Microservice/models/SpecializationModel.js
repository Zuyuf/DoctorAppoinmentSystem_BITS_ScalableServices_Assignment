// Specialization.js

const { Model } = require('objection');

class Specialization extends Model {
    static get tableName() {
        return 'specializations';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 }
            }
        };
    }

    static get relationMappings() {
        const DoctorSpecialization = require('./DoctorSpecialization');

        return {
            doctors: {
                relation: Model.ManyToManyRelation,
                modelClass: DoctorSpecialization,
                join: {
                    from: 'specializations.id',
                    through: {
                        from: 'doctor_specializations.specializationId',
                        to: 'doctor_specializations.doctorId'
                    },
                    to: 'doctors.id'
                }
            }
        };
    }

    // Other model definitions...
}

module.exports = Specialization;
