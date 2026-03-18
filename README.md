# IDG-03 Express.js API

A simple Express.js backend project built with Node.js and ES Modules.

## Features

- Express.js server
- JSON response endpoint
- Runs on port `3000`

## Project Structure

```text
.
|- index.js
|- package.json
|- simple.js
`- README.md
```

## API Endpoint

### `GET /users`

Returns a sample response:

```json
{
	"message": "All users"
}
```

## Prerequisites

- Node.js (v18+ recommended)
- npm

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Nodemon (if not installed yet):

```bash
npm install -g nodemon
```

Alternative (without global install):

```bash
npm install --save-dev nodemon
```

## Run The Project

Use this command to start the server with Nodemon:

```bash
nodemon index.js
```

Server URL:

```text
http://localhost:3000
```

Test endpoint:

```text
http://localhost:3000/users
```

## Notes

- Because this project uses `"type": "module"`, import/export syntax follows ES Module style.
- If `nodemon` is not recognized, use:

```bash
npx nodemon index.js
```
