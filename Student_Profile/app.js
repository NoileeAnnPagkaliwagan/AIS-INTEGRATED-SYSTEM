import express from "express";
import 'dotenv/config.js';
import studentRoutes from './routes/studentRoutes.js';
import cors from 'cors';

const app = express();

let corseOptions = {
    origin: process.env.ORIGIN
};

app.use(express.json());
app.use(cors(corseOptions));


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


app.use('/api/student', studentRoutes);

const port = process.env.PORT || 4000; 

try {
    app.listen(port, () => {
        console.log(`Student Profile is listening on port ${port}...`);
    });
} catch (e) {
    console.log(e);
}