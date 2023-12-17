import mongoose from "mongoose";
import { BaseModel } from "./BaseModel";
import { ObjectId } from "mongodb";

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
  _id: ObjectId;
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
    unique: true,
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
  ...BaseModel,
});

export default mongoose.model("User", userSchema);
