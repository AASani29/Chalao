import express from 'express';
import multer from 'multer';
import {
  createLicense,
  getAllLicenses,
  getLicenseById,
  deleteLicense,
} from '../controllers/license.controller.js';

const router = express.Router();

// File upload configuration
const upload = multer({ dest: 'uploads/' });

// Routes
router.post(
  '/',
  upload.fields([
    { name: 'medicalCertificate', maxCount: 1 },
    { name: 'educationalCertificate', maxCount: 1 },
    { name: 'nationalId', maxCount: 1 },
    { name: 'utilityBill', maxCount: 1 },
  ]),
  createLicense
);

router.get('/', getAllLicenses);
router.get('/:id', getLicenseById);
router.delete('/:id', deleteLicense);

export default router;
