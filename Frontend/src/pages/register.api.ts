import axios from "axios"
import { InputValidation } from "./Register"
export const registerUser = async(data:InputValidation)=>{
   try {
    const response= await axios.post('http://localhost:3000/api/v1/user/register', {
        firstName:data.firstName,
        lastName:data.lastName,
        password:data.password,
        email:data.email
      })
      console.log(response.data.message);
   } catch (error:any) {
    console.log(error.res)
   }
      
}