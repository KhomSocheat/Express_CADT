import asyncHandler from 'express-async-handler'
import bcrypt from "bcrypt";
import userModel from '../../models/user.model.js';
import jwt from 'jsonwebtoken'
export const login = asyncHandler(async (req,res) =>{
    const {username,password} = req.body; // get uername and pw from request body 

    //validation if user not type anything 
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await userModel.findOne({username: username}) //check user have in database or not 
    if(!user){ // if not return message not found 
       return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password,user.password) //compare password from user request body with pw that have in database 
    if(!isMatch){
        return res.json({message: "Username or Password Incorrect"})
    }
    //Login logic
    const payload = {
        _id: user._id,
        username : user.username,
        role: user.role
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return res.json({accessToken : token})
    
})

export const register = asyncHandler(async (req,res) =>{
    const {name, username, age, email, role, password} = req.body; // get from request body
    
    const existingUser = await userModel.findOne({ email }) // check user for not duplicate from database 
    if(existingUser){
        return res.status(400).json({ message: "Email already exists" });
    }
    
    const encryptPassword = await bcrypt.hash(password,10) //Hash password before submit to database 

    const user = new userModel({
        name,
        username,
        age,
        role,
        email,
        password: encryptPassword
    })
    await user.save();

    return res.json(user)
})