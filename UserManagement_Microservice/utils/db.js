const Knex = require('knex');

// Initialize knex connection
const knexWrapper = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './db/db.sqlite'
    }
});

module.exports = knexWrapper;