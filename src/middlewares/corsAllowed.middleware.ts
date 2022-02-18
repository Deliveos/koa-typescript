import {Context, Next} from 'koa';

export default (ctx: Context, next: Next) => {
  ctx.header = { "access-control-allow-origin": "*"};
  next();
};