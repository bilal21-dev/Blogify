import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { useParams } from 'react-router-dom';
import { showSuccess, showError } from '../utils/toast';

const ProfileSettingsContext = createContext();

export const useProfileSettings = () => {
    return useContext(ProfileSettingsContext);
};

export const ProfileSettingsProvider = ({ children }) => {
    let user = JSON.parse(localStorage.getItem("user"));
    const initialEmail = user && user.email ? user.email : '';
    const [email, setEmail] = useState(initialEmail); // Current email displayed on profile
    const [tempEmail, setTempEmail] = useState(initialEmail); // Temporary email for editing

    // Listen for user changes in localStorage and update email states
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            const newEmail = updatedUser && updatedUser.email ? updatedUser.email : '';
            setEmail(newEmail);
            setTempEmail(newEmail);
        };

        window.addEventListener('storage', handleStorageChange);

        // Also handle changes within the same tab (e.g., login function updates localStorage)
        const interval = setInterval(() => {
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            const newEmail = updatedUser && updatedUser.email ? updatedUser.email : '';
            if (newEmail !== email) {
                setEmail(newEmail);
                setTempEmail(newEmail);
            }
        }, 500);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [email]);
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
    const getEmail = async () => {
        try {
            const result = await apiClient.get(`/update/${user._id}`);
            if (result) {
                setEmail(result.data.email); // Set displayed email
                setTempEmail(result.data.email); // Initialize temp email with current email
                // Also update localStorage so next mount is instant
                const updatedUser = { ...user, email: result.data.email };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } else {
                showError('Unable to fetch data');
            }
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };
    const updateEmail = async () => {
        try {
            const response = await apiClient.put(`/update/${user._id}`, { email: tempEmail }, {
                loadingMessage: "Updating email..."
            });
            if (response.data) {
                const updatedUser = { ...user, email: tempEmail };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setEmail(tempEmail); // Update displayed email
                showSuccess('Email updated successfully!');
            } else {
                showError('Failed to update email.');
            }
        } catch (error) {
            console.error('Error updating email:', error);
            showError('Error updating email.');
        }
    };

    const updateBio = async (e) => {
        if (user && user._id) {
            try {
                const response = await apiClient.post('/status', {
                    userId: user._id,
                    bio: tempBio, // Use tempBio for the update
                }, {
                    loadingMessage: "Updating bio..."
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
                const response = await apiClient.get(`/status/${user._id}`);
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
            const response = await apiClient.put(`/password/${user._id}`, {
                currentPassword: password,
                newPassword: newPassword,
            }, {
                loadingMessage: "Updating password..."
            });

            if (response.data.success) {
                showSuccess('Password updated successfully!');
            }
        } catch (error) {
            // Handle specific backend error messages
            const errorMessage = error.response?.data?.error ||
                "Password update failed. Check current password and try again.";
            showError(errorMessage);
        }
    };


    return (
        <ProfileSettingsContext.Provider value={{ email, tempEmail, setTempEmail, getEmail, updateEmail, setEmail, bio, updateBio, fetchBio, tempBio, setTempBio, profilePic, setProfilePic, handleImageChange, password, setPassword, newPassword, setNewPassword, updatePass }}>
            {children}
        </ProfileSettingsContext.Provider>
    );
};
