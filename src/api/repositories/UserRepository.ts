import { ObjectId } from "mongodb";
import User, { IUser } from "../../db/models/User";
import {
  FavoriteMealRequest,
  PatchSelfRequest,
  WeightProgressRequest,
} from "../routes/Request";

class UserRepository {
  findOne = async (request: Partial<IUser>): Promise<IUser | null> => {
    return User.findOne(request);
  };

  findByUsername = async (username: string): Promise<IUser | null> => {
    return User.findOne({ username });
  };

  addFavoriteMeal = async (
    userId: ObjectId,
    request: FavoriteMealRequest
  ): Promise<void> => {
    await User.updateOne(
      { _id: userId },
      { $push: { favoriteMeals: request } }
    );
  };

  deleteFavoriteMeal = async (
    userId: ObjectId,
    mealId: ObjectId
  ): Promise<void> => {
    await User.updateOne(
      { _id: userId },
      { $pull: { favoriteMeals: { _id: mealId } } }
    );
  };

  patchById = async (
    userId: ObjectId,
    request: PatchSelfRequest
  ): Promise<IUser | null> => {
    return User.findOneAndUpdate(
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
  ): Promise<void> => {
    await User.updateOne(
      { _id: userId },
      { $push: { weightProgress: request } }
    );
  };

  deleteWeightSubmission = async (
    userId: ObjectId,
    submissionId: ObjectId
  ): Promise<void> => {
    await User.updateOne(
      { _id: userId },
      { $pull: { weightProgress: { _id: submissionId } } }
    );
  };
}

export default new UserRepository();
