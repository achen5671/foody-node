import User, { UserType } from "../../db/models/User";
import { FavoriteMealRequest } from "../routes/Request";

class UserRepository {
  findBy = async (request: {
    username: string;
    password: string;
  }): Promise<UserType | null> => {
    return User.findOne(request);
  };

  addFavoriteMeal = async (userId: string, request: FavoriteMealRequest) => {
    return User.updateOne(
      { _id: userId },
      { $push: { favoriteMeals: request } }
    );
  };
}

export default new UserRepository();
