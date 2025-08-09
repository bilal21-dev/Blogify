// import React, { useEffect, useState } from 'react';
// import { Button, message, Upload, Modal, Collapse } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { FaRegEdit } from "react-icons/fa";
// import { useProfileSettings } from '../ProfileSettingsContext';
// import axios from 'axios';

// const ProfileHeader = () => {
//     const [modalText, setModalText] = useState('Content of the modal');
//     const [confirmLoading, setConfirmLoading] = useState(false);
//     const [open, setOpen] = useState(false);

//     const {
//         email,
//         tempEmail,
//         setTempEmail,
//         getEmail,
//         updateEmail,
//         bio,
//         updateBio,
//         fetchBio,
//         tempBio,
//         setTempBio,
//         profilePic,
//         setProfilePic,
//         password,
//         newPassword,
//         updatePass,
//         setPassword, setNewPassword,
//     } = useProfileSettings();

//     let user = JSON.parse(localStorage.getItem("user"));
//     let user2 = user.name.charAt(0).toUpperCase() + user.name.slice(1);

//     const showModal = () => {
//         setOpen(true);
//     };

//     const handleOk = () => {
//         setModalText('The modal will be closed after two seconds');
//         setConfirmLoading(true);
//         setTimeout(() => {
//             setOpen(false);
//             setConfirmLoading(false);
//         }, 1000);
//     };

//     const handleCancel = () => {
//         console.log('Clicked cancel button');
//         setOpen(false);
//     };

//     useEffect(() => {
//         getEmail();
//         fetchBio();
//         fetchUserProfile();
//     }, []);

//     const handleFileUpload = async (file) => {
//         const formData = new FormData();
//         formData.append('profilePic', file);

//         try {
//             console.log("uploading...");
//             const response = await axios.post(
//                 `http://localhost:5000/upload-profile-pic/${user._id}`,
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );

//             if (response.data.filePath) {
//                 const newProfilePic = `http://localhost:5000/${response.data.filePath}`;
//                 setProfilePic(newProfilePic);
//                 localStorage.setItem('profilePic', newProfilePic);
//                 message.success('Profile picture uploaded successfully.');
//             } else {
//                 message.error('Failed to upload profile picture.');
//             }
//         } catch (error) {
//             console.error('Upload error:', error);
//             message.error('An error occurred while uploading.');
//         }

//         return false; // Prevent automatic upload
//     };

//     const uploadProps = {
//         beforeUpload: handleFileUpload,
//         onRemove: () => {
//             setProfilePic('');
//             localStorage.removeItem('profilePic')
//             message.info('Profile picture removed.');
//         },
//     };

//     const fetchUserProfile = async () => {
//         try {
//             // Check if the profile picture is already in local storage
//             const storedProfilePic = localStorage.getItem('profilePic');
//             if (storedProfilePic) {
//                 setProfilePic(storedProfilePic);
//             } else {
//                 // Fetch user data from backend if not in local storage
//                 const response = await axios.get(`http://localhost:5000/profile-pic/${user._id}`);
//                 if (response.data.user) {
//                     const { profilePic } = response.data.user;


//                     const profilePicUrl = `http://localhost:5000/${profilePic}`;
//                     setProfilePic(profilePicUrl);

//                     // Save profile picture in local storage
//                     localStorage.setItem('profilePic', profilePicUrl);
//                 } else {
//                     message.error('Failed to fetch user details.');
//                 }
//             }
//         } catch (error) {
//             console.error('Error fetching profile:', error);
//             message.error('An error occurred while fetching user details.');
//         }
//     };

