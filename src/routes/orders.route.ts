import Router from 'koa-router';
import { OrdersController } from '../controllers/orders.controller';

const router = new Router();

router.prefix('/orders');

// Get
router.get('/', OrdersController.getAll);
router.get('/:id', OrdersController.getOne);

// Insert
router.post('/', OrdersController.insertOne);

// Update
router.patch('/:id', OrdersController.updateOne);

// Delete
router.delete('/:id', OrdersController.deleteOne);
export default router;