const { Model } = require('objection');
const knexWrapper = require('../utils/db');

class UserModel extends Model {
    static get tableName() {
        return 'users';
    }

    // Define model properties here
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'email', 'hashedPassword', 'role'],
            properties: {
                id: { type: 'integer' },
                username: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', format: 'email', minLength: 1, maxLength: 255 },
                hashedPassword: { type: 'string', minLength: 6, maxLength: 255 },
                role: { type: 'string', enum: ['patient', 'doctor'] },
                // Add additional properties here
            }
        };
    }
}

// apply knex to BaseModel
// Bind knex instance to objection.js
UserModel.knex(knexWrapper);

module.exports = UserModel;
