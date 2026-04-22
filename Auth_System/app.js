import express from "express";
import cors from "cors";
import 'dotenv/config.js';


import authRoutes from "./routes/userRoutes.js";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

const corsOptions = {
    origin: process.env.ORIGIN || "*" 
};

app.use(express.json());

app.use(cors(corsOptions));

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to: ${req.path}`);
    next();
});


app.use('/user', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', authRoutes);


app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Auth service is running',
        port: PORT
    });
});


app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});