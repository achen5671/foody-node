import mongoose, { ObjectId } from "mongoose";
import { BaseModel } from "./BaseModel";
import { MealType } from "../../api/helpers/constants";

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: MealType,
    required: false,
  },
  calories: {
    type: Number,
    required: true,
    min: 0,
  },
  ...BaseModel,
});

export default mongoose.model("Meal", mealSchema);
