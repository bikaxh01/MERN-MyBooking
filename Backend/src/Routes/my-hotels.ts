import express,{Request,Response} from "express"
import multer from 'multer'
import cloudinary from 'cloudinary'
import { Hotel } from "../Model/hotels.model"
import { validateToken } from "../Middleware/auth"

const storage = multer.memoryStorage()
const upload= multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024 // 5MB
    }
})

const router= express.Router()

router.post('/',upload.array("imageFile",6),validateToken,async (req:Request,res:Response)=>{
try {
    // getting imaegs from request
    const imageFile= req.files as Express.Multer.File[]

    const hotelDetail:Hotel= req.body;

    // upload images to cloudinary
    const uploadToCloud = imageFile.map(async(image)=>{
      const bs64= Buffer.from(image.buffer).toString("base64");
      let imageURL = "data:"+ image.mimetype + ";base64,"+bs64;
      const res= await cloudinary.v2.uploader.upload(imageURL)
      return res.url
    })

    const imageURl = await Promise.all(uploadToCloud)
     
    hotelDetail.images=imageURl;
    hotelDetail.lastUpdated= new Date();
    hotelDetail.userId= req.userId

    // store URL of image to DB

    const hotel = new Hotel (hotelDetail)
    await hotel.save()
 res.status(201).json({
    data:hotel
 })

} catch (error) {
    console.log("Error while creating hotel: ", error);
    res.status(400).json({
        message:"Error while creating hotel...!"
    })
    
}
})
const hotelRoute= router
export default hotelRoute