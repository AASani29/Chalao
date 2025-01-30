import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../components/Header';

const AdminDashboard = () => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Access denied! Admins only.');
            navigate('/signin');
        }
    }, [currentUser, navigate]);

    return (
        <div className="min-h-screen bg-cream px-4" style={{ backgroundColor: "#ffffff" }}>
            <Header />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Management */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h2 className="text-2xl font-bold mb-4">User Management</h2>
                        <Link to="/admin/users" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
                            Manage Users
                        </Link>
                    </div>
                    
                    {/* Driving License Management */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h2 className="text-2xl font-bold mb-4">Driving License Management</h2>
                        <Link to="/admin/licenses" className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600">
                            Manage Licenses
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;