import { User } from "../../models/user";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetUserRepository } from "./protocols";


export class GetUsersController implements IController {
  constructor(
    private readonly getUserRepository: IGetUserRepository
  ) { }
  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUserRepository.getUsers();
      return ok<User[]>(users);
   
    } catch (err) {
      return serverError();   
    }
  }
}