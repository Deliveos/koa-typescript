import Router from 'koa-router';
import { EventsController } from '../controllers/events.controller';

const router = new Router();

router.prefix('/events');

// Get
router.get('/', EventsController.getAll);
router.get('/:id', EventsController.getOne);

// Insert
router.post('/', EventsController.insertOne);

// Update
router.patch('/:id', EventsController.updateOne);

// Delete
router.delete('/:id', EventsController.deleteOne);
export default router;