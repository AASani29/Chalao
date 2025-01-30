import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const LicenseManagement = () => {
    const [licenses, setLicenses] = useState([]);

    useEffect(() => {
        const fetchLicenses = async () => {
            try {
                const res = await axios.get('/api/licenses');
                setLicenses(res.data);
            } catch (err) {
                alert('Failed to fetch licenses.');
            }
        };
        fetchLicenses();
    }, []);

    const handleDownload = (license) => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text(`License Details`, 20, 20);
        doc.text(`Name (English): ${license.nameEnglish || 'N/A'}`, 20, 30);
        doc.text(`Name (Bangla): ${license.nameBangla || 'N/A'}`, 20, 40);
        doc.text(`National ID: ${license.nationalId || 'N/A'}`, 20, 50);
        doc.text(`Date of Birth: ${license.dob ? new Date(license.dob).toLocaleDateString() : 'N/A'}`, 20, 60);
        doc.text(`License Type: ${license.licenseType || 'N/A'}`, 20, 70);
        doc.text(`Vehicle Class: ${license.vehicleClass?.join(", ") || 'N/A'}`, 20, 80);
        doc.text(`Application Type: ${license.applicationType || 'N/A'}`, 20, 90);
        doc.text(`Applicant Type: ${license.applicantType || 'N/A'}`, 20, 100);
        
        const basicInfo = license.applicantBasicInfo || {};
        doc.text(`Gender: ${basicInfo.gender || 'N/A'}`, 20, 110);
        doc.text(`Blood Group: ${basicInfo.bloodGroup || 'N/A'}`, 20, 120);
        doc.text(`Occupation: ${basicInfo.occupation || 'N/A'}`, 20, 130);
        doc.text(`Education: ${basicInfo.educationalQualification || 'N/A'}`, 20, 140);
        
        doc.save(`License_${license.nationalId}.pdf`);
    };

    const handleApprove = (id) => {
        alert(`Approved License: ${id}`);
    };

    const handleReject = (id) => {
        alert(`Rejected License: ${id}`);
    };

    return (
        <div className="min-h-screen bg-cream px-4">
            <Header />
            <div className="container mx-auto py-8 px-4 md:px-16 lg:px-32">
                <h1 className="text-3xl font-bold text-center mb-6">Driving License Management</h1>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-2 border-b">Name</th>
                                <th className="p-2 border-b">National ID</th>
                                <th className="p-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {licenses.map((license) => (
                                <tr key={license._id} className="hover:bg-gray-100">
                                    <td className="p-2 border-b">{license.nameEnglish}</td>
                                    <td className="p-2 border-b">{license.nationalId}</td>
                                    <td className="p-2 border-b space-x-2">
                                        <button className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-600" onClick={() => handleDownload(license)}>
                                            Download PDF
                                        </button>
                                        <button className="bg-green-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-green-600" onClick={() => handleApprove(license._id)}>
                                            Approve
                                        </button>
                                        <button className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600" onClick={() => handleReject(license._id)}>
                                            Reject
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


export default LicenseManagement;
