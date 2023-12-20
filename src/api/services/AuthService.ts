import User from "../../db/models/User";
import { ResourceDoesNotExistError } from "../middlewares/apiErrors";
import UserRepository from "../repositories/UserRepository";
import { JoinRequest, LoginRequest } from "../routes/Request";
import jwt from "jsonwebtoken";

class AuthService {
  register = async (joinRequest: JoinRequest): Promise<string> => {
    const user = await User.create(joinRequest);
    await user.save();

    const token = await jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string
    );

    return token;
  };

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
