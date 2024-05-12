// Place.js

const { Model } = require('objection');

class Place extends Model {
    static get tableName() {
        return 'places';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['type', 'name', 'address'],
            properties: {
                id: { type: 'integer' },
                type: { type: 'string', enum: ['clinic', 'hospital'] },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                address: { type: 'string', minLength: 1, maxLength: 255 }
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
                    from: 'places.doctorId',
                    to: 'doctors.id'
                }
            }
        };
    }

    // Other model definitions...
}

module.exports = Place;
