import express from 'express';
import { users,books,teachers } from '../simple.js';
import UserRouter from './routes/user.route.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/user',UserRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

