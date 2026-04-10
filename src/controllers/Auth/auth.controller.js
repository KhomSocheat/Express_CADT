import asyncHandler from 'express-async-handler'

export const login = asyncHandler(async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;

    //Login logic
    if(username == 'demo' && password == 'password123'){
        return res.json({token: 'fake-token'})
    }
    
})