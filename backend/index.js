import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import regRoutes from './routes/regRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import collectionRoutes from './routes/collectionRoutes.js';
import itemRoutes from './routes/itemRouter.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

app.get('/', (req, res) => {
    console.log(req);

    return res.status(234).send("WELCOME");
});

app.use('/api', collectionRoutes)
app.use('/api', itemRoutes)

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
