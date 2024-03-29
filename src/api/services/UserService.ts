import { ObjectId } from "mongodb";
import { IUser } from "../../db/models/User";
import { ResourceDoesNotExistError } from "../middlewares/apiErrors";
import UserRepository from "../repositories/UserRepository";
import {
  CalculateCaloricIntakeRequest,
  FavoriteMealRequest,
  PatchSelfRequest,
  WeightProgressRequest,
} from "../routes/Request";
import LogicService from "./LogicService";
import {
  ActivityFactor,
  ActivityLevel,
  Fitness,
  PROJECTED_INTERVAL_IN_MONTHS,
  WEEKS_PER_MONTH,
} from "../helpers/constants";
import MealRepository from "../repositories/MealRepository";
import { getAge } from "../helpers/utils";

class UserService {
  login = async (username: string, password: string): Promise<IUser> => {
    // TODO: use bcrypt to hash password
    const user = await UserRepository.findOne({ username, password });

    if (!user) {
      throw new ResourceDoesNotExistError("user not found");
    }

    return user;
  };

  addFavoriteMeal = async (
    userId: string,
    favMealRequest: FavoriteMealRequest
  ): Promise<void> => {
    await UserRepository.addFavoriteMeal(new ObjectId(userId), favMealRequest);
  };

  deleteFavoriteMeal = async (
    userId: string,
    favMealId: string
  ): Promise<void> => {
    await UserRepository.deleteFavoriteMeal(
      new ObjectId(userId),
      new ObjectId(favMealId)
    );
  };

  // DEPRECATED.
  // Use getProfile()
  getSelf = (userId: string): Promise<IUser | null> => {
    return UserRepository.findOne({ _id: new ObjectId(userId) });
  };

  getProfile = async (
    userId: string
  ): Promise<
    (IUser & { todayCalorieIntake?: number; age?: number }) | null
  > => {
    const user = await UserRepository.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      throw new ResourceDoesNotExistError("user does not exist");
    }

    const todayCalorieIntake = await MealRepository.getTodayCaloricIntake({
      userId: user._id,
    });

    const age = getAge(user.birthday.toString());

    return {
      ...user,
      age,
      todayCalorieIntake: todayCalorieIntake[0]?.totalCalories,
    };
  };

  patchSelf = (
    userId: string,
    request: PatchSelfRequest
  ): Promise<IUser | null> => {
    return UserRepository.patchById(new ObjectId(userId), request);
  };

  addWeightProgress = async (
    userId: string,
    request: WeightProgressRequest
  ): Promise<void> => {
    const formatRequest = {
      date: new Date(request.date),
      weight: request.weight,
    };

    await UserRepository.addWeightProgress(new ObjectId(userId), formatRequest);
  };

  // intake calories < than tdee to lose weight
  // tdee: Total Daily Energy Expenditure
  // bmr: Basal Metabolic Rate
  // todo: need to add calorie surplus to tdee.
  calculateCaloricIntakes = async (
    request: CalculateCaloricIntakeRequest
  ): Promise<any> => {
    // todo: validateRequest
    const bmr = LogicService.calculateBMR(request);
    const result = await Promise.all(
      Array.from(ActivityFactor.keys()).map((level) => {
        const tdee = LogicService.calculateTDEE(bmr, level as ActivityLevel);
        const change = LogicService.calculateCaloricDeficitOrSurplus(
          request.weightToLoseEveryWeek ?? 1,
          7
        );

        return {
          level,
          tdee: Math.floor(tdee),
          change: Math.floor(change),
          bmr: Math.floor(bmr),
          intake:
            request.fitnessType === Fitness.GAIN
              ? Math.floor(tdee + change)
              : Math.floor(tdee - change),
        };
      })
    );
    return {
      activity: request.activityLevel,
      tdee: Math.floor(
        LogicService.calculateTDEE(bmr, request.activityLevel as ActivityLevel)
      ),
      others: result ?? [],
    };
  };

  projectedWeightProgress = async (
    userId: string
  ): Promise<{ months: number[] }> => {
    const user = await UserRepository.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      throw new ResourceDoesNotExistError("user does not exist");
    }

    // hard coded for now.
    // todo: input should be entered by the user
    const weightLosePerWeek = 1;
    const months = new Array(PROJECTED_INTERVAL_IN_MONTHS);
    let weight = user.weight;

    months.forEach((month) => {
      month = weight - WEEKS_PER_MONTH * weightLosePerWeek;
    });

    return {
      months,
    };
  };

  // todo: only can delete weight submission for the given day. look at MealService.deleteMeal as reference
  deleteWeightSubmission = async (
    userId: string,
    submissionId: string
  ): Promise<void> => {
    await UserRepository.deleteWeightSubmission(
      new ObjectId(userId),
      new ObjectId(submissionId)
    );
  };

  follow = async (userId: string, targetUserId: string): Promise<void> => {
    await UserRepository.follow(
      new ObjectId(userId),
      new ObjectId(targetUserId)
    );
  };

  unfollow = async (userId: string, targetUserId: string): Promise<void> => {
    await UserRepository.unfollow(
      new ObjectId(userId),
      new ObjectId(targetUserId)
    );
  };

  getFollowing = async (userId: string) => {
    return UserRepository.getFollowing(new ObjectId(userId));
  };

  getFollowers = async (userId: string) => {
    return UserRepository.getFollowers(new ObjectId(userId));
  };
}

export default new UserService();
