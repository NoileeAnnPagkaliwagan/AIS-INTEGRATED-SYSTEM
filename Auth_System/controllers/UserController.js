import * as UserModel from "../models/UserModel.js";

export const register = async (req, res) => {
    const {
        firstName,
        lastName,
        dob,
        course,
        major,
        address,
        email,
        password
    } = req.body;

    try {
        
        const userProfile = {
            name: `${firstName} ${lastName}`,   
            birthdate: dob,                      
            address: address,
            program: course,                     
            studentStatus: "Active"              
        };

        await UserModel.createUser(userProfile, email, password);
        res.status(201).json({
            success: true,
            message: [{ result: "A new account has been created!" }]
        });
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).json({
            success: false,
            message: e.message || "Internal Server Error"
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await UserModel.login(email, password);
        res.status(200).json({
            success: true,
            message: [{ result: "Login successful", token }]
        });
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).json({
            success: false,
            message: e.message || "Internal Server Error"
        });
    }
};