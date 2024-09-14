import { Router } from 'express';
import { signIn, signOut, signup } from './controller';

const router = Router();

router.post('/signup', signup);

router.post('/signin', signIn);

router.post('/signout', signOut);

export default router;
