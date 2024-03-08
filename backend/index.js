import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { User } from "./models/userModel.js";
import regRoutes from './routes/regRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
    console.log(req);

    return res.status(234).send("WELCOME");
});




mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('App connected to db');
        app.use('/api', regRoutes)
        app.use(errorMiddleware);
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((eror) => {
        console.log(eror);
    });
