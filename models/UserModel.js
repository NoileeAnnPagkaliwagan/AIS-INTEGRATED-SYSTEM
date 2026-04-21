import pool from "../config/db.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (userProfile, email, password) => {
    // Basic validation
    if (!userProfile.name || userProfile.name.trim() === '' ||
        email.trim() === '' || password.trim() === '') {
        const error = new TypeError('Email and Password are required.');
        error.statusCode = 400;
        throw error;
    }

    if (!validator.isEmail(email)) {
        const error = new TypeError('Invalid email address.');
        error.statusCode = 400;
        throw error;
    }

    if (!validator.isStrongPassword(password)) {
        const error = new TypeError('Password is not strong enough.');
        error.statusCode = 400;
        throw error;
    }

    // Check if user exists
    const [user] = await pool.query("SELECT email FROM tbluser WHERE email = ?", [email]);
    if (user.length === 1) {
        // FIXED: Added backticks
        const error = new Error(`The email ${email} is already used.`);
        error.statusCode = 400;
        throw error;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const connection = await pool.getConnection();

    try {
        // Start transaction
        await connection.beginTransaction();

        // FIXED: Added backticks to the fetch URL
        const response = await fetch(
            `https://ais-simulated-legacy.onrender.com/api/students`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userProfile)
            });

        if (!response.ok) {
            const errorText = await response.text();
            // FIXED: Added backticks
            throw new Error(`External API error: ${response.status} - ${errorText}`);
        }

        await connection.query(
            "INSERT INTO tbluser(email, password) VALUES(?, ?)",
            [email, hashedPassword]
        );

        await connection.commit();
        connection.release();

    } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
    }
}

export const login = async (email, password) => {
    if (email.trim() == '' || password.trim() == "") {
        const error = new Error('Email and password is required.')
        error.statusCode = 400;
        throw error;
    }

    const [user] = await pool.query(
        "SELECT * FROM tbluser WHERE email = ?", [email]);

    if (user.length === 0) {
        // FIXED: Added backticks and corrected typo "exis" to "exist"
        const error = new Error(`An account with the email: ${email} does not exist.`);
        error.statusCode = 400;
        throw error;
    }

    if (!bcrypt.compareSync(password, user[0].password)) {
        const error = new Error('Incorrect password.')
        error.statusCode = 400;
        throw error;
    }

    const token = jwt.sign(
        { id: user[0].id },
        process.env.SECRET,
        { expiresIn: '1d' }
    );

    return token;
}

export const getUser = async (id) => {
    // FIXED: Use isNaN() function instead of comparing to NaN
    if (isNaN(parseInt(id))) {
        throw new Error('Invalid id');
    }

    const [user] = await pool.query('SELECT * FROM tbluser WHERE id = ?', [id]);
    return user;
}