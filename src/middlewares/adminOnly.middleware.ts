import {Context, Next} from 'koa';
import jwt, { Secret } from 'jsonwebtoken';
import { client } from '../config/db.config';
import { User } from '../models/user.model';
import { logger } from '../utils/logger';

const adminOnly = async (ctx: Context, next: Next) => {
  if(ctx.header.authorization !== undefined) {
    logger.log('info', ctx.header.authorization);
    try {
      jwt.verify(ctx.header.authorization, process.env.SECRET_KEY as Secret) as string;
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
    
  } else ctx.status = 401;
};

export { adminOnly };