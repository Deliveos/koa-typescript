import Router from 'koa-router';
import { HomeController } from '../controllers/companies-pie.controller';

const router = new Router();

router.prefix('/companies-pie');

// Get
router.get('/', HomeController.getAll);

export default router;