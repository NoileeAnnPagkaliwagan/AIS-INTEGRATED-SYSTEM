import express from "express";
import 'dotenv/config.js';
import cors from "cors";
import UserRoutes from "./Auth_System/routes/UserRoutes.js";

//create express app
const app = express();

//ENABLE CORS TO FRONTEND
let corsOptions = {
    origin: process.env.ORIGIN
}

//middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
});

app.use('/user', UserRoutes);

const port = 3000;

app.listen(process.env.PORT || port, ()=>{
    console.log(`Listening to port ${process.env.PORT || port}...`);
});