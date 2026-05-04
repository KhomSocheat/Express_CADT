import 'dotenv/config'; // Load environment variables from .env file
import express from 'express';
import {ApiRouter} from './routes/api.route.js';
import { dbConnect } from './database/db.js'; //database connection function
import { handleError } from './middleware/index.js'; //error handling middleware
import morgan from 'morgan' // HTTP request logger middleware
import cors from 'cors' // Cross-Origin Resource Sharing middleware
import redisClient,{connectRedis} from "./redis/index.js"; // Redis client and connection function


const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(morgan('combined'))

app.use('/api', ApiRouter); //call api router that we combine all routes in api.route.js
app.use(handleError); 

const startServer = async () => {
  try {
    await dbConnect();
    console.log("MongoDB connected");

    await connectRedis();
    console.log("Redis connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

startServer(); // Start the server after successful database and Redis connections

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

    