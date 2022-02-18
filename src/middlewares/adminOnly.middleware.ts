import {Context, Next} from 'koa';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { client } from '../config/db.config';
import { User } from '../models/user.model';
import { logger } from '../utils/logger';

const adminOnly = async (ctx: Context, next: Next) => {
  if(ctx.header.authorization !== undefined) {
    try {
      const token = jwt.verify(ctx.header.authorization, process.env.SECRET_KEY as Secret) as JwtPayload;
      console.log(token.Id, token.Name);
      const decodedToken = JSON.parse(jwt.decode(ctx.header.authorization) as string);
      logger.log('info', decodedToken);
      const database = client.db("Q-Delivery");
      const users = database.collection<User>("users");
      const user = await users.findOne({ _id: decodedToken.Id, Name: decodedToken.Name })
      if (user !== null && user.Role.toLowerCase() === "admin") {
        next();
      } else {
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