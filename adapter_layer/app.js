import express from "express";
import 'dotenv/config.js';

import authRoutes from "./routes/authRoute.js";

//create express app
const app = express();


//middleware
app.use(express.json());


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

const port = 3000;

try {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listening to port ${process.env.PORT || 3000}...`);
    });
} catch (e) {
    console.log(e);
}


app.use('/auth', authRoutes);