//     const items = [
//         {
//             key: '1',
//             label: (
//                 <span className="hover:text-blue-950 font-bold">
//                     Change Email Address
//                 </span>
//             ),
//             children: (
//                 <div className="flex gap-2">
//                     <input
//                         type="email"
//                         value={tempEmail} // Use tempEmail here
//                         placeholder="Enter your email"
//                         className="w-full px-4 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                         onChange={(e) => setTempEmail(e.target.value)} // Update tempEmail only
//                     />
//                     <button
//                         className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//                         onClick={updateEmail} // Update the actual email when clicked
//                     >
//                         Update
//                     </button>
//                 </div>
//             ),
//         },
//         {
//             key: '2',
//             label: (
//                 <span className="hover:text-blue-950 font-bold">
//                     Change Password
//                 </span>
//             ),
//             children: (
//                 <div className="flex gap-2">
//                     <input
//                         type='password'
//                         id="message"
//                         rows="5"
//                         className="w-full px-4 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                         placeholder="Enter your Old Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <input
//                         type='password'
//                         id="message"
//                         rows="5"
//                         className="w-full px-4 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                         placeholder="Enter your New Password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                     />
//                     <button
//                         className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//                         onClick={updatePass}
//                     >
//                         Update
//                     </button>
//                 </div>
//             )
//         },
//         {
//             key: '3',
//             label: (
//                 <span className="hover:text-blue-950 font-bold">
//                     Change Bio
//                 </span>
//             ),
//             children: (
//                 <div className="flex gap-2">
//                     <input
//                         id="message"
//                         rows="5"
//                         className="w-full px-4 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                         placeholder="Enter your Bio"
//                         value={tempBio}
//                         onChange={(e) => setTempBio(e.target.value)}
//                     />
//                     <button
//                         className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//                         onClick={updateBio}
//                     >
//                         Update
//                     </button>
//                 </div>
//             ),
//         },
//         {
//             key: '4',
//             label: (
//                 <span className="hover:text-blue-950 font-bold">
//                     Change Profile Picture
//                 </span>
//             ),
//             children: (
//                 <Upload {...uploadProps}>
//                     <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                 </Upload>
//             ),
//         },
//     ];

//     return (
//         <div className="flex items-center justify-s mb-4 gap-10 py-4 px-8 relative ">
//             <div className="profile-pic">
//                 <img
//                     src={profilePic || 'default-image-url.png'} // Display a default image if none is set
//                     alt="Profile"
//                     className="rounded-full h-[160px] w-[160px]"
//                 />
//             </div>
//             <div className="flex flex-col relative gap-6">
//                 <p className="text-4xl font-bold text-blue-950">{user2}</p>
//                 <p className="absolute top-9 text-gray-400 text-sm">{email}</p>
//                 <p>{bio}</p>
//             </div>
//             <div className="absolute top-2 right-2 text-blue-950">
//                 <Button
//                     type="primary"
//                     onClick={showModal}
//                     style={{ color: 'blue', backgroundColor: 'white', boxShadow: 'none' }}
//                 >
//                     <FaRegEdit className="text-xl" />
//                 </Button>
//                 <Modal
//                     open={open}
//                     onOk={handleOk}
//                     confirmLoading={confirmLoading}
//                     onCancel={handleCancel}
//                 >
//                     <h1 className="modal-heading">Update Details</h1>
//                     <Collapse items={items} />
//                 </Modal>
//             </div>
//         </div>
//     );
// };

// export default ProfileHeader;


