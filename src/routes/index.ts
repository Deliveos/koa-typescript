import Router from 'koa-router';

import usersRoute from './users.route';

const router = new Router();

router.use(usersRoute.routes());

export default router;