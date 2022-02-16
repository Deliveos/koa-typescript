import {Context, Next} from 'koa';
import users from '../data/users';

export default (ctx: Context, next: Next) => {
  // for (let i = 0; i < users.length; i++) {
  //   if(users[i].id == ctx.params.id) {
  //     next();
  //     break;
  //   } else {
  //     ctx.body = {
  //       msg: 'User does not exist'
  //     };
  //     ctx.status = 404;
  //   }
  // }
};