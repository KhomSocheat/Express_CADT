import express from 'express';

const app = express();

function getAllUsers(req,res){
    return res.json({message: "All users"});
}

app.get('/users', getAllUsers);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

