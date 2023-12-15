import mongoose from "mongoose";
import { BaseModel } from "./BaseModel";

// NOTE:
//  favoriteMeals per user should be relatively small, but if it ever sacles,
//  update favoriteMeals to it's own schema if the document exceeds mongo's 16MB limit
const favoriteMeals = {
  name: String,
  calories: Number,
  nutrition: Object,
  prepTime: String,
  ingredients: [String],
  preparations: [String],
};

export type UserType = {
  name: string;
  username: string;
  password: string;
  email: string;
  smsNumber: string;
  updatedAt: string;
  createdAt: string;
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
  },
  smsNumber: {
    type: String,
  },
  favoriteMeals: {
    type: [favoriteMeals],
  },
  ...BaseModel,
});

export default mongoose.model("User", userSchema);
