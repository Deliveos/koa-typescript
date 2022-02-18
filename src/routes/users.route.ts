import Router from 'koa-router';
import { UserController } from '../controllers/users.controller';

const router = new Router();

router.prefix('/users');

// Get
router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);

// Update
router.patch('/:id', UserController.updateOne);

// Delete
router.delete('/:id', UserController.deleteOne);
export default router;