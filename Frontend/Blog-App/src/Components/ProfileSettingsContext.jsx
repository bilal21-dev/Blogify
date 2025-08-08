import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileSettingsContext = createContext();

export const useProfileSettings = () => {
    return useContext(ProfileSettingsContext);
};

export const ProfileSettingsProvider = ({ children }) => {
    const [email, setEmail] = useState(''); // Current email displayed on profile
    const [tempEmail, setTempEmail] = useState(''); // Temporary email for editing
    const [tempBio, setTempBio] = useState("");
    const [bio, setBio] = useState("");
    const defaultProfilePic = 'https://static.vecteezy.com/system/resources/previews/020/911/746/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';
    const storedProfilePic = localStorage.getItem("profilePic");
    const [profilePic, setProfilePic] = useState(
        (storedProfilePic && storedProfilePic.trim() !== '') ? storedProfilePic : defaultProfilePic
    );
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const params = useParams();
    let user = JSON.parse(localStorage.getItem("user"));
    const getEmail = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/update/${user._id}`);
            if (result) {
                setEmail(result.data.email); // Set displayed email
                setTempEmail(result.data.email); // Initialize temp email with current email
            } else {
                alert('Unable to fetch data');
            }
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };
    const updateEmail = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/update/${user._id}`, { email: tempEmail });
            if (response.data) {
                const updatedUser = { ...user, email: tempEmail };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setEmail(tempEmail); // Update displayed email
                alert('Email updated successfully!');
            } else {
                alert('Failed to update email.');
            }
        } catch (error) {
            console.error('Error updating email:', error);
            alert('Error updating email.');
        }
    };

    const updateBio = async (e) => {
        if (user && user._id) {
            try {
                const response = await axios.post('http://localhost:5000/status', {
                    userId: user._id,
                    bio: tempBio, // Use tempBio for the update
                });
                if (response.data) {
                    const updatedUser = { ...user, status: tempBio };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setBio(tempBio); // Commit the changes to the actual bio state
                }
                console.log('Bio updated successfully:', response.data);

            } catch (error) {
                console.error('Error updating bio:', error.response?.data || error.message);
            }
        } else {
            console.error('User data is not found in localStorage or does not contain _id');
        }
    };
    const fetchBio = async () => {
        if (user && user._id) {
            try {
                const response = await axios.get(`http://localhost:5000/status/${user._id}`);
                const fetchedBio = response.data.bio || "";
                setBio(fetchedBio); // Set the actual bio
                setTempBio(fetchedBio); // Set the editable bio
            } catch (error) {
                console.error('Error fetching bio:', error.response?.data || error.message);
            }
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePic(e.target.result);
                localStorage.setItem("profilePic", newProfilePic);
            };
            reader.readAsDataURL(file);
        }
    };
    const updatePass = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/password/${user._id}`, {
                currentPassword: password,
                newPassword: newPassword,
            });

            if (response.data.success) {
                alert('Password updated successfully!');
            }
        } catch (error) {
            // Handle specific backend error messages
            const errorMessage = error.response?.data?.error ||
                "Password update failed. Check current password and try again.";
            alert(errorMessage);
        }
    };


    return (
        <ProfileSettingsContext.Provider value={{ email, tempEmail, setTempEmail, getEmail, updateEmail, setEmail, bio, updateBio, fetchBio, tempBio, setTempBio, profilePic, setProfilePic, handleImageChange, password, setPassword, newPassword, setNewPassword, updatePass }}>
            {children}
        </ProfileSettingsContext.Provider>
    );
};
