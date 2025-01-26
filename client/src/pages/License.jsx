import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function LicenseInfo() {
  const navigate = useNavigate();

  const handleAgree = () => {
    navigate("/register");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Prerequisites of Driving License with Learner Application
          </h1>
          <div className="text-gray-700 space-y-4">
            <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base">
              <li>
                Medical Certificate from a registered Doctor (Maximum size 600 KB). To download the Medical Certificate form,{" "}
                <a
                  href="#"
                  className="text-blue-500 underline"
                >
                  Click Here
                </a>.
              </li>
              <li>Scanned copy of National ID (Maximum size 600 KB).</li>
              <li>
                Scanned copy of Utility Bill (Maximum size 600 KB) [If the present
                address is not the same as the National ID address, attach the
                present address's Utility Bill].
              </li>
              <li>
                Scanned copy of Educational Certificate (Maximum size 600 KB) [Minimum class 8 pass].
              </li>
              <li>A user can apply for only one driving license.</li>
              <li>
                The driving license application will be under the purview of the
                concerned BRTA circle office based on the thana mentioned in the
                current address of the user.
              </li>
              <li>
                The applicant must fill in the correct information in both Bengali
                and English in the online application.
              </li>
              <li>
                Legal action will be taken against applicants who provide false
                information while submitting their smart driving license
                application.
              </li>
            </ol>
          </div>
          <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
            <button
              onClick={handleAgree}
              className="bg-green-500 text-white px-6 py-2 rounded-lg flex items-center justify-center text-sm sm:text-base w-full sm:w-auto"
            >
              <span className="mr-2">✔</span>I Agree
            </button>
            <a
              href="https://bsp.brta.gov.bd/v/DL/learner-DL-Confirmation?lan=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm sm:text-base"
            >
              Register via BRTA Service Portal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
