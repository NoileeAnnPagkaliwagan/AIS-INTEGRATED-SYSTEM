import * as authServices from "../services/authServices.js"; 

export const registerUser = async (req, res) => { 
    const { id,
            firstName, 
            lastName, 
            dob, 
            course, 
            major, 
            status,
            email,
            password 
        } = req.body;
 
    try { 
        const userProfile = { 
            id, firstName, lastName, dob, course, major, status

        } = req.body;
    
    const result = await authServices.registerUser(userProfile); 
    res.status(201).json({ 
        success: true, 
        message: result }); 
    
    } catch (error) { 
        res.status(500).json({ 
            success: false, 
            message: "An error occured while registering the user." 
        
        }); 
        
        } 
    
    }