const bcrypt = require('bcryptjs');
const knexWrapper = require('../../utils/db');
const UserModel = require('../../models/UserModel');

async function createUsersTable() {
    try {
        await knexWrapper.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('email').notNullable().unique();
            table.string('hashedPassword').notNullable();
            table.string('role').notNullable();
            // Add more columns as needed
            table.timestamps(true, true);
        });
        console.log('Users table created successfully.');
    } catch (error) {
        console.error('Error creating users table:', error);
        throw error;
    }
}

async function insertInitialData() {
    try {
        // Insert initial user data using UserModel
        await UserModel.query().insertGraph([
            { username: 'patient', email: 'patient@example.com', hashedPassword: await bcrypt.hash('123456', 10), role: 'patient' },
            { username: 'doctor', email: 'doctor@example.com', hashedPassword: await bcrypt.hash('123456', 10), role: 'doctor' },
            // Add more initial user data as needed
        ]);
        console.log('Initial data inserted successfully.');
    } catch (error) {
        console.error('Error inserting initial data:', error);
        throw error;
    }
}

(
    async () => {
        try {
            await createUsersTable();
            await insertInitialData();
            console.log('InsertInitialData SUCCESS :)')
            return Promise.resolve(true);
        }
        catch (error) {
            console.error('InsertInitialData FAILED!!!!')
        }
    }
)()

return;
