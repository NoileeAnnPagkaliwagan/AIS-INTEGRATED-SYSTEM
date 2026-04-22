import express from "express";
import 'dotenv/config';

import authRoute from "./routes/authRoute.js";


const app = express();

app.use(express.json());


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

const port = 5000;

try {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Listening to port ${process.env.PORT || 5000}...`);
    });
} catch (e) {
    console.log(e);
}


app.use('/auth', authRoute);
