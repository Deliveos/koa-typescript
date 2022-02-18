import Router from 'koa-router';
import { HomeController } from '../controllers/home.controller';

const router = new Router();

router.prefix('/orders');

// Get
router.get('/', HomeController.getAll);

export default router;