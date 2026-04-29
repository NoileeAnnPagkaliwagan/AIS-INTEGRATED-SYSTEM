import * as profileServices from "../services/profileServices.js"; 

export const registerProfile = async (req, res) => { 
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
        const studentProfile = { 
            id, firstName, lastName, dob, course, major, status

        } = req.body;
    
    const result = await profileServices.createProfile(studentProfile); 
    res.status(201).json({ 
        success: true, 
        message: result }); 
    
    } catch (error) { 
        res.status(500).json({ 
            success: false, 
            message: "Profile not found." 
        
        }); 
        
        } 
    
    };

    export const listAll = async (req, res) => {
    try {
        const result = await profileServices.listAllProfiles();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};