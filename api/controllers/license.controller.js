import License from '../models/license.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new license entry
export const createLicense = async (req, res, next) => {
  try {
    // Handle file uploads
    const attachments = {
      medicalCertificate: req.files?.medicalCertificate?.[0]?.path || '',
      educationalCertificate: req.files?.educationalCertificate?.[0]?.path || '',
      nationalId: req.files?.nationalId?.[0]?.path || '',
      utilityBill: req.files?.utilityBill?.[0]?.path || '',
    };

    // Combine request body with file paths
    const licenseData = { ...req.body, attachments };

    // Create a new document
    const newLicense = new License(licenseData);

    // Save to the database
    await newLicense.save();

    res.status(201).json({ success: true, message: 'Your application for learner license is submitted successfully', data: newLicense });
  } catch (error) {
    next(error); // Handle errors using middleware
  }
};

// Get all license entries
export const getAllLicenses = async (req, res, next) => {
  try {
    const licenses = await License.find();
    res.status(200).json(licenses);
  } catch (error) {
    next(error);
  }
};

// Get a license by ID
export const getLicenseById = async (req, res, next) => {
  try {
    const license = await License.findById(req.params.id);
    if (!license) return next(errorHandler(404, 'License not found'));
    res.status(200).json(license);
  } catch (error) {
    next(error);
  }
};

// Delete a license entry
export const deleteLicense = async (req, res, next) => {
  try {
    const deletedLicense = await License.findByIdAndDelete(req.params.id);
    if (!deletedLicense) return next(errorHandler(404, 'License not found'));
    res.status(200).json({ message: 'License deleted successfully' });
  } catch (error) {
    next(error);
  }
};
