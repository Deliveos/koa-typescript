import Router from 'koa-router';
import { CompaniesPieController } from '../controllers/companies-pie.controller';

const router = new Router();

router.prefix('/companies-pie');

// Get
router.get('/', CompaniesPieController.getAll);

export default router;