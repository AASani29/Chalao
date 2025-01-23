import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-cream min-h-screen px-4" style={{ backgroundColor: "#ffffff" }}>
      <Header />

      {/* Main Content */}
      <div className="container mx-auto py-8">
        {/* User Info Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h1 className="text-2xl font-bold text-center text-black mb-4">User Dashboard</h1>
      <p className="text-lg text-center text-red-600">Welcome to Chalao, {currentUser?.username || "User"}</p>
    </div>
      </div>
    </div>
  );
}
