const path = require('path');
const { Model } = require('objection');
const knexWrapper = require('../utils/db');


class BaseModel extends Model {
    static get modelPaths() {
        return [path.normalize(__dirname + '/')];
    }

    static get tableName() {
        return 'base';
    }
}

// apply knex to BaseModel
// Bind knex instance to objection.js
BaseModel.knex(knexWrapper);

module.exports = BaseModel;