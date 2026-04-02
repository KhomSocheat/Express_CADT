import  userModel from "../models/user.model.js";

export const getAllUser = async (req, res) => {
    let filteredUsers = await userModel.find()
    if(req.query.role){
        filteredUsers = users.filter((u) => {
            return u.role === query.role 
        })
        
    }
    if(req.query.age){
        filteredUsers = users.filter((u) => {
            return u.age >= req.query.age
        })
    }
    return res.json(filteredUsers);
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({message: "Not Found"});
    }
    return res.json(user)
};
export const UpdateUser = async (req, res) => {
    const userId = req.params.id;
    const updateUser = await userModel.updateOne({_id: userId} , req.body);
    return res.json({
    message: `User with id ${userId} updated`,
    data: updateUser
});
};

export const CreateUser = async (req, res) => {
     try{
        const user = new userModel(req.body);
        await user.save();
        return res.status(202).json(user)
     }catch(error){
        return res.status(400).json({ message: error.message });
     }
    

};
export const DeleteUser = async (req, res) => {
    const id = req.params.id;
    const deleteUser = await userModel.deleteOne({ _id : id});

    return res.status(201).json({message: deleteUser });
};
