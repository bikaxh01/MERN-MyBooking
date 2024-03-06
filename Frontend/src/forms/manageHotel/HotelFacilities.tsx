import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-option-config";
import { HotelFormData } from "./ManageHotel";

function HotelFacilities() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className=" text-2xl font-bold mb-3">Facilities</h2>
      <div className=" grid grid-cols-5 gap-2">
        {hotelFacilities.map((facilities) => (
          <label  key={facilities}className=" text-sm flex gap-1 text-gray-700">
            <input
              type="checkbox"
              value={facilities}
              {...register("facilities", {
                required: "This field is required",
              })}
            />
            {facilities}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className=" text-sm text-red-500 font-bold">{errors.facilities.message}</span>
  )}
    </div>
  );
}

export default HotelFacilities;
