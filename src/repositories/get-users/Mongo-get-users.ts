import { IGetUserRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUserRepository {
  async getUsers(): Promise<User[]> {
    return [{
      firstName: 'Hélio',
      lastName: 'Júnior',
      eamil: 'helio.junior.ads@gmail.com',
      password: '123456'
    }]
  }
}