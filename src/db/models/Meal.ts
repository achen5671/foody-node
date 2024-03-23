import mongoose, { Types } from "mongoose";
import { BaseModel } from "./BaseModel";
import { MealType } from "../../api/helpers/constants";
import { ObjectId } from "mongodb";
import User from "./User";

// todo: rename to MealSubmission?
// Meal: what user has eaten on said day
export interface IMeal {
  name: string;
  userId: ObjectId;
  date: Date;
  type: string;
  calories: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const mealSchema = new mongoose.Schema<IMeal>({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(MealType),
    required: false,
  },
  calories: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  ...BaseModel,
});

export default mongoose.model("Meal", mealSchema);
