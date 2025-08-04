import React, { useEffect, useState } from 'react';
import { fetchTopHeadlines } from './Event.jsx';

const NewsTicker = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchTopHeadlines('us', 'technology'); // Example: US Technology news
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading news:', error);
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Check if articles are loaded, if not show a placeholder
  if (loading && articles.length === 0) return <div>Loading...</div>;

  const newsItems = articles.length > 0 ? articles : [];

  return (
    <div className="news-ticker-container backdrop-blur-lg text-white">
    <div className="news-ticker flex items-center space-x-6 animate-scroll">
      {/* Duplicate the items for seamless scrolling */}
      {newsItems.concat(newsItems).map((article, index) => (
        <div
          key={index}
          className="news-item flex items-center space-x-4 p-2 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 max-w-xs"
        >
          <img
            src={article.urlToImage || 'https://via.placeholder.com/100'}
            alt={article.title}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="news-text flex flex-col">
            <p className="news-title text-lg font-semibold text-white truncate">{article.title}</p>
            <p className="news-description text-sm text-gray-300 truncate">
              {article.description || 'No description available'}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>  
  );
};

export default NewsTicker;
