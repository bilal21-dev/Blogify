import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaRegComment, FaShareSquare, FaSync, FaUser } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import PopUp from "./PopUp";
import CommentModal from "./CommentModal";
import { useAuth } from '../AuthContext';
import { useLoading } from '../LoadingContext';
import apiClient from "../../utils/apiClient";
import { Alert } from 'antd';
import NewsTicker from "./NewsTicker.jsx"
import { InlineLoader, LoadingButton } from "../LoadingSpinner";
import { showSuccess, showError, showWarning } from '../../utils/toast';

const Post = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [commentModal, setCommentModal] = useState({ isOpen: false, blog: null });
  const { register, blogs, setBlogs, setMyblogs } = useAuth()
  const { showLoading, hideLoading } = useLoading();
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  const animation = {
    animation: 'flip-in-hor-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  }

  const handleIconClick = () => {
    if (register) {
      setIsPopUpVisible(true);
    }
    else {
      setShowAlert(true);
    }
  };

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };

  const toggleCardFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLocalLoading(true);
      const response = await apiClient.get("/home", {
        skipLoading: false,
        loadingMessage: "Loading latest posts..."
      });
      setBlogs(response.data);
      // Also save to localStorage to keep it in sync
      localStorage.setItem("blogs", JSON.stringify(response.data));
    } catch (err) {
      setError(err.message || "Failed to fetch blogs");
    } finally {
      setLocalLoading(false);
    }
  }

  const addBlog = (newBlog) => {
    if (newBlog.image) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        const updatedBlog = { ...newBlog, image: base64Image };

        setMyblogs((prevBlogs) => {
          const updatedBlogs = [...prevBlogs, updatedBlog];
          localStorage.setItem("myblogs", JSON.stringify(updatedBlogs));
          return updatedBlogs;
        });
      };
      reader.readAsDataURL(newBlog.image);
    } else {
      setMyblogs((prevBlogs) => {
        const updatedBlogs = [...prevBlogs, newBlog];
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
        return updatedBlogs;
      });
    }
  };

  // Function to refresh blogs after creating a new one
  const onBlogCreated = async () => {
    try {
      await fetchBlogs(); // Refresh the blogs list
    } catch (error) {
      console.error('Error refreshing blogs:', error);
    }
  };

  if (error) {
    return <p className="flex justify-center align-middle text-center">Error: {error}</p>;
  }

  const handleSharePost = async (postId) => {
    const userId = JSON.parse(localStorage.getItem("user"))._id; // Get logged-in user ID

    setActionLoading(prev => ({ ...prev, [`share_${postId}`]: true }));
    try {
      const response = await apiClient.post(`/profile/${userId}/share`, { postId }, {
        loadingMessage: "Sharing post..."
      });
      showSuccess("Post shared successfully");
    } catch (error) {
      console.error(error);
      showError("Failed to share post");
    } finally {
      setActionLoading(prev => ({ ...prev, [`share_${postId}`]: false }));
    }
  };

  const handleCommentClick = (blog) => {
    if (!register) {
      setShowAlert(true);
      return;
    }
    setCommentModal({ isOpen: true, blog });
  };

  const closeCommentModal = () => {
    setCommentModal({ isOpen: false, blog: null });
  };

  const handleLike = async (postId, index) => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    const updatedBlogs = [...blogs];  // Always use immutability
    const blogToUpdate = updatedBlogs[index];

    // Check if the user already liked the post
    const isLiked = blogToUpdate.likes.includes(userId);

    // Toggle the like status
    if (isLiked) {
      blogToUpdate.likes = blogToUpdate.likes.filter(id => id !== userId);
    } else {
      blogToUpdate.likes.push(userId);
    }

    // Optimistically update the local state
    setBlogs(updatedBlogs);

    setActionLoading(prev => ({ ...prev, [`like_${postId}`]: true }));
    try {
      await apiClient.post(`/like/${postId}`, { userId }, {
        loadingMessage: isLiked ? "Unliking post..." : "Liking post..."
      });

      // Optionally, re-fetch the data from the backend
      // fetchBlogs();
    } catch (err) {
      console.error(err);
      showError("Failed to like/unlike the post. Reverting the change.");
      fetchBlogs();  // Revert to the latest state from the backend
    } finally {
      setActionLoading(prev => ({ ...prev, [`like_${postId}`]: false }));
    }
  };

  return (
    <div className="profile-page min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-purple-400">
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Alert
            message="Authentication Required"
            description="Please register or log in to perform this action."
            type="warning"
            showIcon
            closable
            onClose={() => setShowAlert(false)}
            className="shadow-lg"
          />
        </div>
      )}

      <NewsTicker />

      {/* Premium Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-12 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Discover Amazing Stories
              </h2>
            </div>
            <p className="text-gray-600 text-lg">Explore inspiring content from our community of writers</p>
          </div>
        </div>
      </div>

      {/* Premium Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {localLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            <InlineLoader size="lg" />
            <div className="text-center">
              <p className="text-xl font-semibold text-slate-700 mb-2">Loading amazing content...</p>
              <p className="text-sm text-slate-500">Please wait while we fetch the latest blogs</p>
            </div>
          </div>
        ) : Array.isArray(blogs) && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog, index) => {
              const loggedInUser = JSON.parse(localStorage.getItem("user"));
              const isLiked =
                loggedInUser &&
                Array.isArray(blog.likes) &&
                blog.likes.includes(loggedInUser._id);

              return (
                <div key={index} className="group perspective-1000 w-full h-[420px]" style={animation}>
                  <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${flippedCards[index] ? 'rotate-y-180' : ''}`}>
                    {/* Front of Card */}
                    <div className="absolute w-full h-full backface-hidden">
                      <div className="h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group-hover:shadow-blue-500/25">
                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                          <button
                            onClick={() => toggleCardFlip(index)}
                            className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/30"
                            title="View full content"
                          >
                            <FaSync className="text-blue-600" />
                          </button>
                        </div>

                        {/* Author Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                            <FaUser className="text-xs" />
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
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <div className="text-6xl text-blue-300">📝</div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 sm:p-6 flex flex-col h-44 sm:h-40">
                          <div className="flex-1 space-y-2 sm:space-y-3 overflow-hidden">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                              {blog.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                              {blog.description}
                            </p>
                          </div>

                          {/* Engagement Bar - Always at bottom */}
                          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-auto flex-shrink-0">
                            <div className="flex gap-3 sm:gap-4">
                              <LoadingButton
                                onClick={() => handleLike(blog._id, index)}
                                loading={actionLoading[`like_${blog._id}`]}
                                className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer bg-transparent border-none p-0 h-auto"
                                title={isLiked ? "Unlike post" : "Like post"}
                                loadingText=""
                              >
                                <div className="flex items-center gap-1 sm:gap-2">
                                  {isLiked ? <FaHeart className="text-red-500 text-sm" /> : <FaRegHeart className="text-sm" />}
                                  <span className="text-xs sm:text-sm">{blog.likes.length}</span>
                                </div>
                              </LoadingButton>
                              <button
                                onClick={() => handleCommentClick(blog)}
                                className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer"
                                title="View comments"
                              >
                                <FaRegComment className="text-sm" />
                                <span className="text-xs sm:text-sm">
                                  {blog.commentCount || 0}
                                </span>
                              </button>
                            </div>
                            <LoadingButton
                              loading={actionLoading[`share_${blog._id}`]}
                              className="text-gray-500 hover:text-green-500 transition-colors cursor-pointer bg-transparent border-none p-0 h-auto"
                              onClick={() => handleSharePost(blog._id)}
                              title="Share post"
                              loadingText=""
                            >
                              <FaShareSquare className="text-sm" />
                            </LoadingButton>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180">
                      <div className="h-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                        {/* Flip Back Button */}
                        <button
                          onClick={() => toggleCardFlip(index)}
                          className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/30"
                          title="Back to preview"
                        >
                          <FaSync className="text-blue-600" />
                        </button>

                        {/* Full Content */}
                        <div className="p-6 h-full overflow-auto">
                          <div className="space-y-4">
                            <div className="border-l-4 border-blue-500 pl-4">
                              <h3 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                              <p className="text-blue-600 font-medium">By {blog.author?.name || 'Unknown Author'}</p>
                              <p className="text-gray-600 italic mt-1">{blog.description}</p>
                            </div>

                            {blog.content ? (
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
                            ) : (
                              <div className="flex items-center justify-center h-full text-center">
                                <div>
                                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaRegComment className="text-gray-400 text-2xl" />
                                  </div>
                                  <p className="text-gray-500 font-medium">No additional content available</p>
                                  <p className="text-gray-400 text-sm mt-1">Check back later for updates</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <FaRegComment className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Blogs Available</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Be the first to share your thoughts! Click the create button to write your first blog post.
            </p>
            <button
              onClick={handleIconClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <IoCreate className="text-lg" />
              Create Your First Post
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleIconClick}
          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
        >
          <IoCreate className="text-3xl transition-transform duration-300 group-hover:rotate-12" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">+</span>
          </div>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Create New Post
          </div>
        </button>
      </div>

      {/* Conditionally Render the PopUp */}
      {isPopUpVisible && <PopUp closePopUp={handleClosePopUp} addBlog={addBlog} onBlogCreated={onBlogCreated} />}

      {/* Comment Modal */}
      <CommentModal
        isOpen={commentModal.isOpen}
        onClose={closeCommentModal}
        blog={commentModal.blog}
      />

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
}

export default Post;

