import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux
    const navigate = useNavigate();

    // Redirect non-admin users to sign-in page
    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Access denied! Admins only.');
            navigate('/signin');
        }
    }, [currentUser, navigate]);

    // Fetch users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/users/admin/users', {
                    withCredentials: true,
                });
                setUsers(res.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch users.');
            }
        };

        fetchUsers();
    }, []);

    // Handle user deletion
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await axios.delete(`/api/users/delete/${id}`, {
                withCredentials: true, // Ensure cookies are sent
            });
            console.log('User deleted:', res.data); // Debug log
            setUsers(users.filter((user) => user._id !== id));
        } catch (err) {
            console.error('Error deleting user:', err); // Debug log
            alert('Failed to delete user.');
        }
    };

    return (
        <div className="min-h-screen bg-cream px-4" style={{ backgroundColor: "#ffffff" }}>
            <Header />
            
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
                
                

                {/* User Management Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">User Management</h2>
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-2 border-b">Username</th>
                                <th className="p-2 border-b">Email</th>
                                <th className="p-2 border-b">Role</th>
                                <th className="p-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    <td className="p-2 border-b">{user.username}</td>
                                    <td className="p-2 border-b">{user.email}</td>
                                    <td className="p-2 border-b">{user.role}</td>
                                    <td className="p-2 border-b">
                                        <button 
                                            className="bg-red-900 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
