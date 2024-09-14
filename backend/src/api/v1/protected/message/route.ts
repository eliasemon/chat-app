import { Router } from 'express';
import { findMessages } from './controller';

const router = Router();

router.get('/', findMessages);

export default router;
