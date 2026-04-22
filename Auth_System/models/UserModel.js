import pool from "../config/db.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (userProfile, email, password) => {
    // ✅ Now checks 'name' which is already combined in controller
    if (!userProfile?.name || userProfile.name.trim() === '' ||
        !email || email.trim() === '' ||
        !password || password.trim() === '') {
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

    const [user] = await pool.query("SELECT email FROM tbluser WHERE email = ?", [email]);
    if (user.length === 1) {
        const error = new Error(`The email ${email} is already used.`);
        error.statusCode = 400;
        throw error;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // ✅ Send transformed profile to legacy API
        const response = await fetch(
            `https://ais-simulated-legacy.onrender.com/api/students`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userProfile)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Legacy API error: ${response.status} - ${errorText}`);
        }

        // ✅ Save email + hashed password to XAMPP
        await connection.query(
            "INSERT INTO tbluser(email, password) VALUES(?, ?)",
            [email, hashedPassword]
        );

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const login = async (email, password) => {
    if (!email || email.trim() === '' || !password || password.trim() === '') {
        const error = new Error('Email and password is required.');
        error.statusCode = 400;
        throw error;
    }

    const [user] = await pool.query(
        "SELECT * FROM tbluser WHERE email = ?", [email]
    );

    if (user.length === 0) {
        const error = new Error(`An account with the email: ${email} does not exist.`);
        error.statusCode = 404;
        throw error;
    }

    if (!bcrypt.compareSync(password, user[0].password)) {
        const error = new Error('Incorrect password.');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user[0].id },
        process.env.SECRET,
        { expiresIn: '1d' }
    );

    return token;
};

export const getUser = async (id) => {
    if (isNaN(parseInt(id))) {
        const error = new Error('Invalid id.');
        error.statusCode = 400;
        throw error;
    }

    const [user] = await pool.query('SELECT * FROM tbluser WHERE id = ?', [id]);
    return user;
};