import { User } from "../../models/user"


export interface IGetUserRepository {
  getUsers(): Promise<User[]>;
}

