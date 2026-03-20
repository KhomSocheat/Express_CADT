import { users } from "../models/user.model";

export const getAllUser = (req, res) => {
  return res.json(users);
};

export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
    const user = users.find((u) => {
        return u.id ===  id
    });
    if(!user){
        return res.status(404).json({message: "Not Found"});
    }
    return res.json(user)
};
export const UpdateUser = (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((u) => {
        return userId == u.id
    })
    users[userIndex] = {id: userId,...req.body}
    return res.json(({message: `User with id  ${userId} updated`}))
};

export const CreateUser = (req, res) => {
     users.push(req.body)
    
    return res.status(201).json({message : `Users with ${req.body.name} created`});
};
export const DeleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const deleteIndex = users.findIndex((u) => {
        return u.id === id
    })
    if(deleteIndex === -1){
        return res.status(404).json({message: "Not Found"})
    }
    users.splice(deleteIndex,1)
    return res.json({message: `User with ${id} deleted`});
};
