import Router from 'koa-router';
import { UserController } from '../controllers/users.controller';
import { adminOnly } from '../middlewares/adminOnly.middleware';

const router = new Router();

router.prefix('/users');

// Get
router.get('/', adminOnly, UserController.getAll);
router.get('/:id', UserController.getOne);

// Create
router.patch('/:id', adminOnly, UserController.insertOne);

// Update
router.patch('/:id', adminOnly, UserController.updateOne);

// Delete
router.delete('/:id', UserController.deleteOne);

export default router;