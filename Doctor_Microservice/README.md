# Doctor Microservice

This repository contains the code for the Doctor microservice in a doctor appointment booking application. The microservice is responsible for handling doctor-related functionalities such as registration, profile management, and appointment scheduling.

## Table of Contents

- [Doctor Microservice](#doctor-microservice)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the Migration Script to Insert Initial Data](#running-the-migration-script-to-insert-initial-data)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Testing](#testing)
  - [How to Generate Docker Image & Run That Image on Certain Port](#how-to-generate-docker-image--run-that-image-on-certain-port)
  - [License](#license)

## Installation

To install the dependencies and set up the Doctor microservice, follow these steps:

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd doctor-microservice
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables by creating a `.env` file and defining the required configurations (e.g., `JWT_SECRET`, `PORT`).

## Running the Migration Script to Insert Initial Data

Before starting the Doctor microservice, you need to run a migration script to insert initial data into the database.
Follow these steps:

1. Navigate to the root directory of your project in the terminal.
2. Run the migration script using the following command:

```bash
npm run migrate
```

## Usage

To start the Doctor microservice, run the following command:

```bash
npm run start
```

The microservice will be running on the specified port, and you can send HTTP requests to the defined endpoints (see [Endpoints](#endpoints)).

## Endpoints

The following endpoints are available in the Doctor microservice:

- **POST /api/doctors/register**: Register a new doctor.
- **GET /api/doctors/{doctorId}**: Retrieve doctor profile.
- **PUT /api/doctors/{doctorId}**: Update doctor profile.
- **DELETE /api/doctors/{doctorId}**: Delete doctor profile.
- **GET /api/specializations**: Retrieve list of specializations.
- **GET /api/doctors/{doctorId}/availability**: Retrieve doctor's availability.
- **GET /api/appointments**: Retrieve appointments by date range.

For detailed information about each endpoint, refer to the API specification.

## Testing

To run unit tests for the Doctor microservice, execute the following command:

```bash
npm test
```

The tests ensure that the API endpoints behave as expected and handle various scenarios correctly.

## How to Generate Docker Image & Run That Image on Certain Port

To run the Doctor microservice as a Docker container on your local machine, follow these steps:

1. **Build the Docker Image:**

```bash
docker build -t doctor-microservice .
```

2. **Run the Docker Container:**

```bash
docker run -d -p 8056:3000 doctor-microservice
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
