import express from 'express';
import { upload } from '@/middlewares/fileUploadMiddleware';
// Adjust the path as necessary

const router = express.Router();

// Middleware to handle Multer and Firebase upload
router.post('/', upload, (req, res) => {
  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file,
  });
});

export default router;
