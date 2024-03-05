import { NumericType } from "mongodb";
import mongoose from "mongoose";

export type Hotel = {
  _id: string;
  userId: string;
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
  lastUpdated: Date;
  images: string[];
};

const hotelSchema = new mongoose.Schema<Hotel>({
  name: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  images: [{type:String}],
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  adultCount: {
    type: Number,
  },
  childCount: {
    type: Number,
  },
  facilities: [{ type: String, require: true }],
  pricePerNight: {
    type: String,
  },
  lastUpdated: {
    type: Date,
  },
  starRatting: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

export const Hotel = mongoose.model<Hotel>("hotels", hotelSchema);
