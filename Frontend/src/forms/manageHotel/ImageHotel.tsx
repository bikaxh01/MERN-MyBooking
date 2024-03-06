import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotel";

function ImageHotel() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-3">Image</h2>
        <input
          type="file"
          multiple
          {...register("images", { required: "Please Uploaded Images " })}
        />
      </div>
      {errors.images && (
        <span className=" text-sm text-red-500 font-bold">
          {errors.images.message}
        </span>
      )}
    </div>
  );
}

export default ImageHotel;
