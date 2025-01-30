import React from 'react';
import { FaBook, FaCar, FaMicrophone } from 'react-icons/fa'; // Import icons
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Home() {
  const { currentUser } = useSelector(state => state.user);

  const features = [
    {
      title: 'Apply for Driving License',
      description: 'Start your application for a driving license.',
      icon: <FaCar className="text-4xl text-blue-500" />,
      link: '/licensepage',
    },
    {
      title: 'Written Exam',
      description: 'Prepare and apply for the written driving exam.',
      icon: <FaBook className="text-4xl text-green-500" />,
      link: '/written-exam',
    },
    {
      title: 'Viva Exam',
      description: 'Get ready for your viva driving test.',
      icon: <FaMicrophone className="text-4xl text-red-500" />,
      link: '/viva-exam',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen px-4">
      <Header />

      {/* Main Content */}
      <div className="container mx-auto py-8">
        {/* User Info Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-center text-black mb-4">
            User Dashboard
          </h1>
          <p className="text-lg text-center text-red-600">
            Welcome to Chalao, {currentUser?.username || 'User'}
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              to={feature.link}
              key={index}
              className="group bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
