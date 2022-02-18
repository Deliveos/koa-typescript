import Router from 'koa-router';

import usersRoute from './users.route';
import eventsRoute from './events.route';
import ordersRoute from './orders.route';

const router = new Router();

router.use(usersRoute.routes());
router.use(eventsRoute.routes());
router.use(ordersRoute.routes());

export default router;