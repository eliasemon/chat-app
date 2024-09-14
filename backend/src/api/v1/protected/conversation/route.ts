import { Router } from 'express';
import {
  createConversation,
  findConversatios,
  leaveGroupConversation,
} from './controller';

const router = Router();

router.get('/', findConversatios);
router.post('/', createConversation);
router.post('/leave', leaveGroupConversation);

export default router;
