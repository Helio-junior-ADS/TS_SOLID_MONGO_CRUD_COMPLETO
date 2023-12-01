import { User } from "../../models/user";
import { CreateUserParams } from "../create-users/protocols";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserController, IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(
    private readonly updateUserRepository: IUpdateUserRepository
  ) { }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {


    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }
      // Validacao
      // Campos para validar no body
      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        'firstName',
        'lastName',
        'password'
      ];
      // validacao dos campos 
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed"
        }
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user
      }

    } catch (err) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}