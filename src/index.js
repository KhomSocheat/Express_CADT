import express from 'express';
import ApiRouter from './routes/api.route.js';
import { dbConnect } from './database/db.js';
import { handleError } from './middleware/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', ApiRouter);

dbConnect().catch((error) => {
    console.error('Failed to connect to MongoDB', error);
});

app.use(handleError); 
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

