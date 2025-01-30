import mongoose from 'mongoose';

const licenseSchema = new mongoose.Schema(
  {
    nationalId: { type: String, required: true },
    dob: { type: Date, required: true },
    nameEnglish: { type: String, required: true },
    nameBangla: { type: String },
    fatherNameBangla: { type: String },
    motherNameBangla: { type: String },
    licenseLanguage: { type: String, enum: ['ENGLISH', 'BANGLA'], required: true },
    licenseType: { type: String, enum: ['NON-PROFESSIONAL', 'PROFESSIONAL'], required: true },
    vehicleClass: [{ type: String, enum: ['MOTORCYCLE', 'LIGHT', 'HEAVY'] }],
    applicationType: { type: String, required: true },
    applicantType: { type: String, required: true },
    applicantBasicInfo: {
      gender: { type: String, enum: ['MALE', 'FEMALE'] },
      bloodGroup: { type: String },
      occupation: { type: String },
      educationalQualification: { type: String },
      maritalStatus: { type: String },
      otherCitizenship: { type: Boolean },
    },
    addressInfo: {
      permanentAddress: {
        holdingNo: { type: String },
        roadBlock: { type: String },
        division: { type: String },
        district: { type: String },
        thana: { type: String },
        postCode: { type: String },
      },
      presentAddress: {
        holdingNo: { type: String },
        roadBlock: { type: String },
        division: { type: String },
        district: { type: String },
        thana: { type: String },
        postCode: { type: String },
      },
      emergencyContact: {
        name: { type: String },
        relationship: { type: String },
        mobileNumber: { type: String },
      },
    },
    attachments: {
      medicalCertificate: { type: String },
      educationalCertificate: { type: String },
      nationalId: { type: String },
      utilityBill: { type: String },
    },
  },
  { timestamps: true }
);

const License = mongoose.model('License', licenseSchema);

export default License;
