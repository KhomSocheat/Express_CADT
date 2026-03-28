import express from 'express';
import ApiRouter from './routes/api.route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', ApiRouter);


function logMiddleware(req, res, next) {
    console.log("hello")
    next();
}
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

