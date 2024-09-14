import multer from 'multer';
import {
  multerGoogleOrFirebaseStorage,
  Storage,
} from 'multer-google-or-firebase-bucket';

// Get the Firebase Storage bucket
const storage = new Storage({
  projectId: process.env.Firebase_Project_Id,
  credentials: {
    type: 'service_account',
    private_key: process.env.Firebase_Private_key,
    client_email: process.env.Firebase_Client_Email,
    client_id: process.env.Client_Id,
    universe_domain: process.env.Universe_Domain,
  },
});

const bucket = storage.bucket(process.env.Firebase_Storage_Bucket || '');
const storageEngin = multerGoogleOrFirebaseStorage({
  bucket,
  destination: (req, file, cb) => {
    cb(null, req.body.dest ? req.body.dest : 'uploads'); // Store files in the 'uploads' folder in Firebase
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname.replace(/ /g, '_')}`); // Customize the file name
  },
});

const upload = multer({
  storage: storageEngin,
  limits: { fileSize: 1000 * 1024 * 1024 }, // 1000 MB limit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileFilter: (_req, file: Express.Multer.File, cb: any) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-matroska',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
}).single('file');

export { upload };
