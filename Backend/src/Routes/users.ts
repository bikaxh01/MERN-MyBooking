import express,{Request,Response} from 'express'
import { User } from '../Model/user.model';
const router=express.Router()


router.post('/register', async (req:Request,res:Response)=>{
   try {
    let user = await User.findOne({
        email:req.body.email
    })

    if(user){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }

    user= new User(req.body)
    await user.save()

   } catch (error) {
    console.log(error); 
    res.status(400).json({
        message:"Something Went Wrong..!"
    })
   }
})