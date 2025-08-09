import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Comment API functions
export const commentAPI = {
    // Add a new comment
    addComment: async (blogId, userId, content) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/comments`, {
                blogId,
                userId,
                content
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to add comment' };
        }
    },

    // Get comments for a blog
    getComments: async (blogId, page = 1, limit = 20) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/comments/${blogId}`, {
                params: { page, limit }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to fetch comments' };
        }
    },

    // Delete a comment
    deleteComment: async (commentId, userId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/comments/${commentId}`, {
                data: { userId }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to delete comment' };
        }
    }
};

export default commentAPI;
