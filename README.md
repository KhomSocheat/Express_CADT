<!-- Project: IDG-03 -->

# IDG-03 – Express.js REST API

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)

A simple learning project that exposes in‑memory REST APIs for **users** and **teachers** using **Node.js**, **Express 5**, and **ES Modules**.

## Command to create mongodb on docker
```bash
docker run -d -p 27017:27017 --name=mongo-example mongo:latest

## Features

- Express.js HTTP server running on port `3000`
- ES Module syntax (`import` / `export`)
- In‑memory data models (no database)
- CRUD operations for `User` and `Teacher` resources

## Tech Stack

- Node.js (recommended v18+)
- Express 5
- JavaScript (ES Modules)

## Project Structure

```text
.
├─ package.json
├─ README.md
└─ src/
	 ├─ index.js          # App entry point (Express server)
	 ├─ controllers/
	 │  ├─ user.controller.js
	 │  ├─ techer.controller.js
	 │  ├─ book.controller.js
	 │  ├─ money.controller.js
	 │  └─ stock.controller.js
	 ├─ models/
	 │  ├─ user.model.js
	 │  ├─ teacher.model.js
	 │  ├─ book.model.js
	 │  ├─ money.model.js
	 │  └─ stock.model.js
	 └─ routes/
			├─ user.route.js
			└─ teacher.route.js
```

Main server setup: [src/index.js](src/index.js)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Install Dependencies

```bash
npm install
```

### Run the Server

Start the Express server directly with Node:

```bash
node src/index.js
```

Or, using `nodemon` (auto‑restart on file changes):

```bash
npx nodemon src/index.js
```

The server will be available at:

```text
http://localhost:3000
```

## API Reference

Base URL:

```text
http://localhost:3000/api
```

### Users

Resource: `/user`

- `GET /api/user` – Get all users
- `GET /api/user/:id` – Get a single user by numeric `id`
- `POST /api/user` – Create a new user
- `PATCH /api/user/:id` – Update an existing user
- `DELETE /api/user/:id` – Delete a user by `id`

Sample user object (see [src/models/user.model.js](src/models/user.model.js)):

```json
{
	"id": 1,
	"name": "Alice",
	"email": "alice@example.com"
}
```

Example request body for `POST /api/user`:

```json
{
	"id": 4,
	"name": "David",
	"email": "david@example.com"
}
```

### Teachers

Resource: `/teacher`

- `GET /api/teacher` – Get all teachers
- `GET /api/teacher/:id` – Get a single teacher by numeric `id`
- `POST /api/teacher` – Create a new teacher
- `PATCH /api/teacher/:id` – Update an existing teacher
- `DELETE /api/teacher/:id` – Delete a teacher by `id`

Sample teacher object (see [src/models/teacher.model.js](src/models/teacher.model.js)):

```json
{
	"id": 1,
	"name": "Mr. Smith",
	"subject": "Math",
	"yearsOfExperience": 10
}
```

## Data Models

In‑memory data is defined in the model files:

- Users: [src/models/user.model.js](src/models/user.model.js)
- Teachers: [src/models/teacher.model.js](src/models/teacher.model.js)
- Books: [src/models/book.model.js](src/models/book.model.js)
- Money: [src/models/money.model.js](src/models/money.model.js)
- Stock: [src/models/stock.model.js](src/models/stock.model.js)

Currently, the API routes are wired for **users** and **teachers**. The other models are prepared as sample data sources for future endpoints.

## Notes & Limitations

- This is a learning/demo project: data is stored **in memory** only.
- No authentication/authorization is implemented.
- No database; restarting the server resets all changes.
- Uses ES Modules (`"type": "module"` in [package.json](package.json)).

## License

This project is licensed under the **ISC License** (see [package.json](package.json)).
