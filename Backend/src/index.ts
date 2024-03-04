import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./Routes/users";
import cookieParser from "cookie-parser"

mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
    console.log("DB CONNECTED..!");
  })
  .catch((error) => console.log(error));

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/v1/user", router);

app.listen(process.env.PORT, () =>
  console.log(`Server is Running At ${process.env.PORT}`)
);
