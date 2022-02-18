import Router from 'koa-router';
import { PeriodsController } from '../controllers/periods.contreller';

const router = new Router();

router.prefix('/periods');

// Get
router.get('/', PeriodsController.getAll);

export default router;