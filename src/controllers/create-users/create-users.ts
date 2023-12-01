import validator from 'validator'

import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(
    private readonly createUserRepository: ICreateUserRepository
  ) { }
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {

    try {
      //validacao
      // verificar campos obrigatorios.
      const requeredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requeredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      // verificar se o e-mail é valido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if(!emailIsValid){
        return {
          statusCode: 400,
          body: "E-mail is invalid"
        }
      }

      const user = await this.createUserRepository.createUser(httpRequest.body!);
      return {
        statusCode: 201,
        body: user
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: "Something went wrong"
      }
    }

  }

}