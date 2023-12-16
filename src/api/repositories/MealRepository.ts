import Meal from "../../db/models/Meal";
import User, { UserType } from "../../db/models/User";
import { ObjectId } from "mongodb";

class MealRepository {
  findOne = (request: any) => {
    return Meal.findOne(request);
  };

  insert = async (request: any) => {
    return Meal.create(request);
  };

  delete = async (mealId: ObjectId) => {
    return Meal.deleteOne({ _id: mealId });
  };
}

export default new MealRepository();
