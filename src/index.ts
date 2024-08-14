// src/index.js
import express, { Express} from "express";
import dotenv from "dotenv";
import usersRouter from './routes/users';
import { connectToDatabase } from "./services/database.service";
import cors from 'cors';
import loginRouter from './routes/login';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3069;

const allowedOrigins = ['http://localhost:3000','http://192.168.1.97:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

connectToDatabase()
  .then(() => {


    app.use(cors(options));
    app.use('/players', usersRouter);
    app.use('/login', loginRouter);

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });

  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});