import React, { useEffect, useState } from 'react';
import { Button, message, Upload, Modal, Collapse } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FaRegEdit, FaCamera, FaUser, FaEnvelope, FaLock, FaFileAlt } from "react-icons/fa";
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
            const defaultProfilePic = 'https://static.vecteezy.com/system/resources/previews/020/911/746/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';
            
            if (storedProfilePic && storedProfilePic.trim() !== '' && storedProfilePic !== defaultProfilePic) {
                setProfilePic(storedProfilePic);
            } else {
                // Fetch user data from backend if not in local storage
                const response = await axios.get(`http://localhost:5000/profile-pic/${user._id}`);
                if (response.data.user && response.data.user.profilePic && response.data.user.profilePic.trim() !== '') {
                    const { profilePic } = response.data.user;

                    const profilePicUrl = `http://localhost:5000/${profilePic}`;
                    setProfilePic(profilePicUrl);

                    // Save profile picture in local storage
                    localStorage.setItem('profilePic', profilePicUrl);
                } else {
                    // No profile picture found, use the default placeholder
                    setProfilePic(defaultProfilePic);
                    localStorage.setItem('profilePic', defaultProfilePic);
                }
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            // Set default profile picture on error
            const defaultProfilePic = 'https://static.vecteezy.com/system/resources/previews/020/911/746/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';
            setProfilePic(defaultProfilePic);
            localStorage.setItem('profilePic', defaultProfilePic);
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                    <FaEnvelope className="text-blue-500" />
                    <span className="font-semibold">Change Email Address</span>
                </div>
            ),
            children: (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Email Address</label>
                            <input
                                type="email"
                                value={tempEmail}
                                placeholder="Enter your new email"
                                className="w-full px-4 py-3 rounded-xl border border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                                onChange={(e) => setTempEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                                onClick={updateEmail}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors duration-300">
                    <FaLock className="text-purple-500" />
                    <span className="font-semibold">Change Password</span>
                </div>
            ),
            children: (
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <input
                                type='password'
                                className="w-full px-4 py-3 rounded-xl border border-purple-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                                placeholder="Enter your current password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input
                                type='password'
                                className="w-full px-4 py-3 rounded-xl border border-purple-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                                onClick={updatePass}
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: '3',
            label: (
                <div className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors duration-300">
                    <FaFileAlt className="text-green-500" />
                    <span className="font-semibold">Change Bio</span>
                </div>
            ),
            children: (
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                            <textarea
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border border-green-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                                placeholder="Tell us about yourself..."
                                value={tempBio}
                                onChange={(e) => setTempBio(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                                onClick={updateBio}
                            >
                                Update Bio
                            </button>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors duration-300">
                    <FaCamera className="text-orange-500" />
                    <span className="font-semibold">Change Profile Picture</span>
                </div>
            ),
            children: (
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="relative">
                                <img
                                    src={profilePic || 'https://static.vecteezy.com/system/resources/previews/020/911/746/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png'}
                                    alt="Current Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                    onError={(e) => {
                                        e.target.src = 'https://static.vecteezy.com/system/resources/previews/020/911/746/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <FaCamera className="text-white text-xl" />
                                </div>
                            </div>
                        </div>
                        <Upload {...uploadProps}>
                            <Button 
                                icon={<UploadOutlined />}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none hover:from-orange-600 hover:to-orange-700 h-12 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                Choose New Picture
                            </Button>
                        </Upload>
                        <p className="text-sm text-gray-600">Upload a new profile picture (Max 5MB)</p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="relative">
            {/* Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-600 to-purple-700"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Content */}
            <div className="relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                            {/* Profile Picture Section */}
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-3xl overflow-hidden ring-4 ring-white/30 shadow-2xl group-hover:ring-white/50 transition-all duration-300">
                                    <img
                                        src={profilePic || 'https://static.vecteezy.com/system/resources/previews/020/911/746/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png'}
                                        alt="Profile"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = 'https://static.vecteezy.com/system/resources/previews/020/911/746/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                                </div>
                                
                                {/* Online Status */}
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                    <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center lg:text-left space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-white">
                                        {user2}
                                    </h1>
                                    <div className="flex items-center justify-center lg:justify-start gap-2 text-white/80">
                                        <FaEnvelope className="text-lg" />
                                        <span className="text-lg">{email}</span>
                                    </div>
                                </div>
                                
                                {/* Bio Section */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="flex items-start gap-3">
                                        <FaUser className="text-white/60 mt-1" />
                                        <div>
                                            <h3 className="text-white font-semibold mb-2">About</h3>
                                            <p className="text-white/80 leading-relaxed">
                                                {bio || "Welcome to my profile! I'm passionate about sharing stories and connecting with amazing people through the power of words."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Row */}
                               
                            </div>

                            {/* Edit Button */}
                            <div className="lg:self-start">
                                <button
                                    onClick={showModal}
                                    className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    <div className="flex items-center gap-3">
                                        <FaRegEdit className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                                        <span>Edit Profile</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Modal */}
            <Modal
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
                className="premium-modal"
                width={800}
                centered
            >
                <div className="p-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ✨ Update Your Profile
                        </h2>
                        <p className="text-gray-600 mt-2">Customize your profile to make it uniquely yours</p>
                    </div>
                    
                    <Collapse 
                        items={items} 
                        className="premium-collapse"
                        ghost
                        expandIconPosition="end"
                    />
                </div>
            </Modal>

            {/* Custom Styles */}
            <style jsx global>{`
                .premium-modal .ant-modal-content {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95)) !important;
                    backdrop-filter: blur(20px) !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    border-radius: 24px !important;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
                }
                
                .premium-modal .ant-modal-header {
                    background: transparent !important;
                    border-bottom: none !important;
                    padding: 0 !important;
                }
                
                .premium-modal .ant-modal-body {
                    padding: 0 !important;
                }
                
                .premium-collapse .ant-collapse-item {
                    margin-bottom: 16px !important;
                    background: rgba(255, 255, 255, 0.7) !important;
                    backdrop-filter: blur(10px) !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                    border-radius: 16px !important;
                    overflow: hidden !important;
                }
                
                .premium-collapse .ant-collapse-header {
                    padding: 20px 24px !important;
                    background: transparent !important;
                    border-radius: 16px !important;
                    font-weight: 600 !important;
                }
                
                .premium-collapse .ant-collapse-content-box {
                    padding: 0 !important;
                }
                
                .premium-collapse .ant-collapse-item:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
                    transition: all 0.3s ease !important;
                }
                
                .ant-upload-btn {
                    width: 100% !important;
                }
            `}</style>
        </div>
    );
};

export default ProfileHeader;