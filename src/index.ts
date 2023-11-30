import express from 'express';
import { config } from 'dotenv';
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/Mongo-get-users";
import { MongoClient } from './database/mongo';

const main  = async () => {
  config();
  const app = express();
  await MongoClient.connect();
  
  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersControlle = new GetUsersController(mongoGetUsersRepository);
  
    const {body, statusCode} = await getUsersControlle.handle();
    res.send(body).status(statusCode);
  });
  
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
   console.log(`SERVER ONLINE NO PATH http://localhost:${PORT}`);
  }); 
}

main()