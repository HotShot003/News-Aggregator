import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = '2dc470f354b04f61805a32777ff604b6';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedNews, setSelectedNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(selectedCategory, currentPage);
  }, [selectedCategory, currentPage]);

  const fetchData = async (category, page) => {
    const pageSize = 6; // Number of news cards per page
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setSelectedNews(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / pageSize));
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSelectedNews([]);
      setTotalPages(1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderNewsCards = (news) => {
    if (!news || news.length === 0) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover rounded-md mb-2" />
              )}
              <h2 className="text-lg font-bold mb-2">{article.title}</h2>
              <p className="text-gray-700 text-sm">{article.description}</p>
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Navigation Bar */}
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <button
              className={`p-2 border border-gray-300 rounded ${selectedCategory === 'general' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              onClick={() => {
                setSelectedCategory('general');
                setCurrentPage(1);
              }}
            >
              General
            </button>
          </li>
          <li>
            <button
              className={`p-2 border border-gray-300 rounded ${selectedCategory === 'business' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              onClick={() => {
                setSelectedCategory('business');
                setCurrentPage(1);
              }}
            >
              Business
            </button>
          </li>
          <li>
            <button
              className={`p-2 border border-gray-300 rounded ${selectedCategory === 'sports' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              onClick={() => {
                setSelectedCategory('sports');
                setCurrentPage(1);
              }}
            >
              Sports
            </button>
          </li>
          <li>
            <button
              className={`p-2 border border-gray-300 rounded ${selectedCategory === 'politics' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              onClick={() => {
                setSelectedCategory('politics');
                setCurrentPage(1);
              }}
            >
              Politics
            </button>
          </li>
          <li>
            <button
              className={`p-2 border border-gray-300 rounded ${selectedCategory === 'entertainment' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              onClick={() => {
                setSelectedCategory('entertainment');
                setCurrentPage(1);
              }}
            >
              Entertainment
            </button>
          </li>
        </ul>
      </nav>

      {/* Selected News Section */}
      {selectedNews.length > 0 && (
        <div id="selectedNews" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Selected Category News</h2>
          {renderNewsCards(selectedNews)}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <button
            className={`px-4 py-2 mr-2 bg-blue-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


