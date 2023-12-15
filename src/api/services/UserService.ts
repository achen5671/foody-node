import { UserType } from "../../db/models/User";
import { ResourceDoesNotExistError } from "../middlewares/apiErrors";
import UserRepository from "../repositories/UserRepository";
import { FavoriteMealRequest } from "../routes/Request";

class UserService {
  login = async (username: string, password: string): Promise<UserType> => {
    // TODO: use bcrypt to hash password
    const user = await UserRepository.findBy({ username, password });

    if (!user) {
      throw new ResourceDoesNotExistError("user not found");
    }

    return user;
  };

  addFavoriteMeal = async (
    userId: string,
    favMealRequest: FavoriteMealRequest
  ) => {
    await UserRepository.addFavoriteMeal(userId, favMealRequest);
  };
}

export default new UserService();
