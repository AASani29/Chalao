import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';


 const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/users/admin/users', { withCredentials: true });
                setUsers(res.data);
            } catch (err) {
                alert('Failed to fetch users.');
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await axios.delete(`/api/users/delete/${id}`, { withCredentials: true });
            setUsers(users.filter(user => user._id !== id));
        } catch (err) {
            alert('Failed to delete user.');
        }
    };

    return (
        <div className="min-h-screen bg-cream px-4">
            <Header/>
            <div className="container mx-auto py-8 px-4 md:px-16 lg:px-32">
                <h1 className="text-3xl font-bold text-center mb-6">User Management</h1>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
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
                                        <button className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600" onClick={() => handleDelete(user._id)}>
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

export default UserManagement;