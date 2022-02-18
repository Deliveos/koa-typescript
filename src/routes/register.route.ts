import { Context } from 'koa';
import Router from 'koa-router';
import { client } from '../config/db.config';
import jwt, { Secret } from 'jsonwebtoken';
import { Client } from '../models/client.model';

const router = new Router();

const database = client.db("Q-Delivery");
const clients = database.collection<Client>("clients");

router.prefix('/register');

router.post('/', async (ctx: Context) => {
  const { Name, Role, Password } = ctx.request.body;
  const date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(0,0,0);

  const result = await clients.insertOne({
    "Name": Name as string,
    "Password": Password as string,
    "Date": date.toISOString()
  });
  if (result.insertedId !== null && result.insertedId !== undefined) {
    ctx.status = 201;
    const token = jwt.sign(
      {
        Name,
        Role
      }, 
      process.env.SECRET_KEY?.toString() as Secret
    );
    ctx.body = { token };
  } else {
    ctx.status = 400;
  }
});

export default router;