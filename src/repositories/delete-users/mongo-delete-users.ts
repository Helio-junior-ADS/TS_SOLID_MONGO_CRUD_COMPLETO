import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../controllers/delete-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    // buscando o usuario
    const user = await MongoClient.db
      .collection < MongoUser > ('users')
        .findOne({ _id: new ObjectId(id) })
    // validano a buscar
    if (!user) {
      throw new Error("User Not Found");
    }
    // Deletando o usuario
    const { deletedCount } = await MongoClient.db
      .collection('users')
      .deleteOne({ _id: new ObjectId(id) })
    // Validano o delete
    if (!deletedCount) {
      throw new Error("User Not Deleted")
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest }
  }



}