import UserRepository from "../repositories/UserRepository";

class UserService {
  login = async (username: string, password: string) => {
    // TODO: use bcrypt to hash password
    const user = await UserRepository.findBy({ username, password });
  };
}

export default new UserService();
