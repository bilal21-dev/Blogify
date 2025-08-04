import axios from 'axios';

const API_KEY = 'a14d6b81f3c848be9101fa33e1a7c837'; // Replace with your News API key
const BASE_URL = 'https://newsapi.org/v2';

export const fetchTopHeadlines = async (country = 'us', category = 'general') => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country,
        category,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const fetchNewsByQuery = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
