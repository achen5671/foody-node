import User from "../../db/models/User";

export type User = {
  name: string;
  username: string;
  password: string;
  email: string;
  smsNumber: string;
  updatedAt: string;
  createdAt: string;
};

class UserRepository {
  findBy = async (request: {
    username: string;
    password: string;
  }): Promise<User | null> => {
    return User.findOne(request);
  };
}

export default new UserRepository();
