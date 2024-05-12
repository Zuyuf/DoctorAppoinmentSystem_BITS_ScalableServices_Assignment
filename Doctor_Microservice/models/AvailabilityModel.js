// Availability.js

const { Model } = require('objection');

class Availability extends Model {
    static get tableName() {
        return 'availabilities';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['doctorId', 'startTime', 'endTime'],
            properties: {
                id: { type: 'integer' },
                doctorId: { type: 'integer' },
                startTime: { type: 'string', format: 'date-time' },
                endTime: { type: 'string', format: 'date-time' }
                // Add other availability-related attributes here
            }
        };
    }

    static get relationMappings() {
        const Doctor = require('./Doctor');

        return {
            doctor: {
                relation: Model.BelongsToOneRelation,
                modelClass: Doctor,
                join: {
                    from: 'availabilities.doctorId',
                    to: 'doctors.id'
                }
            }
        };
    }

    // Other model definitions...
}

module.exports = Availability;
