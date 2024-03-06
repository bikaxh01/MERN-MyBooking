import { useFormContext } from "react-hook-form";
import { hotelType } from "../../config/hotel-option-config";
import { HotelFormData } from "./ManageHotel";

function TypeSection() {
  const { register, watch, formState:{errors} } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className=" font-bold text-2xl m-3">Type</h2>
      <div className=" grid grid-cols-5 gap-2">
        {hotelType.map((type) => (
          <label key={type}
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 hover:bg-blue-300"
            }
          >
            <input
              className=" hidden"
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className=" text-sm text-red-500 font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}

export default TypeSection;
