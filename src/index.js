import express from 'express';
import UserRouter from './routes/user.route.js';
import TeacherRouter from './routes/teacher.route.js';
import BookRouter from './routes/book.route.js';
import MoneyRouter from './routes/money.route.js';
import StockRouter from './routes/stock.route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', UserRouter);
app.use('/api/teacher', TeacherRouter);
app.use('/api/book', BookRouter);
app.use('/api/money', MoneyRouter);
app.use('/api/stock', StockRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

