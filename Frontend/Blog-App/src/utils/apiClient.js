import axios from 'axios';

// Create axios instance
const apiClient = axios.create({
  baseURL: 'https://blogverse-backend-vpue.onrender.com', // Updated to match your backend URL
  timeout: 30000, // 30 second timeout
});

// Setup interceptors function that accepts loading context
export const setupAxiosInterceptors = (showLoading, hideLoading) => {
  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      // Show loading for specific endpoints or all requests
      const skipLoading = config.skipLoading || false;
      if (!skipLoading) {
        const loadingMessage = config.loadingMessage || 'Processing request...';
        showLoading(loadingMessage);
      }
      
      // Add auth token if available
      const user = localStorage.getItem('user');
      if (user) {
        const token = JSON.parse(user).token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      return config;
    },
    (error) => {
      hideLoading();
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    (response) => {
      hideLoading();
      return response;
    },
    (error) => {
      hideLoading();
      
      // Handle common error responses
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // Unauthorized - maybe redirect to login
            localStorage.clear();
            window.location.href = '/login';
            break;
          case 403:
            console.error('Access forbidden');
            break;
          case 500:
            console.error('Server error');
            break;
          default:
            console.error('Request failed:', error.response.data.message || error.message);
        }
      } else if (error.request) {
        console.error('Network error - no response received');
      } else {
        console.error('Request setup error:', error.message);
      }
      
      return Promise.reject(error);
    }
  );
};

export default apiClient;
