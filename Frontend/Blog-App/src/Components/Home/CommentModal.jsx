import { useState, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaTrash, FaUser } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import { commentAPI } from '../../utils/commentAPI';
import '../../styles/CommentModal.css';

const CommentModal = ({ isOpen, onClose, blog }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        if (isOpen && blog) {
            fetchComments();
        }
    }, [isOpen, blog]);

    const fetchComments = async () => {
        if (!blog?._id) return;
        
        setLoading(true);
        setError('');
        try {
            const response = await commentAPI.getComments(blog._id);
            if (response.success) {
                setComments(response.comments);
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError(err.error || 'Failed to load comments');
        } finally {
            setLoading(false);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        
        if (!register) {
            setError('Please log in to add comments');
            return;
        }

        if (!newComment.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        if (newComment.length > 1000) {
            setError('Comment is too long (max 1000 characters)');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response = await commentAPI.addComment(blog._id, currentUser._id, newComment.trim());

            if (response.success) {
                // Add the new comment to the beginning of the list
                setComments(prevComments => [response.comment, ...prevComments]);
                setNewComment('');
                
                // Update parent component with new comment count if needed
                if (blog.commentCount !== undefined) {
                    blog.commentCount += 1;
                }
            }
        } catch (err) {
            console.error('Error adding comment:', err);
            setError(err.error || 'Failed to add comment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) {
            return;
        }

        try {
            const response = await commentAPI.deleteComment(commentId, currentUser._id);

            if (response.success) {
                // Remove the comment from the list
                setComments(prevComments => 
                    prevComments.filter(comment => comment._id !== commentId)
                );
                
                // Update parent component with new comment count if needed
                if (blog.commentCount !== undefined && blog.commentCount > 0) {
                    blog.commentCount -= 1;
                }
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
            setError(err.error || 'Failed to delete comment');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
        
        return date.toLocaleDateString();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm modal-backdrop"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] mx-4 flex flex-col modal-content">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaUser className="text-blue-600 text-sm" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
                            <p className="text-sm text-gray-600 truncate max-w-xs">
                                {blog?.title}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {/* Comment Form */}
                {register && (
                    <div className="p-6 border-b border-gray-100">
                        <form onSubmit={handleAddComment} className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FaUser className="text-white text-sm" />
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Write a comment..."
                                        className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 comment-textarea"
                                        rows="3"
                                        maxLength="1000"
                                        disabled={submitting}
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-gray-400">
                                            {newComment.length}/1000 characters
                                        </span>
                                        <button
                                            type="submit"
                                            disabled={submitting || !newComment.trim()}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 comment-button"
                                        >
                                            {submitting ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <FaPaperPlane className="text-sm" />
                                            )}
                                            {submitting ? 'Posting...' : 'Post'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-6 comment-scroll">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-500">Loading comments...</p>
                        </div>
                    ) : comments.length > 0 ? (
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <div key={comment._id} className="flex gap-3 group comment-item" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 comment-avatar">
                                        {comment.userId?.profilePic ? (
                                            <img 
                                                src={`http://localhost:5000/${comment.userId.profilePic}`}
                                                alt={comment.userId.name}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <FaUser className="text-white text-sm" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-semibold text-gray-800 text-sm">
                                                            {comment.userId?.name || 'Unknown User'}
                                                        </h4>
                                                        <span className="text-xs text-gray-500">
                                                            {formatDate(comment.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 text-sm leading-relaxed">
                                                        {comment.content}
                                                    </p>
                                                </div>
                                                {register && comment.userId?._id === currentUser._id && (
                                                    <button
                                                        onClick={() => handleDeleteComment(comment._id)}
                                                        className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                                        title="Delete comment"
                                                    >
                                                        <FaTrash className="text-xs" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <FaUser className="text-gray-400 text-xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">No comments yet</h3>
                            <p className="text-gray-500 text-center max-w-sm">
                                {register 
                                    ? "Be the first to share your thoughts on this blog post!"
                                    : "Log in to be the first to comment on this post."
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
