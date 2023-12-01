import { IController } from "../protocols";
import { IGetUserRepository } from "./protocols";


export class GetUsersController implements IController {
  constructor(
    private readonly getUserRepository: IGetUserRepository
  ) { }
  async handle() {
    try {
      const users = await this.getUserRepository.getUsers();
      return {
        statusCode: 200,
        body: users
      };
    } catch (err) {
      return {
        statusCodes: 500,
        body: 'Semething went wrong'
      }
    }
  }
}