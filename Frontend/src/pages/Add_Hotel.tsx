import { useMutation } from 'react-query'
import ManageHotelForm from '../forms/manageHotel/ManageHotel'
import * as apiClient from '../pages/api_request.ts'
import { useAppContext } from '../context/app.context.tsx'

function Add_Hotel() {
   const {showToast} = useAppContext()
  const {mutate,isLoading} =useMutation(apiClient.addHotel,{
    onSuccess:()=>{
     showToast({message:"Hotel Created",type:"Success"})
    },
    onError:()=>{
      showToast({message:"Failed to Create Hotel",type:"Error"})
    }
  })

  const handleSave = (formData:FormData)=>{
    mutate(formData)
  }


  return (<ManageHotelForm onSave={handleSave} isLoading={isLoading}/>)
}

export default Add_Hotel