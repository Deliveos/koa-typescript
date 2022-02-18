import Router from 'koa-router';

import usersRoute from './users.route';
import eventsRoute from './events.route';

const router = new Router();

router.use(usersRoute.routes());
router.use(eventsRoute.routes());

export default router;