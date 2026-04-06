<!-- Project: IDG-03 -->

# IDG-03 – Express.js REST API

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-9.x-880000)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)

Learning project that exposes REST APIs using **Node.js**, **Express 5**, **MongoDB**, and **ES Modules**. It demonstrates the common **route → controller → model** architecture and basic CRUD endpoints.

## Features

- Express server on port `3000`
- ES Module syntax (`import` / `export`)
- MongoDB database connection via Mongoose
- CRUD endpoints for multiple resources (users, teachers, books, etc.)
- Clear separation of routes, controllers, and models

## Tech Stack

- Node.js (recommended v18+)
- Express 5
- MongoDB (Docker)
- Mongoose
- JavaScript (ES Modules)

## Installed Packages (and why)

Runtime dependencies from [package.json](package.json):

- **express**: HTTP server and routing
   - Install: `npm install express`
- **express-async-handler**: async controller error handling
   - Install: `npm install express-async-handler`
- **express-validator**: request validation helpers
   - Install: `npm install express-validator`
- **mongoose**: MongoDB ODM
   - Install: `npm install mongoose`
- **mongoose-paginate-v2**: Mongoose pagination plugin (installed, not yet used in code)
   - Install: `npm install mongoose-paginate-v2`

Dev dependency:

- **@faker-js/faker**: generate fake data for fixtures (see [src/fixture.js](src/fixture.js))
   - Install: `npm install --save-dev @faker-js/faker`
- **nodemon**: auto-restart server on file changes during development
   - Install: `npm install --save-dev nodemon`

## Project Structure

```text
.
├─ package.json
├─ README.md
└─ src/
   ├─ index.js          # App entry point (Express server)
   ├─ database/
   │  └─ db.js          # MongoDB connection
   ├─ controllers/
   │  ├─ user.controller.js
   │  ├─ teacher.controller.js
   │  ├─ book.controller.js
   │  ├─ money.controller.js
   │  └─ stock.controller.js
   ├─ models/
   │  ├─ user.model.js
   │  ├─ teacher.model.js
   │  ├─ book.model.js
   │  ├─ money.model.js
   │  └─ stock.model.js
   ├─ routes/
   │  ├─ api.route.js
   │  ├─ user.route.js
   │  ├─ teacher.route.js
   │  ├─ book.route.js
   │  ├─ money.route.js
   │  └─ stock.route.js
   └─ validators/
      ├─ stock.validator.js
      ├─ teacher.validator.js
      └─ user.validator.js
```

Main server setup: [src/index.js](src/index.js)

## CRUD Example (User Controller)

The user controller demonstrates CRUD with Mongoose and async error handling. See [src/controllers/user.controller.js](src/controllers/user.controller.js).

- **Create**: `CreateUser` creates a new document with `new userModel(req.body)` and `save()`
- **Read**: `getAllUser` returns all users, `getUserById` fetches one by `_id`
- **Update**: `UpdateUser` updates a user with `updateOne({ _id: userId }, req.body)`
- **Delete**: `DeleteUser` removes a user with `deleteOne({ _id: id })`

This controller shows the common CRUD flow for MongoDB-backed routes.

## Controller Filtering (Users)

The user controller includes simple query filtering. You can pass query parameters like `role` or `age` to filter results, for example:

- `GET /api/user?role=admin`
- `GET /api/user?age=21`

## Step-by-step: Start the Project

### 1) Install Dependencies

```bash
npm install
```

### 2) Start MongoDB (Docker)

```bash
docker run -d -p 27017:27017 --name=mongo-example mongo:latest
```

### 3) Run the Server

```bash
node src/index.js
```

Or run in dev mode with auto-restart:

```bash
npx nodemon src/index.js
```

The API will be at:

```text
http://localhost:3000/api
```

### 4) Seed Data (Optional)

```bash
npm run generate
```

## API Reference

Base URL:

```text
http://localhost:3000/api
```

### Users

- `GET /api/user`
- `GET /api/user/:id`
- `POST /api/user`
- `PATCH /api/user/:id`
- `DELETE /api/user/:id`

### Teachers

- `GET /api/teacher`
- `GET /api/teacher/:id`
- `POST /api/teacher`
- `PATCH /api/teacher/:id`
- `DELETE /api/teacher/:id`

### Books

- `GET /api/book`
- `GET /api/book/:id`
- `POST /api/book`
- `PATCH /api/book/:id`
- `DELETE /api/book/:id`

### Money

- `GET /api/money`
- `GET /api/money/:id`
- `POST /api/money`
- `PATCH /api/money/:id`
- `DELETE /api/money/:id`

### Stock

- `GET /api/stock`
- `GET /api/stock/:id`
- `POST /api/stock`
- `PATCH /api/stock/:id`
- `DELETE /api/stock/:id`

## Notes

- Project uses ES Modules (`"type": "module"` in [package.json](package.json)).
- MongoDB connection string is defined in [src/database/db.js](src/database/db.js).

## License

ISC License. See [package.json](package.json).
