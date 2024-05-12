# User Management Service

This repository contains the code for a User Management microservice in a doctor appointment booking application. The microservice is responsible for handling user registration, login, profile management, and other user-related operations.

## Table of Contents

- [User Management Service](#user-management-service)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the Migration Script to Insert Initial Data](#running-the-migration-script-to-insert-initial-data)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Testing](#testing)
  - [How to Generate Docker Image \& Run That Image on Certain Port](#how-to-generate-docker-image--run-that-image-on-certain-port)
  - [License](#license)

## Installation

To install the dependencies and set up the microservice, follow these steps:

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd user-management-service
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables by creating a `.env` file and defining the required configurations (e.g., `JWT_SECRET`, `PORT`).

## Running the Migration Script to Insert Initial Data

Before starting the microservice, you need to run a migration script to insert initial data into the database.
Follow these steps:

1. Navigate to the root directory of your project in the terminal.
2. Run the migration script using the following command:

```bash
npm run init_migrate
```

## Usage

To start the microservice, run the following command:

```bash
npm run start
```

The microservice will be running on the specified port, and you can send HTTP requests to the defined endpoints (see [Endpoints](#endpoints)).

## Endpoints

The following endpoints are available in the User Management microservice:

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Login as an existing user.
- **GET /api/users/{userId}**: Retrieve user profile.
- **PUT /api/users/{userId}**: Update user profile.
- **DELETE /api/users/{userId}**: Delete user profile.

For detailed information about each endpoint, refer to the API specification.

## Testing

To run unit tests for the microservice, execute the following command:

```bash
npm test
```

The tests ensure that the API endpoints behave as expected and handle various scenarios correctly.

## How to Generate Docker Image & Run That Image on Certain Port

To run the User Management microservice as a Docker container on your local machine, follow these steps:

1. **Build the Docker Image:**

```bash
docker build -t user-management-service .
```

2. **Run the Docker Container:**

```bash
docker run -d -p <host-port>:3000 user-management-service
```

Example:

```bash
docker run -d -p 8055:3000 user-management-service
```

3. **Verify Container Status:**

```bash
docker ps
```

This command will list all running Docker containers, and you should see your container listed.

4. **Access the Microservice:**

   You can now access the microservice by sending HTTP requests to `localhost:<host-port>` (e.g., `localhost:8080`) on your host machine.

## License

This project is licensed under the [MIT License](LICENSE).
