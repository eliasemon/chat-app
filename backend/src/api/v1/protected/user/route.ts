import { Router } from 'express';
import { searchUsers, findUserById, updateUser } from './controller';

const router = Router();

router.get('/', searchUsers);
router.get('/:userId', findUserById);
router.put('/:userId', updateUser);

export default router;
