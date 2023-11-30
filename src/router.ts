import { Router } from "express";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/Mongo-get-users";


const router = Router();

router.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersControlle = new GetUsersController(mongoGetUsersRepository);

  const {body, statusCode} = await getUsersControlle.handle();
  res.send(body).status(statusCode);
});

export { router };