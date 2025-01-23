import React from 'react';
import { Link } from "react-router-dom";


const LandingPage = () => {
  

  return (
    <div className="font-sans m-0 p-0 box-border bg-[#f8f1d1]">


      <header className="bg-transparent absolute w-full z-50 py-4 px-5 md:px-12">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/home">
              <img src="/Logo.png" className="w-28 md:w-36" alt="Logo" />
            </Link>
          </div>
          <div>
            <Link
              to="/sign-in"
              className="no-underline text-white text-sm md:text-lg font-bold py-2 px-4 md:px-5 bg-red-600 rounded"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      
    </div>
  );
};

export default LandingPage;
