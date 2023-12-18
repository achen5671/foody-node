import { InsertMealRequest } from "../routes/Request";
import MealRepository from "../repositories/MealRepository";
import {
  BadRequestError,
  ResourceDoesNotExistError,
} from "../middlewares/apiErrors";
import { ObjectId } from "mongodb";
import { IMeal } from "../../db/models/Meal";

class MealService {
  addMeal = async (
    userId: string,
    request: InsertMealRequest
  ): Promise<IMeal | null> => {
    return MealRepository.insert({ userId, ...request });
  };

  deleteMeal = async (mealId: string): Promise<void> => {
    const meal = await MealRepository.findOne({ _id: new ObjectId(mealId) });

    if (!meal) {
      throw new ResourceDoesNotExistError(`Meal: ${mealId} does not exist`);
    }

    // if (meal.createdAt < new Date()) {
    //   throw new BadRequestError("You cannot delete a past meal");
    // }

    await MealRepository.delete(new ObjectId(mealId));
  };
}

export default new MealService();
