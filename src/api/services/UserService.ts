import { ResourceDoesNotExistError } from "../middlewares/apiErrors";
import UserRepository from "../repositories/UserRepository";

class UserService {
  login = async (username: string, password: string) => {
    // TODO: use bcrypt to hash password
    const user = await UserRepository.findBy({ username, password });

    if (!user) {
      throw new ResourceDoesNotExistError("user not found");
    }

    return user;
  };
}

export default new UserService();
