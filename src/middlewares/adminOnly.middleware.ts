import {Context, Next} from 'koa';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { client } from '../config/db.config';
import { User } from '../models/user.model';
import { logger } from '../utils/logger';
import { ObjectId } from 'mongodb';

const adminOnly = async (ctx: Context, next: Next) => {
  if(ctx.header.authorization !== undefined) {
    try {
      const token = jwt.verify(ctx.header.authorization, process.env.SECRET_KEY as Secret) as JwtPayload;
      const database = client.db("Q-Delivery");
      const users = database.collection<User>("users");
      const user = await users.findOne({ _id: new ObjectId(token.Id), Name: token.Name })
      if (user !== null && user.Role.toLowerCase() === "admin") {
        console.log("NEXT");
        await next();
      } else {
        console.log(403);
        ctx.status = 403;
      }
    } catch (e) {
      logger.log('error', e);
    }
  } else {
    ctx.status = 401;
  }
};

export { adminOnly };