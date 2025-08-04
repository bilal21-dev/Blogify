import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useAuth } from '../AuthContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaRegHeart, FaRegComment, FaShareSquare, FaSync } from "react-icons/fa";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import EmailPopup from './EmailPopup';
import PassPopup from './PassPopup';
import { Divider } from 'antd';

import ProfileHeader from './ProfileHeader';

const ProfilePage = () => {

    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    user = user.name.charAt(0).toUpperCase() + user.name.slice(1);

    const { myblogs, setMyblogs } = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [flippedCards, setFlippedCards] = useState({});
    const [sharedPosts, setSharedPosts] = useState([]);
    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const fetchMyBlogs = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/profile/${params.id}`);
            const { myBlogs, sharedPosts } = response.data;
            setMyblogs(myBlogs);
            setSharedPosts(sharedPosts);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch blogs. Please try again.");
        }
    };

    const toggleCardFlip = (cardKey) => {
        setFlippedCards(prev => ({
            ...prev,
            [cardKey]: !prev[cardKey]

        }));
        console.log('donee');

    };
    const deleteProduct = async (blog) => {
        try {
            const userId = JSON.parse(localStorage.getItem('user'))._id; // Get userId from localStorage
            const result = await axios.delete(`http://localhost:5000/delete/${blog._id}`, {
                data: { userId }, // Pass userId in the request body
            });
            alert(result.data.message);
            fetchMyBlogs(); // Refresh the blogs after deletion
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to delete blog');
        }
    };

    const animation = {
        animation: 'flip-in-hor-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    }
    return (
        <div className="profile-page">
            <ProfileHeader />
            <Divider orientation="left" plain style={{ color: 'blue', fontSize: '23px', fontWeight: 'bold' }}>
                Your Blogs
            </Divider>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-3 px-4 sm:px-6 md:px-8">
                {myblogs.map((blog, index) => {
                    const cardKey = `myblogs-${index}`;
                    return (
                        <div key={cardKey} className="relative perspective-1000 w-full h-[400px]">
                            <div className={`absolute w-full h-full transition-transform duration-700 transform-style-3d ${flippedCards[cardKey] ? 'rotate-y-180' : ''}`}>
                                {/* Front of Card */}
                                <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md shadow-black overflow-hidden border border-gray-200">
                                    {/* Flip Button */}
                                    <button
                                        onClick={() => toggleCardFlip(cardKey)}
                                        className="absolute top-2 right-0 z-10 p-2 text-gray-600 hover:text-blue-500"
                                    >
                                        <FaSync />
                                    </button>
                                    <button
                                        className="absolute top-1.5 right-6 text-[22px] z-10 p-2 text-gray-600 hover:text-blue-500"
                                        onClick={() => deleteProduct(blog)}
                                    >
                                        <MdDelete />
                                    </button>
                                    <button className='absolute top-1.5 right-12 text-[22px] z-10 p-2 text-gray-600 hover:text-blue-500'>
                                        <CiEdit className='' />
                                    </button>

                                    {/* Caption Section */}
                                    <div className="p-4 sm:p-6 border-b">
                                        <h2 className="text-lg sm:text-xl font-bold text-blue-900">{blog.title}</h2>
                                        <p className="text-sm text-gray-600 mt-2">{blog.description}</p>
                                    </div>

                                    {/* Image Section */}
                                    {blog.image ? (
                                        <img
                                            src={`http://localhost:5000/${blog.image}`}
                                            alt={blog.title}
                                            className="w-full h-48 sm:h-64 object-cover"
                                        />
                                    ) : (
                                        <img
                                            src="https://via.placeholder.com/400x250"
                                            alt="Placeholder"
                                            className="w-full h-48 sm:h-64 object-cover"
                                        />
                                    )}
                                </div>

                                {/* Back of Card */}
                                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-lg shadow-md shadow-black overflow-hidden border border-gray-200">
                                    {/* Flip Back Button */}
                                    <button
                                        onClick={() => toggleCardFlip(cardKey)}
                                        className="absolute top-2 right-2 z-10 p-2 text-gray-600 hover:text-blue-500"
                                    >
                                        <FaSync />
                                    </button>

                                    {/* Full Blog Content */}
                                    <div className="p-4 sm:p-6 h-full overflow-auto">
                                        {blog.content && (
                                            <div className="prose">
                                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Content</h3>
                                                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {sharedPosts.map((blog, index) => {
                    const cardKey = `shared-${index}`;
                    return (
                        <div key={cardKey} className="relative perspective-1000 w-full h-[400px]">
                            <div className={`absolute w-full h-full transition-transform duration-700 transform-style-3d ${flippedCards[cardKey] ? 'rotate-y-180' : ''}`}>
                                {/* Front of Card */}
                                <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md shadow-black overflow-hidden border border-gray-200">
                                    {/* Flip Button */}
                                    <button
                                        onClick={() => toggleCardFlip(cardKey)}
                                        className="absolute top-2 right-0 z-10 p-2 text-gray-600 hover:text-blue-500"
                                    >
                                        <FaSync />
                                    </button>
                                    <button
                                        className="absolute top-1.5 right-6 text-[22px] z-10 p-2 text-gray-600 hover:text-blue-500"
                                        onClick={() => deleteProduct(blog)}
                                    >
                                        <MdDelete />
                                    </button>

                                    {/* Caption Section */}
                                    <p className="ml-2 text-[12px] my-1 text-gray-400 font-light">Posted by {blog.author}</p>
                                    <div className="py-3 px-4 sm:px-6 border-b">
                                        <h2 className="text-lg sm:text-xl font-bold text-blue-900">{blog.title}</h2>
                                        <p className="text-sm text-gray-600 mt-2">{blog.description}</p>
                                    </div>

                                    {/* Image Section */}
                                    {blog.image ? (
                                        <img
                                            src={`http://localhost:5000/${blog.image}`}
                                            alt={blog.title}
                                            className="w-full h-48 sm:h-64 object-cover"
                                        />
                                    ) : (
                                        <img
                                            src="https://via.placeholder.com/400x250"
                                            alt="Placeholder"
                                            className="w-full h-48 sm:h-64 object-cover"
                                        />
                                    )}
                                </div>

                                {/* Back of Card */}
                                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-lg shadow-md shadow-black overflow-hidden border border-gray-200">
                                    {/* Flip Back Button */}
                                    <button
                                        onClick={() => toggleCardFlip(cardKey)}
                                        className="absolute top-2 right-2 z-10 p-2 text-gray-600 hover:text-blue-500"
                                    >
                                        <FaSync />
                                    </button>

                                    {/* Full Blog Content */}
                                    <div className="p-4 sm:p-6 h-full overflow-auto">
                                        {blog.content && (
                                            <div className="prose">
                                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Content</h3>
                                                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default ProfilePage;




































































































































































































