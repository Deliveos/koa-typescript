import Router from 'koa-router';

import usersRoute from './users.route';
import eventsRoute from './events.route';

const router = new Router();

router.use(eventsRoute.routes());
router.use(usersRoute.routes());

export default router;