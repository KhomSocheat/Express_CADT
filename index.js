import express from 'express';
import { users,books,teachers } from './simple.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/api/users',(req, res) => {
    return res.json(users);
});
app.get('/api/books',(req,res) => {

    return res.json(books);
})
app.get('/api/books/:id',(req,res) => {
    const id = parseInt(req.params.id)
    const book = books.find((b) => {
        return b.id === id
    })
    if(!book){
        return res.status(404).json({message : "Not found"})
    }
    return res.json(book)
})

app.post('/api/users',(req,res) => {
    users.push(req.body)

    return res.status(201).json({message : `Users with ${req.body.name} created`});
})

app.patch('/api/users',(req,res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((u) => {
        return userId == u.id
    })
    users[userIndex] = {id: userId,...req.body}
    return res.json(({message: `User with id  ${userId} updated`}))

})
app.get('/api/users/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => {
        return u.id ===  id
    });
    if(!user){
        return res.status(404).json({message: "Not Found"});
    }
    return res.json(user)
});

app.delete('/api/users/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const deleteIndex = users.findIndex((u) => {
        return u.id === id
    })
    if(deleteIndex === -1){
        return res.status(404).json({message: "Not Found"})
    }
    users.splice(deleteIndex,1)
    return res.json({message: `User with ${id} deleted`});
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

