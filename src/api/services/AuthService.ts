import { ResourceDoesNotExistError } from "../middlewares/apiErrors";
import UserRepository from "../repositories/UserRepository";
import { LoginRequest } from "../routes/Request";
import jwt from "jsonwebtoken";

class AuthService {
  login = async (loginRequest: LoginRequest): Promise<string> => {
    const { username, password } = loginRequest;

    const user = await UserRepository.findOne({ username, password });
    if (!user) {
      throw new ResourceDoesNotExistError("user does not exist");
    }

    const token = await jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string
    );

    return token;
  };
}

export default new AuthService();
