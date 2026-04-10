import asyncHandler from 'express-async-handler'

export const login = asyncHandler(async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;

    //Login logic
    
})