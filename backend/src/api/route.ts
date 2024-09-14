import { Router } from 'express';

const router = Router();

router.get('/health', (_req, res) => {
  res.send({
    data: 'The server is working perfectly.',
  });
});

export default router;
