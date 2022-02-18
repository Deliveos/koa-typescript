import {Context, Next} from 'koa';

export default (ctx: Context, next: Next) => {
  ctx.set({"access-control-allow-origin": "*"});
  next();
};