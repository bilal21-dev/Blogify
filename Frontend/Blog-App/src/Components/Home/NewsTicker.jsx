// import React, { useEffect, useState } from 'react';
// import { fetchTopHeadlines } from './Event.jsx';

// const NewsTicker = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadNews = async () => {
//       try {
//         const data = await fetchTopHeadlines('us', 'technology'); // Example: US Technology news
//         setArticles(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error loading news:', error);
//         setLoading(false);
//       }
//     };

//     loadNews();
//   }, []);

//   // Check if articles are loaded, if not show a placeholder
//   if (loading && articles.length === 0) return <div>Loading...</div>;

//   const newsItems = articles.length > 0 ? articles : [];

//   return (
//     <div className="news-ticker-container backdrop-blur-lg text-white">
//     <div className="news-ticker flex items-center space-x-6 animate-scroll">
//       {/* Duplicate the items for seamless scrolling */}
//       {newsItems.concat(newsItems).map((article, index) => (
//         <div
//           key={index}
//           className="news-item flex items-center space-x-4 p-2 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 max-w-xs"
//         >
//           <img
//             src={article.urlToImage || 'https://via.placeholder.com/100'}
//             alt={article.title}
//             className="w-16 h-16 object-cover rounded-md"
//           />
//           <div className="news-text flex flex-col">
//             <p className="news-title text-lg font-semibold text-white truncate">{article.title}</p>
//             <p className="news-description text-sm text-gray-300 truncate">
//               {article.description || 'No description available'}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>  
//   );
// };

// export default NewsTicker;

import React, { useEffect, useState } from 'react';
import { fetchTopHeadlines } from './Event.jsx';
const NewsTicker = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchTopHeadlines('us', 'technology');
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading news:', error);
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading && articles.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-600 rounded-lg">
        <div className="animate-pulse flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <span className="ml-2 text-purple-600">Loading latest news...</span>
        </div>
      </div>
    );
  }

  const newsItems = articles.length > 0 ? articles : [];

  return (
    <div className="news-ticker-container">
      <div className="news-ticker">
        {newsItems.concat(newsItems).map((article, index) => (
          <div key={index} className="news-item group">
            <div className="news-image-container">
              <img
                src={article.urlToImage || 'https://via.placeholder.com/80/1e293b/64748b?text=NEWS'}
                alt={article.title}
                className="news-image"
              />
              <div className="image-overlay"></div>
            </div>
            <div className="news-content">
              <div className="news-badge">BREAKING</div>
              <h3 className="news-title">{article.title}</h3>
              <p className="news-description">
                {article.description || 'Stay updated with the latest developments'}
              </p>
            </div>
            {/* <div className="news-arrow">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div> */}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .news-ticker-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 20px 0;
        }

        .news-ticker {
          display: flex;
          align-items: center;
          animation: scroll 60s linear infinite;
          gap: 32px;
        }

        .news-item {
          display: flex;
          align-items: center;
          background: linear-gradient(145deg, #e0e7ff, #c7d2fe, #ddd6fe, #e9d5ff);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 20px;
          padding: 16px 20px;
          min-width: 450px;
          max-width: 450px;
          box-shadow: 
            0 10px 25px rgba(139, 92, 246, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .news-item:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 20px 40px rgba(139, 92, 246, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .news-image-container {
          position: relative;
          margin-right: 16px;
          border-radius: 12px;
          overflow: hidden;
        }

        .news-image {
          width: 72px;
          height: 72px;
          object-fit: cover;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }

        .group:hover .news-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 12px;
        }

        .group:hover .image-overlay {
          opacity: 1;
        }

        .news-content {
          flex: 1;
          min-width: 0;
        }

        .news-badge {
          display: inline-block;
          background: linear-gradient(90deg, #ef4444, #dc2626);
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 12px;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          animation: pulse 2s infinite;
        }

        .news-title {
          color: #4c1d95;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-description {
          color: #6366f1;
          font-size: 13px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-arrow {
          color: #7c3aed;
          margin-left: 12px;
          transition: all 0.3s ease;
        }

        .group:hover .news-arrow {
          color: #3b82f6;
          transform: translateX(2px);
        }

        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @media (max-width: 768px) {
          .news-ticker {
            animation-duration: 40s;
            gap: 20px;
          }

          .news-item {
            min-width: 320px;
            max-width: 320px;
            padding: 12px 16px;
          }

          .news-image {
            width: 56px;
            height: 56px;
          }

          .news-title {
            font-size: 14px;
          }

          .news-description {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .news-ticker {
            animation-duration: 30s;
          }

          .news-item {
            min-width: 280px;
            max-width: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
