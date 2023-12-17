import { ObjectId } from "mongodb";
import { UserType } from "../../db/models/User";
import { ResourceDoesNotExistError } from "../middlewares/apiErrors";
import UserRepository from "../repositories/UserRepository";
import {
  CalculateCaloricIntakeRequest,
  FavoriteMealRequest,
  PatchSelfRequest,
  WeightProgressRequest,
} from "../routes/Request";
import LogicService from "./LogicService";

class UserService {
  login = async (username: string, password: string): Promise<UserType> => {
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
  ) => {
    await UserRepository.addFavoriteMeal(new ObjectId(userId), favMealRequest);
  };

  deleteFavoriteMeal = async (userId: string, favMealId: string) => {
    await UserRepository.deleteFavoriteMeal(
      new ObjectId(userId),
      new ObjectId(favMealId)
    );
  };

  getSelf = (userId: string) => {
    return UserRepository.findOne({ _id: new ObjectId(userId) });
  };

  getProfile = (username: string) => {
    return UserRepository.findOne({ username });
  };

  patchSelf = (userId: string, request: PatchSelfRequest) => {
    return UserRepository.patchById(new ObjectId(userId), request);
  };

  addWeightProgress = (userId: string, request: WeightProgressRequest) => {
    const formatRequest = {
      date: new Date(request.date),
      weight: request.weight,
    };

    return UserRepository.addWeightProgress(
      new ObjectId(userId),
      formatRequest
    );
  };

  // intake calories < than tdee to lose weight
  // tdee: Total Daily Energy Expenditure
  // bmr: Basal Metabolic Rate
  calculateCaloricIntake = async (
    request: CalculateCaloricIntakeRequest
  ): Promise<number> => {
    // todo: validateRequest
    const bmr = LogicService.calculateBMR(request);
    const tdee = LogicService.calculateTDEE(bmr, request.activityLevel);
    return tdee;
  };
}

export default new UserService();
