import {Context, Next} from 'koa';
import jwt, { Secret } from 'jsonwebtoken';
import { client } from '../config/db.config';
import { User } from '../models/user.model';
import { logger } from '../utils/logger';

const adminOnly = async (ctx: Context, next: Next) => {
  if(ctx.header.authorization !== undefined) {
    const jwtString =  jwt.verify(ctx.header.authorization.split(" ")[1], process.env.SECRET_KEY as Secret) as string;
    logger.log('info', jwtString);
    console.log(jwtString);
    const decodedToken = JSON.parse(jwtString);
    const database = client.db("Q-Delivery");
    const users = database.collection<User>("users");
    const user = await users.findOne({ _id: decodedToken.Id, Name: decodedToken.Name })
    if (user !== null && user.Role.toLowerCase() === "admin") {
      next();
    } else {
      ctx.status = 403;
    }
  } else ctx.status = 401;
};

export { adminOnly };