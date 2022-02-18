import Router from 'koa-router';
import { CompaniesController } from '../controllers/deliveryCompanies.controller';

const router = new Router();

router.prefix('/companies');

// Get
router.get('/', CompaniesController.getAll);
router.get('/:id', CompaniesController.getOne);

// Insert
router.post('/', CompaniesController.insertOne);

// Update
router.patch('/:id', CompaniesController.updateOne);

// Delete
router.delete('/:id', CompaniesController.deleteOne);

export default router;