import Router from 'koa-router';
import { HomeController } from '../controllers/analytics.controller';

const router = new Router();

router.prefix('/analytics');

// Get
router.get('/', HomeController.getAll);

export default router;