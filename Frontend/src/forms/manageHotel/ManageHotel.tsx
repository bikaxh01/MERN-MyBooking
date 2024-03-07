import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import TypeSection from "./TypeSection";
import HotelFacilities from "./HotelFacilities";
import GuestSection from "./GuestSection";
import ImageHotel from "./ImageHotel";

export type HotelFormData = {
  name: string;
  country: string;
  city: string;
  description: string;
  type: string;
  adultCount: Number;
  childCount: Number;
  facilities: string[];
  pricePerNight: Number;
  starRatting: Number;
  images: FileList;
};

type Props = {
  onSave: (hotelFromData: FormData) => void;
  isLoading: boolean;
};

function ManageHotelForm({ onSave, isLoading }: Props) {
  const formMethod = useForm<HotelFormData>();

  const { handleSubmit } = formMethod;

  const onSubmit = handleSubmit((data: HotelFormData) => {

    const formData = new FormData();

    formData.append("name",data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRatting", data.starRatting.toString());
    formData.append("type", data.type);

    data.facilities.forEach((item) =>
      formData.append('facilities',item)
    );
    Array.from(data.images).forEach((img) => formData.append(`imageFile`, img));


    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    onSave(formData);
  });

  return (
    <FormProvider {...formMethod}>
      <form className=" flex-col flex gap-10" onSubmit={onSubmit}>
        <DetailSection />
        <TypeSection />
        <HotelFacilities />
        <GuestSection />
        <ImageHotel />
        <span className=" flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className=" bg-blue-600 h-10 w-36 font-bold text-white hover:bg-blue-500 disabled:bg-gray-300"
          >{
            isLoading ? "Loading" : "Save"
          }
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
