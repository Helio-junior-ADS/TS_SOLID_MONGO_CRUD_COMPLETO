import express from 'express';
import { config } from 'dotenv';
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/Mongo-get-users";
import { MongoClient } from './database/mongo';
import { CreateUserController } from './controllers/create-user/create-user';
import { MongoCreateUserRespository } from './repositories/create-user/mongo-create-user';
import { MongoUpdateUserRepository } from './repositories/update-user/mongo-update-user';
import { UpdateUserController } from './controllers/update-user/update-user';

const main  = async () => {
  config();
  const app = express();
  app.use(express.json());

  await MongoClient.connect();
  
  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersControlle = new GetUsersController(mongoGetUsersRepository);
  
    const {body, statusCode} = await getUsersControlle.handle();
    res.status(statusCode).send(body);
  });

  app.post('/users', async( req ,res ) => {
    const mongoCreateUserRepository = new MongoCreateUserRespository();
    const createUserControler = new CreateUserController(mongoCreateUserRepository);

    const { body, statusCode } = await createUserControler.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  app.patch('/users/:id',async (req,res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(mongoUpdateUserRepository);

    const {body, statusCode} = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  })
  
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
   console.log(`SERVER ONLINE NO PATH http://localhost:${PORT}`);
  }); 
}

main()