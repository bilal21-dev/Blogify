
import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useAuth } from '../AuthContext';
import { useLoading } from '../LoadingContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaRegHeart, FaRegComment, FaShareSquare, FaSync } from "react-icons/fa";
import apiClient from '../../utils/apiClient';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import EmailPopup from './EmailPopup';
import PassPopup from './PassPopup';
import { Divider } from 'antd';
import { LoadingButton } from '../LoadingSpinner';
import { showSuccess, showError } from '../../utils/toast';

import ProfileHeader from './ProfileHeader';

const ProfilePage = () => {

    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    user = user.name.charAt(0).toUpperCase() + user.name.slice(1);

    const { myblogs, setMyblogs } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();
    const params = useParams();
    const [flippedCards, setFlippedCards] = useState({});
    const [sharedPosts, setSharedPosts] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState({});
    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const fetchMyBlogs = async () => {
        try {
            const response = await apiClient.get(`/profile/${params.id}`, {
                loadingMessage: "Loading your blogs..."
            });
            const { myBlogs, sharedPosts } = response.data;
            setMyblogs(myBlogs);
            setSharedPosts(sharedPosts);
        } catch (err) {
            showError("Failed to fetch blogs. Please try again.");
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
        setDeleteLoading(prev => ({ ...prev, [blog._id]: true }));
        try {
            const userId = JSON.parse(localStorage.getItem('user'))._id; // Get userId from localStorage
            const result = await apiClient.delete(`/delete/${blog._id}`, {
                data: { userId }, // Pass userId in the request body
                loadingMessage: "Deleting blog..."
            });
            showSuccess("Blog deleted successfully");
            fetchMyBlogs(); // Refresh the blogs after deletion
        } catch (error) {
            showError(error.response?.data?.error || 'Failed to delete blog');
        } finally {
            setDeleteLoading(prev => ({ ...prev, [blog._id]: false }));
        }
    };

    const animation = {
        animation: 'flip-in-hor-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    }
    return (
        <div className="profile-page min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-purple-400">
            <ProfileHeader />
            
            {/* Premium Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-2 h-12 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Your Creative Journey
                            </h2>
                        </div>
                        <p className="text-gray-600 text-lg">Discover your published stories and shared inspirations</p>
                    </div>
                </div>
            </div>

            {/* Premium Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {myblogs.map((blog, index) => {
                        const cardKey = `myblogs-${index}`;
                        return (
                            <div key={cardKey} className="group perspective-1000 w-full h-[380px]">
                                <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${flippedCards[cardKey] ? 'rotate-y-180' : ''}`}>
                                    {/* Front of Card */}
                                    <div className="absolute w-full h-full backface-hidden">
                                        <div className="h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group-hover:shadow-blue-500/25">
                                            {/* Action Buttons */}
                                            <div className="absolute top-4 right-4 z-20 flex gap-2">
                                                <button
                                                    onClick={() => toggleCardFlip(cardKey)}
                                                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/30"
                                                >
                                                    <FaSync className="text-blue-600" />
                                                </button>
                                                <LoadingButton
                                                    loading={deleteLoading[blog._id]}
                                                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/30"
                                                    onClick={() => deleteProduct(blog)}
                                                    loadingText=""
                                                >
                                                    <MdDelete className="text-red-500" />
                                                </LoadingButton>
                                                <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-green-50 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/30">
                                                    <CiEdit className="text-green-600" />
                                                </button>
                                            </div>

                                            {/* Author Badge */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                                    Your Post
                                                </div>
                                            </div>

                                            {/* Image Section */}
                                            <div className="relative h-56 overflow-hidden">
                                                {blog.image ? (
                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                        <div className="text-6xl text-blue-300">📝</div>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 space-y-4">
                                                <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-gray-600 line-clamp-3 leading-relaxed">
                                                    {blog.description}
                                                </p>
                                                
                                                {/* Engagement Bar */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    {/* <div className="flex gap-4">
                                                        <div className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                                                            <FaRegHeart />
                                                            <span className="text-sm">0</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">
                                                            <FaRegComment />
                                                            <span className="text-sm">0</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-500 hover:text-green-500 transition-colors cursor-pointer">
                                                        <FaShareSquare />
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back of Card */}
                                    <div className="absolute w-full h-full backface-hidden rotate-y-180">
                                        <div className="h-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                                            {/* Flip Back Button */}
                                            <button
                                                onClick={() => toggleCardFlip(cardKey)}
                                                className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/30"
                                            >
                                                <FaSync className="text-blue-600" />
                                            </button>

                                            {/* Full Content */}
                                            <div className="p-6 h-full overflow-auto">
                                                <div className="space-y-4">
                                                    <div className="border-l-4 border-blue-500 pl-4">
                                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                                                        <p className="text-gray-600 italic">{blog.description}</p>
                                                    </div>
                                                    
                                                    {blog.content && (
                                                        <div className="prose prose-blue max-w-none">
                                                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                                                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                                    📖 Full Story
                                                                </h4>
                                                                <div 
                                                                    className="text-gray-700 leading-relaxed"
                                                                    dangerouslySetInnerHTML={{ __html: blog.content }} 
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    
                    {sharedPosts.map((blog, index) => {
                        const cardKey = `shared-${index}`;
                        return (
                            <div key={cardKey} className="group perspective-1000 w-full h-[380px]">
                                <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${flippedCards[cardKey] ? 'rotate-y-180' : ''}`}>
                                    {/* Front of Card */}
                                    <div className="absolute w-full h-full backface-hidden">
                                        <div className="h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group-hover:shadow-purple-500/25">
                                            {/* Action Buttons */}
                                            <div className="absolute top-4 right-4 z-20 flex gap-2">
                                                <button
                                                    onClick={() => toggleCardFlip(cardKey)}
                                                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/30"
                                                >
                                                    <FaSync className="text-blue-600" />
                                                </button>
                                                <LoadingButton
                                                    loading={deleteLoading[blog._id]}
                                                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/30"
                                                    onClick={() => deleteProduct(blog)}
                                                    loadingText=""
                                                >
                                                    <MdDelete className="text-red-500" />
                                                </LoadingButton>
                                            </div>

                                            {/* Shared Badge */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                                {blog.author?.name || 'Unknown Author'}
                                                </div>
                                            </div>

                                            {/* Image Section */}
                                            <div className="relative h-56 overflow-hidden">
                                                {blog.image ? (
                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                                        <div className="text-6xl text-purple-300">🔗</div>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 space-y-4">
                                                <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-gray-600 line-clamp-3 leading-relaxed">
                                                    {blog.description}
                                                </p>
                                                
                                                {/* Engagement Bar */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    {/* <div className="flex gap-4">
                                                        <div className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                                                            <FaRegHeart />
                                                            <span className="text-sm">0</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">
                                                            <FaRegComment />
                                                            <span className="text-sm">0</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-500 hover:text-green-500 transition-colors cursor-pointer">
                                                        <FaShareSquare />
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back of Card */}
                                    <div className="absolute w-full h-full backface-hidden rotate-y-180">
                                        <div className="h-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                                            {/* Flip Back Button */}
                                            <button
                                                onClick={() => toggleCardFlip(cardKey)}
                                                className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/30"
                                            >
                                                <FaSync className="text-blue-600" />
                                            </button>

                                            {/* Full Content */}
                                            <div className="p-6 h-full overflow-auto">
                                                <div className="space-y-4">
                                                    <div className="border-l-4 border-purple-500 pl-4">
                                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                                                        <p className="text-purple-600 font-medium">Shared by {blog.author?.name || 'Unknown Author'}</p>
                                                        <p className="text-gray-600 italic mt-1">{blog.description}</p>
                                                    </div>
                                                    
                                                    {blog.content && (
                                                        <div className="prose prose-purple max-w-none">
                                                            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                                                                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                                    📖 Full Story
                                                                </h4>
                                                                <div 
                                                                    className="text-gray-700 leading-relaxed"
                                                                    dangerouslySetInnerHTML={{ __html: blog.content }} 
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
                
                .backface-hidden {
                    backface-visibility: hidden;
                }
                
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .prose {
                    max-width: none;
                }
                
                .prose h1, .prose h2, .prose h3, .prose h4 {
                    color: #1f2937;
                    font-weight: 600;
                }
                
                .prose p {
                    color: #4b5563;
                    line-height: 1.7;
                }
                
                .prose a {
                    color: #3b82f6;
                    text-decoration: none;
                }
                
                .prose a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default ProfilePage;

































































































































































































