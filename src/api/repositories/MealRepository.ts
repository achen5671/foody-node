import Meal, { IMeal } from "../../db/models/Meal";
import { ObjectId } from "mongodb";
import { today, tomorrow } from "../helpers/utils";

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

  findByDate = async (date: String): Promise<IMeal[]> => {
    return Meal.where({ date });
  };

  getTodayCaloricIntake = async (request: {
    userId: ObjectId;
  }): Promise<any> => {
    const result = Meal.aggregate([
      {
        $match: {
          userId: request.userId,
          date: { $gte: today, $lt: tomorrow },
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            date: "$date",
          },
          totalCalories: {
            $sum: "$calories",
          },
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id.userId",
          date: "$_id.date",
          totalCalories: 1,
        },
      },
    ]);

    return result;
  };
}

export default new MealRepository();
