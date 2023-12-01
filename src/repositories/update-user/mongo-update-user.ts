import { ObjectId } from "mongodb";
import { IUpdateUserRepository, UpdateUserParams } from "../../controllers/update-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    // Atualizar no Mongo
    await MongoClient.db
      .collection('users')
      .updateOne({ _id: new ObjectId(id) }, {
        $set: {
          ...params,
        }
      });
    // Pega o Usuário no Banco;
    const user = await MongoClient.db
      .collection<Omit<User, 'id'>>('users')
      .findOne({ _id: new ObjectId(id) });
    // Validação do usuãrio  
    if (!user) {
      throw new Error("User not updated");
    }

    // tirar o "_id" e converter para "id" para respeitar o Model do User.

    const { _id, ...rest } = user

    return { id: _id.toHexString(), ...rest };
  }

}