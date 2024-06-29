import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FcLike, FcLikePlaceholder } from "react-icons/fc"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultImage from '../news-notdefined.jpeg';

// const apiKey = '2dc470f354b04f61805a32777ff604b6';  //Anurag Api Key
// const apiKey = 'f81f4118de804985bce1e1bb2dde5984';
const apiKey = 'b63b320651864d19809352d85179c59c'; // API Key (1)
// const apiKey = '8a252f4420814646b42d71889446f512'; // API Key (2)
// const apiKey = '27263c6b7b6549329d9a5f3a407f2f0a'; // API Key (3)

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedNews, setSelectedNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [likedArticles, setLikedArticles] = useState([]);

  const clickHandler = (article) => {
    if (likedArticles.includes(article.title)) {
      setLikedArticles((prev) => prev.filter((id) => id !== article.title));
      toast.warning("Like Removed");
    } else {
      setLikedArticles((prev) => [...prev, article.title]);
      toast.success("Liked Successfully");
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchData(searchQuery, currentPage);
    } else {
      fetchData(selectedCategory, currentPage);
    }
  }, [selectedCategory, currentPage, searchQuery]);

  const fetchData = async (category, page) => {
    const pageSize = 6;
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

  const fetchSearchData = async (query, page) => {
    const pageSize = 6;
    const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(e.target.value.length > 0);
    setCurrentPage(1);
  };

  const renderNewsCards = (news) => {
    if (!news || news.length === 0) return null;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 relative">
            <div className='w-[40px] h-[40px] bg-white shadow-lg rounded-full absolute right-2 bottom-56 grid place-items-center'>
              <button onClick={() => clickHandler(article)}>
                {likedArticles.includes(article.title) ? (
                  <FcLike fontSize="1.75rem" />
                ) : (
                  <FcLikePlaceholder fontSize="1.75rem" />
                )}
              </button>
            </div>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
            <img 
                  src={article.urlToImage || defaultImage} 
                  alt={article.title} 
                  className="w-full h-48 object-cover rounded-md mb-4" 
                />

              <div className="p-4">
                <p className="text-gray-900 font-semibold text-lg leading-6">
                  {article.title}
                </p>
                <p className="text-gray-700 mt-2">
                {
                    article.description ? (
                      article.description.length > 100 ?
                      `${article.description.substr(0, 100)}...` : article.description
                    ) : 'No description available.'
                  }
                </p>
              </div>
              <p className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</p>
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Toast Container */}
      <ToastContainer />

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search news..."
          className="p-3 pl-10 w-full sm:w-2/3 lg:w-1/2 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Navigation Bar */}
      {!isSearching && (
        <div className="mb-8">
          <ul className="flex justify-center space-x-4">
            {['general', 'business', 'sports', 'politics', 'entertainment'].map((category) => (
              <li key={category}>
                <button
                  className={`px-4 py-2 border border-gray-300 rounded-full transition-colors ${
                    selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected News Section */}
      {selectedNews.length > 0 && (
        <div id="selectedNews" className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">{isSearching ? 'Search Results' : 'Top Headlines'}</h2>
          {renderNewsCards(selectedNews)}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-full transition-opacity ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button> 
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-full transition-opacity ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;




// // src/container/Dashboard.js
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { FcLike, FcLikePlaceholder } from "react-icons/fc"; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import defaultImage from '../news-notdefined.jpeg';
// import { LikedArticlesContext } from '../container/LikedArticlesContext';

// const apiKey = '069a50da2b704458a6fe9d99370de464';

// const Dashboard = () => {
//   const { likedArticles, setLikedArticles } = useContext(LikedArticlesContext);
//   const [selectedCategory, setSelectedCategory] = useState('general');
//   const [selectedNews, setSelectedNews] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearching, setIsSearching] = useState(false);

//   const clickHandler = (article) => {
//     if (likedArticles.find((a) => a.title === article.title)) {
//       setLikedArticles((prev) => prev.filter((a) => a.title !== article.title));
//       toast.warning("Like Removed");
//     } else {
//       setLikedArticles((prev) => [...prev, article]);
//       toast.success("Liked Successfully");
//     }
//   };

//   useEffect(() => {
//     if (searchQuery) {
//       fetchSearchData(searchQuery, currentPage);
//     } else {
//       fetchData(selectedCategory, currentPage);
//     }
//   }, [selectedCategory, currentPage, searchQuery]);

//   const fetchData = async (category, page) => {
//     const pageSize = 6;
//     const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

//     try {
//       const response = await axios.get(url);
//       if (response.status === 200) {
//         setSelectedNews(response.data.articles);
//         setTotalPages(Math.ceil(response.data.totalResults / pageSize));
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setSelectedNews([]);
//       setTotalPages(1);
//     }
//   };

//   const fetchSearchData = async (query, page) => {
//     const pageSize = 6;
//     const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

//     try {
//       const response = await axios.get(url);
//       if (response.status === 200) {
//         setSelectedNews(response.data.articles);
//         setTotalPages(Math.ceil(response.data.totalResults / pageSize));
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setSelectedNews([]);
//       setTotalPages(1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setIsSearching(e.target.value.length > 0);
//     setCurrentPage(1);
//   };

//   const renderNewsCards = (news) => {
//     if (!news || news.length === 0) return null;

//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {news.map((article, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 relative">
//             <div className='w-[40px] h-[40px] bg-white shadow-lg rounded-full absolute right-2 bottom-56 grid place-items-center'>
//               <button onClick={() => clickHandler(article)}>
//                 {likedArticles.find((a) => a.title === article.title) ? (
//                   <FcLike fontSize="1.75rem" />
//                 ) : (
//                   <FcLikePlaceholder fontSize="1.75rem" />
//                 )}
//               </button>
//             </div>
//             <a href={article.url} target="_blank" rel="noopener noreferrer">
//               <img 
//                 src={article.urlToImage || defaultImage} 
//                 alt={article.title} 
//                 className="w-full h-48 object-cover rounded-md mb-4" 
//               />

//               <div className="p-4">
//                 <p className="text-gray-900 font-semibold text-lg leading-6">
//                   {article.title}
//                 </p>
//                 <p className="text-gray-700 mt-2">
//                   {
//                     article.description ? (
//                       article.description.length > 100 ?
//                       `${article.description.substr(0, 100)}...` : article.description
//                     ) : 'No description available.'
//                   }
//                 </p>
//               </div>
//               <p className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</p>
//             </a>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Toast Container */}
//       <ToastContainer />

//       {/* Search Bar */}
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search news..."
//           className="p-3 pl-10 w-full sm:w-2/3 lg:w-1/2 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//       </div>

//       {/* Navigation Bar */}
//       {!isSearching && (
//         <div className="mb-8">
//           <ul className="flex justify-center space-x-4">
//             {['general', 'business', 'sports', 'politics', 'entertainment'].map((category) => (
//               <li key={category}>
//                 <button
//                   className={`px-4 py-2 border border-gray-300 rounded-full transition-colors ${
//                     selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
//                   }`}
//                   onClick={() => {
//                     setSelectedCategory(category);
//                     setCurrentPage(1);
//                   }}
//                 >
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Selected News Section */}
//       {selectedNews.length > 0 && (
//         <div id="selectedNews" className="mb-8">
//           <h2 className="text-3xl font-bold text-center mb-6">{isSearching ? 'Search Results' : 'Top Headlines'}</h2>
//           {renderNewsCards(selectedNews)}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center space-x-4">
//           <button
//             className={`px-4 py-2 bg-blue-500 text-white rounded-full transition-opacity ${
//               currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
//             }`}
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button> 
//           <button
//             className={`px-4 py-2 bg-blue-500 text-white rounded-full transition-opacity ${
//               currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
//             }`}
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
