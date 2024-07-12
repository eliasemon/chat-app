import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send({
    data: 'Here is your data from demo 2',
  });
});

router.post('/', (_req, res) => {
  res.send({
    data: 'demo created!',
  });
});

export default router