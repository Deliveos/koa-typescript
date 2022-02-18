import Router from 'koa-router';

import usersRoute from './users.route';
import eventsRoute from './events.route';
import ordersRoute from './orders.route';
import ananlyticsRoute from './companies-pie.route';
import companiesRoute from './deliveryCompanies.route';
import registerRoute from './register.route';
import loginRoute from './login.route';
import periodsRoute from './periods.route';

const router = new Router();

router.use(registerRoute.routes());
router.use(loginRoute.routes());
router.use(eventsRoute.routes());
router.use(ordersRoute.routes());
router.use(usersRoute.routes());
router.use(ananlyticsRoute.routes());
router.use(companiesRoute.routes());
router.use(periodsRoute.routes());

export default router;