import Router from 'koa-router';
import { DeliveryCompaniesController } from '../controllers/deliveryCompanies.controller';
import { DeliveryCompany } from '../models/deliveryCompany.model';

const router = new Router();

router.prefix('/delivery-companies');

// Get
router.get('/', DeliveryCompaniesController.getAll);
router.get('/:id', DeliveryCompaniesController.getOne);

// Insert
router.post('/', DeliveryCompaniesController.insertOne);

// Update
router.patch('/:id', DeliveryCompaniesController.updateOne);

// Delete
router.delete('/:id', DeliveryCompaniesController.deleteOne);
export default router;