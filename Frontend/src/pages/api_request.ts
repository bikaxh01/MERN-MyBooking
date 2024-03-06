import { InputValidation } from "./Register";
import { SignInFromData } from "./SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

//Register user
export const registerUser = async (formData: InputValidation) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    // user is existed
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid Token");
  }
  return response.json();
};

export const signIn = async (formData:SignInFromData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/loggin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    // user is existed
    throw new Error(responseBody.message);
  }
  return responseBody

};


export const signOut= async()=>{
  const response = await fetch(`${API_BASE_URL}/api/v1/user/sign-out`,{
    credentials:"include",
    method:"POST",
    headers:{
      "Content-Type": "application/json",
    }
  });

  const resBody=await response.json();

  
  return resBody
}

export const addHotel= async (hotelFromData:FormData)=>{

  for (const pair of hotelFromData.entries()) {
    console.log(pair[0], pair[1]);
  }
  
  const response= await fetch(`${API_BASE_URL}/api/v1/hotel`,{
    method:"POST",
    credentials:"include",
    body:hotelFromData,
  })

  if(!response.ok){ 
    throw new Error ("Error While Creating Hotel")
  }

  return response.json()

}