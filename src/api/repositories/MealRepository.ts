import Meal, { IMeal } from "../../db/models/Meal";
import { ObjectId } from "mongodb";

class MealRepository {
  findOne = (request: any): Promise<IMeal | null> => {
    return Meal.findOne(request);
  };

  insert = async (request: any): Promise<IMeal | null> => {
    return Meal.create(request);
  };

  delete = async (mealId: ObjectId): Promise<void> => {
    await Meal.deleteOne({ _id: mealId });
  };
}

export default new MealRepository();
