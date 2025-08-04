import React, { useEffect, useState } from 'react';
import { Button, message, Upload, Modal, Collapse } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FaRegEdit } from "react-icons/fa";
import { useProfileSettings } from '../ProfileSettingsContext';
import axios from 'axios';

const ProfileHeader = () => {
    const [modalText, setModalText] = useState('Content of the modal');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const {
        email,
        tempEmail,
        setTempEmail,
        getEmail,
        updateEmail,
        bio,
        updateBio,
        fetchBio,
        tempBio,
        setTempBio,
        profilePic,
        setProfilePic,
        password,
        newPassword,
        updatePass,
        setPassword, setNewPassword,
    } = useProfileSettings();

    let user = JSON.parse(localStorage.getItem("user"));
    let user2 = user.name.charAt(0).toUpperCase() + user.name.slice(1);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    useEffect(() => {
        getEmail();
        fetchBio();
        fetchUserProfile();
    }, []);

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('profilePic', file);

        try {
            console.log("uploading...");
            const response = await axios.post(
                `http://localhost:5000/upload-profile-pic/${user._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.filePath) {
                const newProfilePic = `http://localhost:5000/${response.data.filePath}`;
                setProfilePic(newProfilePic);
                localStorage.setItem('profilePic', newProfilePic);
                message.success('Profile picture uploaded successfully.');
            } else {
                message.error('Failed to upload profile picture.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            message.error('An error occurred while uploading.');
        }

        return false; // Prevent automatic upload
    };

    const uploadProps = {
        beforeUpload: handleFileUpload,
        onRemove: () => {
            setProfilePic('');
            localStorage.removeItem('profilePic')
            message.info('Profile picture removed.');
        },
    };

    const fetchUserProfile = async () => {
        try {
            // Check if the profile picture is already in local storage
            const storedProfilePic = localStorage.getItem('profilePic');
            if (storedProfilePic) {
                setProfilePic(storedProfilePic);
            } else {
                // Fetch user data from backend if not in local storage
                const response = await axios.get(`http://localhost:5000/profile-pic/${user._id}`);
                if (response.data.user) {
                    const { profilePic } = response.data.user;


                    const profilePicUrl = `http://localhost:5000/${profilePic}`;
                    setProfilePic(profilePicUrl);

                    // Save profile picture in local storage
                    localStorage.setItem('profilePic', profilePicUrl);
                } else {
                    message.error('Failed to fetch user details.');
                }
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            message.error('An error occurred while fetching user details.');
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <span className="hover:text-blue-950 font-bold">
                    Change Email Address
                </span>
            ),
            children: (
                <div className="flex gap-2">
                    <input
                        type="email"
                        value={tempEmail} // Use tempEmail here
                        placeholder="Enter your email"
                        className="w-full px-4 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        onChange={(e) => setTempEmail(e.target.value)} // Update tempEmail only
                    />
                    <button
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                        onClick={updateEmail} // Update the actual email when clicked
                    >
                        Update
                    </button>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span className="hover:text-blue-950 font-bold">
                    Change Password
                </span>
            ),
            children: (
                <div className="flex gap-2">
                    <input
                        type='password'
                        id="message"
                        rows="5"
                        className="w-full px-4 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your Old Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type='password'
                        id="message"
                        rows="5"
                        className="w-full px-4 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                        onClick={updatePass}
                    >
                        Update
                    </button>
                </div>
            )
        },
        {
            key: '3',
            label: (
                <span className="hover:text-blue-950 font-bold">
                    Change Bio
                </span>
            ),
            children: (
                <div className="flex gap-2">
                    <input
                        id="message"
                        rows="5"
                        className="w-full px-4 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your Bio"
                        value={tempBio}
                        onChange={(e) => setTempBio(e.target.value)}
                    />
                    <button
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                        onClick={updateBio}
                    >
                        Update
                    </button>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <span className="hover:text-blue-950 font-bold">
                    Change Profile Picture
                </span>
            ),
            children: (
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            ),
        },
    ];

    return (
        <div className="flex items-center justify-s mb-4 gap-10 py-4 px-8 relative ">
            <div className="profile-pic">
                <img
                    src={profilePic || 'default-image-url.png'} // Display a default image if none is set
                    alt="Profile"
                    className="rounded-full h-[160px] w-[160px]"
                />
            </div>
            <div className="flex flex-col relative gap-6">
                <p className="text-4xl font-bold text-blue-950">{user2}</p>
                <p className="absolute top-9 text-gray-400 text-sm">{email}</p>
                <p>{bio}</p>
            </div>
            <div className="absolute top-2 right-2 text-blue-950">
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{ color: 'blue', backgroundColor: 'white', boxShadow: 'none' }}
                >
                    <FaRegEdit className="text-xl" />
                </Button>
                <Modal
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <h1 className="modal-heading">Update Details</h1>
                    <Collapse items={items} />
                </Modal>
            </div>
        </div>
    );
};

export default ProfileHeader;
