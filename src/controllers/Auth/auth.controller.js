import asyncHandler from 'express-async-handler'
import bcrypt from "bcrypt";
import userModel from '../../models/user.model.js';
import jwt from 'jsonwebtoken'

// ====================== LOGIN ======================
export const login = asyncHandler(async (req, res) => {

    // Get username and password from request body
    const { username, password } = req.body;

    // Validate: check if user did not input username or password
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Find user in database by username
    const user = await userModel.findOne({ username: username });

    // If user not found → return error
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Compare entered password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match → return error
    if (!isMatch) {
       return res.status(401).json({ message: "Username or Password Incorrect" });
    }

    // ================= JWT TOKEN =================

    // Create payload (data inside token)
    const payload = {
        _id: user._id,
        username: user.username,
        role: user.role
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    // Send token + user data to frontend
    return res.json({
        accessToken: token,
        user
    });

});


// ====================== REGISTER ======================
export const register = asyncHandler(async (req, res) => {

    // Get user data from request body
    const { name, username, age, email, role, password } = req.body;

    // Check if email already exists in database
    const existingUser = await userModel.findOne({ email });

    // If email exists → return error
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password before saving to database
    const encryptPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const user = new userModel({
        name,
        username,
        age,
        role,
        email,
        password: encryptPassword
    });

    // Save user to database
    await user.save();

    // Return created user data
    return res.json(user);
});