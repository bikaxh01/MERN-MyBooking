import { useForm, useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotel";

function DetailSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className=" flex flex-col gap-4 mt-0 pt-0">
      <h1 className=" font-bold text-3xl mb-3"> Add Hotel</h1>
      <label className=" font-bold text-gray-700 text-sm flex-1">
        Name
        <input
          className=" border rounded w-full py-1 px-2 font-normal"
          type="text"
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className=" text-red-500">{errors.name?.message}</span>
        )}
      </label>
      <div className=" flex gap-2">
        <label className=" font-bold text-gray-700 text-sm flex-1">
          City
          <input
            className=" border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.name && (
            <span className=" text-red-500">{errors.city?.message}</span>
          )}
        </label>
        <label className=" font-bold text-gray-700 text-sm flex-1">
          Country
          <input
            className=" border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.name && (
            <span className=" text-red-500">{errors.country?.message}</span>
          )}
        </label>
      </div>
      <label className=" font-bold text-gray-700 text-sm flex-1">
        Description
        <textarea
          className=" border rounded w-full py-1 px-2 font-normal"
          rows={10}
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.name && (
          <span className=" text-red-500">{errors.description?.message}</span>
        )}
      </label>
      <label className=" font-bold text-gray-700 text-sm flex-1 max-w-[50%]">
        Price Per Night
        <input
          className=" border rounded w-full py-1 px-2 font-normal"
          type="number"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className=" text-red-500">{errors.pricePerNight?.message}</span>
        )}
      </label>
      <label className=" font-bold text-gray-700 text-sm flex-1 max-w-[50%]">
        Star Ratting
        <select
          {...register("starRatting", { required: "This field is required" })}
          className=" border-rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className=" font-bold text-sm">
            Select as star
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        {errors.starRatting && (
          <span className=" text-red-500">{errors.starRatting?.message}</span>
        )}
      </label>
    </div>
  );
}

export default DetailSection;
