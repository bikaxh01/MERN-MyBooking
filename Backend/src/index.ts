import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose'


mongoose.connect(process.env.DB_URL as string).then(()=>{
    console.log("DB CONNECTED..!");
}).catch((error)=>console.log(error)
)


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", async (req: Request, res: Response) => {
  res.json("Running");
});

app.listen(process.env.PORT, () =>
  console.log(`Server is Running At ${process.env.PORT}`)
);
