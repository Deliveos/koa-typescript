import {Context, Next} from 'koa';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const selfOnly = async (ctx: Context, next: Next) => {
  if(ctx.header.authorization !== undefined) {
    const token =  jwt.verify(ctx.header.authorization, process.env.SECRET_KEY as Secret) as JwtPayload;
    if (token.Id == ctx.params.id || token.Role.toLowerCase() == 'admin') {
      await next();
    } else {
      ctx.status = 403;
    }
  } else ctx.status = 401;
};

export { selfOnly };