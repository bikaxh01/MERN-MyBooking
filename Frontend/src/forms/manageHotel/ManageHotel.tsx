import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";

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

function ManageHotelForm() {
  const formMethod = useForm<HotelFormData>();
  return <FormProvider {...formMethod}>
    <form >
        <DetailSection/>
    </form>
  </FormProvider>;
}

export default ManageHotelForm;
