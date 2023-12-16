import { InsertMealRequest } from "../routes/Request";
import MealRepository from "../repositories/MealRepository";
import { ObjectId } from "mongoose";
import {
  BadRequestError,
  ResourceDoesNotExistError,
} from "../middlewares/apiErrors";

class MealService {
  addMeal = async (userId: string, request: InsertMealRequest) => {
    await MealRepository.insert({ userId, ...request });
  };

  deleteMeal = async (mealId: string) => {
    const meal = await MealRepository.findOne({ mealId: ObjectId(mealId) });

    if (!meal) {
      throw new ResourceDoesNotExistError(`Meal: ${meal._id} does not exist`);
    }

    if (meal.createdAt < new Date()) {
      throw new BadRequestError("You cannot delete a past meal");
    }

    await MealRepository.delete(mealId);
  };
}

export default new MealService();
