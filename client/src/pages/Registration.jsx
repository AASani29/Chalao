import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import Header from "../components/Header";

export default function Registration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nationalId: "",
    dob: "",
    nameEnglish: "",
    nameBangla: "",
    fatherNameBangla: "",
    motherNameBangla: "",
    licenseLanguage: "ENGLISH",
    licenseType: "NON-PROFESSIONAL",
    vehicleClass: ["MOTORCYCLE", "LIGHT"],
    applicationType: "LEARNER WITH SMART DRIVING LICENSE",
    applicantType: "GENERAL PERSON",
    applicantBasicInfo: {},
    addressInfo: {},
    attachments: {}, // Holds file inputs
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, key) => {
    setFormData({
      ...formData,
      attachments: { ...formData.attachments, [key]: e.target.files[0] },
    });
  };

  const submitForm = async () => {
    const apiUrl = "http://localhost:3000/api/licenses"; // Replace with your backend URL
    const formDataToSubmit = new FormData();

    // Append text fields
    Object.keys(formData).forEach((key) => {
      if (key !== "attachments") {
        if (typeof formData[key] === "object" && !Array.isArray(formData[key])) {
          // If the field is an object (e.g., applicantBasicInfo or addressInfo), stringify it
          formDataToSubmit.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      }
    });

    // Append file fields
    Object.keys(formData.attachments).forEach((key) => {
      if (formData.attachments[key]) {
        formDataToSubmit.append(key, formData.attachments[key]);
      }
    });

    try {
      const response = await axios.post(apiUrl, formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully:", response.data);
       setIsSubmitted(true); 
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl mx-auto p-6">
          {isSubmitted ? (
            // Success Popup
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-600 mb-4">
                Form Submitted Successfully!
              </h1>
              <p className="text-lg text-gray-700">
                Thank you for submitting your application. We will process it shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)} // Reset for testing or future form submissions
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          ) : (
            <>
          <h1 className="text-2xl font-bold text-center mb-4 break-words">
            Driving License Registration
          </h1>

          {/* Progress Bar */}
          <div className="flex flex-wrap justify-between items-center mb-8">
            {[
              "NID Info",
              "Driving License Info",
              "Applicant Basic Info",
              "Address & Contact Info",
              "Attachment Info",
            ].map((title, index) => (
              <div key={index} className="flex-1 mx-2">
                <div
                  className={`h-2 ${
                    step >= index + 1 ? "bg-blue-500" : "bg-gray-300"
                  } rounded`}
                ></div>
                <p
                  className={`text-center mt-2 text-sm ${
                    step === index + 1
                      ? "font-semibold text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {title}
                </p>
              </div>
            ))}
          </div>

          {/* Step 1: NID Info */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">NID Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  placeholder="National Identity No"
                  className="border rounded-lg p-2"
                />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  name="nameEnglish"
                  value={formData.nameEnglish}
                  onChange={handleChange}
                  placeholder="Name (English)"
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  name="nameBangla"
                  value={formData.nameBangla}
                  onChange={handleChange}
                  placeholder="Name (Bangla)"
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  name="fatherNameBangla"
                  value={formData.fatherNameBangla}
                  onChange={handleChange}
                  placeholder="Father's Name (Bangla)"
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  name="motherNameBangla"
                  value={formData.motherNameBangla}
                  onChange={handleChange}
                  placeholder="Mother's Name (Bangla)"
                  className="border rounded-lg p-2"
                />
              </div>
            </div>
          )}

          {/* Step 2: Driving License Info */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Driving License Info</h2>
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="licenseLanguage"
                  value={formData.licenseLanguage}
                  onChange={handleChange}
                  className="border rounded-lg p-2"
                >
                  <option value="ENGLISH">English</option>
                  <option value="BANGLA">Bangla</option>
                </select>
                <select
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleChange}
                  className="border rounded-lg p-2"
                >
                  <option value="NON-PROFESSIONAL">Non-Professional</option>
                  <option value="PROFESSIONAL">Professional</option>
                </select>
                <div>
                  <label className="block mb-2 font-semibold">Vehicle Class</label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="MOTORCYCLE"
                      checked={formData.vehicleClass.includes("MOTORCYCLE")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleClass: e.target.checked
                            ? [...formData.vehicleClass, e.target.value]
                            : formData.vehicleClass.filter((v) => v !== e.target.value),
                        })
                      }
                      className="mr-2"
                    />
                    Motorcycle
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="LIGHT"
                      checked={formData.vehicleClass.includes("LIGHT")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleClass: e.target.checked
                            ? [...formData.vehicleClass, e.target.value]
                            : formData.vehicleClass.filter((v) => v !== e.target.value),
                        })
                      }
                      className="mr-2"
                    />
                    Light
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Applicant Basic Info */}
{step === 3 && (
  <div>
    <h2 className="text-lg font-semibold mb-4">Applicant Basic Info</h2>
    <div className="grid grid-cols-2 gap-4">
      {/* English Fields */}
      <input
        type="text"
        name="nameEnglish"
        value={formData.nameEnglish}
        onChange={handleChange}
        placeholder="Name (English)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="nameBangla"
        value={formData.nameBangla}
        onChange={handleChange}
        placeholder="Name (Bangla)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="fatherNameEnglish"
        value={formData.fatherNameEnglish}
        onChange={handleChange}
        placeholder="Father's Name (English)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="fatherNameBangla"
        value={formData.fatherNameBangla}
        onChange={handleChange}
        placeholder="Father's Name (Bangla)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="motherNameEnglish"
        value={formData.motherNameEnglish}
        onChange={handleChange}
        placeholder="Mother's Name (English)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="motherNameBangla"
        value={formData.motherNameBangla}
        onChange={handleChange}
        placeholder="Mother's Name (Bangla)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="spouseNameEnglish"
        value={formData.spouseNameEnglish}
        onChange={handleChange}
        placeholder="Spouse Name (English)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="spouseContactNo"
        value={formData.spouseContactNo}
        onChange={handleChange}
        placeholder="Spouse Contact No"
        className="border rounded-lg p-2"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
      <select
        name="bloodGroup"
        value={formData.bloodGroup}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
      </select>
      <input
        type="text"
        name="occupation"
        value={formData.occupation}
        onChange={handleChange}
        placeholder="Occupation"
        className="border rounded-lg p-2"
      />
      <select
        name="educationalQualification"
        value={formData.educationalQualification}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">Select Qualification</option>
        <option value="SSC/EQUIVALENT">SSC/Equivalent</option>
        <option value="HSC/EQUIVALENT">HSC/Equivalent</option>
        <option value="BACHELORS">Bachelors</option>
        <option value="MASTERS">Masters</option>
      </select>
      <select
        name="maritalStatus"
        value={formData.maritalStatus}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">Select Marital Status</option>
        <option value="SINGLE">Single</option>
        <option value="MARRIED">Married</option>
      </select>
      <div className="flex items-center space-x-4">
        <label className="font-semibold">Other Citizenship:</label>
        <label className="flex items-center">
          <input
            type="radio"
            name="otherCitizenship"
            value="NO"
            checked={formData.otherCitizenship === "NO"}
            onChange={handleChange}
            className="mr-2"
          />
          No
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="otherCitizenship"
            value="YES"
            checked={formData.otherCitizenship === "YES"}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </label>
      </div>
    </div>
  </div>
)}
{/* Step 4: Address & Contact Info */}
{step === 4 && (
  <div>
    <h2 className="text-lg font-semibold mb-4">Address & Contact Info</h2>
    <div className="grid grid-cols-2 gap-4">
      {/* Applicant Contact Details */}
      <input
        type="text"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        placeholder="Mobile No"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="phoneNumberOffice"
        value={formData.phoneNumberOffice}
        onChange={handleChange}
        placeholder="Phone Number (Office)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="phoneNumberResidence"
        value={formData.phoneNumberResidence}
        onChange={handleChange}
        placeholder="Phone Number (Residence)"
        className="border rounded-lg p-2"
      />

      {/* Emergency Contact Details */}
      <h3 className="col-span-2 font-semibold">Emergency Contact Person's Details</h3>
      <input
        type="text"
        name="emergencyContactName"
        value={formData.emergencyContactName}
        onChange={handleChange}
        placeholder="Name"
        className="border rounded-lg p-2"
      />
      <select
        name="emergencyContactRelation"
        value={formData.emergencyContactRelation}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">Relationship</option>
        <option value="Parent">Parent</option>
        <option value="Sibling">Sibling</option>
        <option value="Spouse">Spouse</option>
        <option value="Friend">Friend</option>
        <option value="Other">Other</option>
      </select>

      {/* Permanent Address */}
      <h3 className="col-span-2 font-semibold">Permanent Address</h3>
      <input
        type="text"
        name="holdingNoBangla"
        value={formData.holdingNoBangla}
        onChange={handleChange}
        placeholder="Holding No/Village/House (Bangla)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="holdingNoEnglish"
        value={formData.holdingNoEnglish}
        onChange={handleChange}
        placeholder="Holding No/Village/House (English)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="roadBlockBangla"
        value={formData.roadBlockBangla}
        onChange={handleChange}
        placeholder="Road/Block/Sector/Colony (Bangla)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="roadBlockEnglish"
        value={formData.roadBlockEnglish}
        onChange={handleChange}
        placeholder="Road/Block/Sector/Colony (English)"
        className="border rounded-lg p-2"
      />
      <select
        name="division"
        value={formData.division}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">Division</option>
        <option value="Dhaka">Dhaka</option>
        <option value="Chittagong">Chittagong</option>
        <option value="Sylhet">Sylhet</option>
        <option value="Khulna">Khulna</option>
        <option value="Rajshahi">Rajshahi</option>
        <option value="Barisal">Barisal</option>
        <option value="Rangpur">Rangpur</option>
        <option value="Mymensingh">Mymensingh</option>
      </select>
      <select
        name="district"
        value={formData.district}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">District</option>
        {/* Add district options here */}
      </select>
      <select
        name="thana"
        value={formData.thana}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">Thana</option>
        {/* Add thana options here */}
      </select>
      <input
        type="text"
        name="postCode"
        value={formData.postCode}
        onChange={handleChange}
        placeholder="Post Code"
        className="border rounded-lg p-2"
      />

      {/* Present Address */}
      <h3 className="col-span-2 font-semibold">Present Address</h3>
      <div className="col-span-2 flex items-center space-x-4">
        <span>Is Your Present Address OK?</span>
        <label className="flex items-center">
          <input
            type="radio"
            name="presentAddressOk"
            value="YES"
            checked={formData.presentAddressOk === "YES"}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="presentAddressOk"
            value="NO"
            checked={formData.presentAddressOk === "NO"}
            onChange={handleChange}
            className="mr-2"
          />
          No
        </label>
      </div>

      {/* Present Address Fields */}
      <input
        type="text"
        name="presentHoldingNoBangla"
        value={formData.presentHoldingNoBangla}
        onChange={handleChange}
        placeholder="Holding No/Village/House (Bangla)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="presentHoldingNoEnglish"
        value={formData.presentHoldingNoEnglish}
        onChange={handleChange}
        placeholder="Holding No/Village/House (English)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="presentRoadBlockBangla"
        value={formData.presentRoadBlockBangla}
        onChange={handleChange}
        placeholder="Road/Block/Sector/Colony (Bangla)"
        className="border rounded-lg p-2"
      />
      <input
        type="text"
        name="presentRoadBlockEnglish"
        value={formData.presentRoadBlockEnglish}
        onChange={handleChange}
        placeholder="Road/Block/Sector/Colony (English)"
        className="border rounded-lg p-2"
      />
      <select
        name="presentDivision"
        value={formData.presentDivision}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">Division</option>
        {/* Add division options */}
      </select>
      <select
        name="presentDistrict"
        value={formData.presentDistrict}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">District</option>
        {/* Add district options */}
      </select>
      <select
        name="presentThana"
        value={formData.presentThana}
        onChange={handleChange}
        className="border rounded-lg p-2"
      >
        <option value="">Thana</option>
        {/* Add thana options */}
      </select>
      <input
        type="text"
        name="presentPostCode"
        value={formData.presentPostCode}
        onChange={handleChange}
        placeholder="Post Code"
        className="border rounded-lg p-2"
      />

      {/* Circle Office & Venue */}
      <input
        type="text"
        name="circleOffice"
        value={formData.circleOffice}
        onChange={handleChange}
        placeholder="Circle Office"
        className="border rounded-lg p-2 col-span-2"
      />
    </div>
  </div>
)}

          {/* Step 5: Attachments */}
{step === 5 && (
  <div>
    <h2 className="text-lg font-semibold mb-4">Attachment Info</h2>
    <div className="grid grid-cols-1 gap-4">
      {/* Medical Certificate */}
      <label>
        Attach Medical Certificate:
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "medicalCertificate")}
          className="block mt-2 border p-2 rounded"
        />
      </label>

      {/* Educational Certificate */}
      <label>
        Attach Educational Certificate:
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "educationalCertificate")}
          className="block mt-2 border p-2 rounded"
        />
      </label>

      {/* National ID */}
      <label>
        Attach National ID:
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "nationalId")}
          className="block mt-2 border p-2 rounded"
        />
      </label>

      {/* Utility Bill */}
      <label>
        Attach Utility Bill (Gas/Electricity/Wasa):
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "utilityBill")}
          className="block mt-2 border p-2 rounded"
        />
      </label>

      {/* Card Delivery Option */}
      <div>
        <label className="block font-semibold mb-2">Card Delivery Option:</label>
        <select
          name="cardDeliveryOption"
          value={formData.cardDeliveryOption || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="BY POST">By Post</option>
          <option value="BY HAND">By Hand</option>
        </select>
      </div>

      {/* Smart Card Receiving Address */}
      <h3 className="text-md font-semibold mt-4">Smart Card Receiving Address (By Post):</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Address Type (English):</label>
          <select
            name="addressType"
            value={formData.addressType || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Please Select One</option>
            <option value="PERMANENT">Permanent</option>
            <option value="PRESENT">Present</option>
          </select>
        </div>
        <div>
          <label>Village/House (English):</label>
          <input
            type="text"
            name="villageHouse"
            value={formData.villageHouse || ""}
            onChange={handleChange}
            placeholder="Enter village/house"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Division (English):</label>
          <select
            name="division"
            value={formData.division || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Please Select One</option>
            {/* Add options dynamically or statically */}
            <option value="DHAKA">Dhaka</option>
            <option value="CHITTAGONG">Chittagong</option>
          </select>
        </div>
        <div>
          <label>Thana (English):</label>
          <select
            name="thana"
            value={formData.thana || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Please Select One</option>
            {/* Add options dynamically or statically */}
            <option value="UTTARA">Uttara</option>
            <option value="MIRPUR">Mirpur</option>
          </select>
        </div>
        <div>
          <label>District (English):</label>
          <select
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Please Select One</option>
            {/* Add options dynamically or statically */}
            <option value="DHAKA">Dhaka</option>
            <option value="SYLHET">Sylhet</option>
          </select>
        </div>
        <div>
          <label>Post Code (English):</label>
          <input
            type="text"
            name="postCode"
            value={formData.postCode || ""}
            onChange={handleChange}
            placeholder="Enter post code"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Mobile No (English):</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo || ""}
            onChange={handleChange}
            placeholder="Enter mobile number"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Road/Block/Sector/Colony (English):</label>
          <input
            type="text"
            name="roadBlock"
            value={formData.roadBlock || ""}
            onChange={handleChange}
            placeholder="Enter details"
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* Declaration */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          <strong>Declaration:</strong> I hereby declare that the information given in the application form is
          completely correct. If any information is found to be false, I will have no objection if legal action is
          taken by the authorities.
        </p>
      </div>
    </div>
  </div>
)}


          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 flex-wrap">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className={`px-4 py-2 rounded-lg mb-2 ${
                step === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            {step < 5 ? (
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2"
              >
                Next
              </button>
            ) : (
              <button onClick={submitForm} className="bg-green-500 text-white px-4 py-2 rounded-lg mb-2">
                Submit
              </button>
            )}
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
