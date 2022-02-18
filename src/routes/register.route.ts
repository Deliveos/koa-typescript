import { Context } from 'koa';
import Router from 'koa-router';
import { client } from '../config/db.config';
import { User } from '../models/user.model';
import jwt, { Secret } from 'jsonwebtoken';

const router = new Router();

const database = client.db("Q-Delivery");
const collection = database.collection<User>("users");

router.prefix('/register');

router.post('/', async (ctx: Context) => {
  const { Name, Role, Password } = ctx.request.body;
  const result = await collection.insertOne({
    "Name": Name as string,
    "Role": Role as string || "User",
    "Password": Password as string
  });
  if (result.acknowledged == true) {
    ctx.status = 201;
    const token = jwt.sign(
      {
        Name,
        Role
      }, 
      process.env.SECRET_KEY?.toString() as Secret
    );
    ctx.body = token;
  }
});

export default router;