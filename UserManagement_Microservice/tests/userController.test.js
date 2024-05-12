// // tests/userController.test.js

// const request = require('supertest');
// const app = require('../app'); // Assuming your Express app is exported from app.js
// const User = require('../models/UserModel');

// describe('User endpoints', () => {
//     let authToken;

//     beforeAll(async () => {
//         // Log in as a user and get the authentication token
//         const loginResponse = await request(app)
//             .post('/api/users/login')
//             .send({ email: 'test@example.com', hashedPassword: 'password123' });
//         authToken = loginResponse.body.token;
//     });

//     it('should register a new user', async () => {
//         const response = await request(app)
//             .post('/api/users/register')
//             .send({
//                 username: 'testuser',
//                 email: 'test@example.com',
//                 hashedPassword: 'password123',
//                 role: 'patient'
//             });
//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty('username', 'testuser');
//     });

//     it('should log in an existing user', async () => {
//         const response = await request(app)
//             .post('/api/users/login')
//             .send({ email: 'test@example.com', hashedPassword: 'password123' });
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('token');
//     });

//     it('should retrieve user profile', async () => {
//         const user = await User.query().findOne({ email: 'test@example.com' });
//         const response = await request(app)
//             .get(`/api/users/${user.id}`)
//             .set('Authorization', `Bearer ${authToken}`);
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('email', 'test@example.com');
//     });

//     // Add more test cases for other endpoints (update, delete, etc.)
// });
