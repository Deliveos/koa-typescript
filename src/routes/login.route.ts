import { Context } from 'koa';
import Router from 'koa-router';
import { client } from '../config/db.config';
import { User } from '../models/user.model';
import jwt, { Secret } from 'jsonwebtoken';

const router = new Router();

const database = client.db("Q-Delivery");
const clients = database.collection<User>("clients");
const users = database.collection<User>("users");

router.prefix('/login');

router.post('/', async (ctx: Context) => {
  const { Name, Password } = ctx.request.body;
  const client = await clients.findOne({ Name, Password });
  const user = await users.findOne({ Name, Password });
  if (client !== null) {
    ctx.status = 200;
    const token = jwt.sign(
      {
        "Id": client._id,
        Name,
      }, 
      process.env.SECRET_KEY?.toString() as Secret
    );
    ctx.body = { token };
  } else if (user !== null) {
    ctx.status = 200;
    const token = jwt.sign(
      {
        "Id": user._id,
        Name,
        "Role": user.Role
      }, 
      process.env.SECRET_KEY?.toString() as Secret
    );
    ctx.body = { token };
  } else {
    ctx.status = 404;
  }
});

export default router;