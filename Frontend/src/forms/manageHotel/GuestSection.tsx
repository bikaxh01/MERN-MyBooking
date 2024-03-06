import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotel";

function GuestSection() {
    const {register, formState:{errors}}= useFormContext<HotelFormData>()
    
  return (
    <div >
      <div className=" flex gap-3">
        <label className=" font-bold text-gray-700 text-sm flex-1">
          Adult allowed 
          <input
            className=" border rounded w-full py-1 px-2 font-normal"
            type="number"
            {...register("adultCount", { required: "This field is required" })}
          ></input>
          {errors.adultCount && (
            <span className=" text-red-500">{errors.adultCount?.message}</span>
          )}
        </label>{" "}
        <label className=" font-bold text-gray-700 text-sm flex-1">
          Child allowed
          <input
            className=" border rounded w-full py-1 px-2 font-normal"
            type="number"
            {...register("childCount", { required: "This field is required" })}
          ></input>
          {errors.childCount && (
            <span className=" text-red-500">{errors.childCount?.message}</span>
          )}
        </label>
      </div>
    </div>
  );
}

export default GuestSection;
