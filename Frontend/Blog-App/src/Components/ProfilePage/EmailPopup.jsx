import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';

const EmailPopup = ({ setEmailPopup }) => {
    const [email, setEmail] = useState('');
    const params = useParams();

  const getEmail = async () => {
    try {
      const resut = await axios.get(`http://localhost:5000/update/${params.id}`);
      if (resut) {
        setEmail(resut.data.email);
      } else {
        alert('Unable to fetch data');
      }
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  const updateEmail = async (e) => {
    try {
      const response = await axios.put(`http://localhost:5000/update/${params.id}`, { email });
      if (response.data) {
        alert('Email updated successfully!');
      } else {
        alert('Failed to update email.');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      alert('Error updating email.');
    }
  };
  const animation = {
    animation: 'scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
      {/* Popup Content */}
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto sm:w-96 relative" style={animation}>
        {/* Close Button */}
        <button className="absolute top-2 right-4 text-gray-500 hover:text-gray-700" onClick={() => setEmailPopup(false)}>
          <MdCancel size={24} />
        </button>

        {/* Heading */}
        <h1 className="text-lg font-bold text-black text-center">Change Email</h1>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-2">
            Enter new Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-center">
          <button
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            onClick={updateEmail}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
