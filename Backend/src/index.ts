import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./Routes/users";
import hotelRoute   from "./Routes/my-hotels";
import cookieParser from "cookie-parser"
import { v2  as cloudinary} from "cloudinary";


cloudinary.config({
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME
})


mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
    console.log("DB CONNECTED..!");
  })
  .catch((error:Error) => console.log(error));

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/v1/user", router);
app.use("/api/v1/hotel", hotelRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server is Running At ${process.env.PORT}`)
);
