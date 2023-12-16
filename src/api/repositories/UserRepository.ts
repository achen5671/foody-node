import { ObjectId } from "mongodb";
import User, { UserType } from "../../db/models/User";
import {
  FavoriteMealRequest,
  PatchSelfRequest,
  WeightProgressRequest,
} from "../routes/Request";

class UserRepository {
  findOne = async (request: Partial<UserType>): Promise<UserType | null> => {
    return User.findOne(request);
  };

  findByUsername = async (username: string) => {
    return User.findOne({ username });
  };

  addFavoriteMeal = async (userId: ObjectId, request: FavoriteMealRequest) => {
    return User.updateOne(
      { _id: userId },
      { $push: { favoriteMeals: request } }
    );
  };

  deleteFavoriteMeal = async (userId: ObjectId, mealId: ObjectId) => {
    return User.updateOne(
      { _id: userId },
      { $pull: { favoriteMeals: { _id: mealId } } }
    );
  };

  patchById = async (userId: ObjectId, request: PatchSelfRequest) => {
    return User.updateOne(
      { _id: userId },
      {
        $set: {
          ...request,
        },
      }
    );
  };

  addWeightProgress = async (
    userId: ObjectId,
    request: any // any for now
  ) => {
    return User.updateOne(
      { _id: userId },
      { $push: { weightProgress: request } }
    );
  };
}

export default new UserRepository();
