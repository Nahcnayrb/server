// src/index.js
import express, { Express} from "express";
import dotenv from "dotenv";
import usersRouter from './routes/users';
import { connectToDatabase } from "./services/database.service";
import cors from 'cors';
import loginRouter from './routes/login';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

connectToDatabase()
  .then(() => {

    //app.use(cors())
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    //app.use(cors(options));
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