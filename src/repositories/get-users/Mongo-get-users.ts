import { IGetUserRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUserRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db.collection<User>('users').find({}).toArray();

    users[0].
    return [{
      firstName: 'Hélio',
      lastName: 'Júnior',
      eamil: 'helio.junior.ads@gmail.com',
      password: '123456'
    }]
  }
}