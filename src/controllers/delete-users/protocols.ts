import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteUserController {
  handle(httpResquest: HttpRequest<any>):Promise<HttpResponse<User>>
}

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}