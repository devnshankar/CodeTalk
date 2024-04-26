import express from "express";
import dotenv from "dotenv";
import { apiLogger } from "./utils/APILogger.utils.js";
import userRouter from "./routes/user.routes.js";
import { mongoConnect } from "./database/mongo.database.js";
import cors from 'cors'

function main() {
  try {
    const app = express();
    app.use(express.json());
    dotenv.config();

    const corsOptions = {
      origin: "http://localhost:5173",
      optionsSuccessStatus: 200, 
    };

    app.use(cors(corsOptions));

    app.use(apiLogger);

    mongoConnect();
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port: ${process.env.PORT}`);
    });

    app.use("/user", userRouter);
  } catch (error) {
    console.log(error);
  }
}

main();
