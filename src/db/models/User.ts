import mongoose, { Types } from "mongoose";
import { BaseModel } from "./BaseModel";
import { ObjectId } from "mongodb";

// NOTE:
//  favoriteMeals per user should be relatively small, but if it ever scales,
//  update favoriteMeals to it's own schema if the document exceeds mongo's 16MB limit
const favoriteMeals = {
  name: String,
  calories: Number,
  nutrition: Object,
  prepTime: String,
  ingredients: [String],
  preparations: [String],
};

export interface IUser {
  _id: Types.ObjectId;
  name: string; // todo: split to firstname lastname schema
  username: string;
  password: string;
  email: string;
  smsNumber?: string;
  favoriteMeals: [];
  weightGoal?: number;
  weightProgress: [];
  currentWeight: number;
  dailyTDEE: number;
  fitness?: {};
  birthday: Date;
  profilePictureUrl?: string;
  profileBannerUrl?: string;
  updatedAt: Date;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  smsNumber: {
    type: String,
    unique: true,
  },
  favoriteMeals: {
    type: [favoriteMeals],
    default: () => [],
  },
  weightGoal: {
    type: Number,
    min: 69, // nice
    max: 420,
  },
  weightProgress: {
    type: [
      // can I add validator to the object?
      {
        date: Date, // todo: use timestamp? or date object?
        weight: Number,
      },
    ],
    default: () => [],
  },
  currentWeight: {
    type: Number,
    min: 69, // nice
    max: 420,
  },
  dailyTDEE: {
    type: Number,
    min: 0,
  },
  fitness: {
    type: {
      weight: Number,
      height: Number,
      age: Number, // todo: use birthday to calculate age
    },
    required: false,
  },
  birthday: {
    type: Date,
  },
  profilePictureUrl: String, // todo: default this to some image
  profileBannerUrl: String, // todo: default this to some image
  ...BaseModel,
});

export default mongoose.model("User", userSchema);
