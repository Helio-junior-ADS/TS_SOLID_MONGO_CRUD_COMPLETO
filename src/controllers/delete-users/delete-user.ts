import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(
    private readonly deleteUserRepository: IDeleteUserRepository
  ) { }
  async handle(httpResquest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
    try {
      // Validacao
      const id = httpResquest?.params?.id 

      if(!id){
        return badRequest("Missing user id");      
      }

      const user = await this.deleteUserRepository.deleteUser(id);
      return ok<User>(user)
      

    } catch (err) {
      return serverError();
    }
  }

}