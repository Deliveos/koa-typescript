import {Context, Next} from 'koa';
import jwt, { Secret } from 'jsonwebtoken';

const selfOnly = async (ctx: Context, next: Next) => {
  if(ctx.header.authorization !== undefined) {
    const jwtString =  jwt.verify(ctx.header.authorization, process.env.SECRET_KEY as Secret) as string;
    const decodedToken = JSON.parse(jwtString);
    if (decodedToken.Id == ctx.params.id) {
      next();
    } else {
      ctx.status = 403;
    }
  } else ctx.status = 401;
};

export { selfOnly };