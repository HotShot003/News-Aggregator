// import React, { useContext } from 'react';
// import { LikedArticlesContext } from '../container/LikedArticlesContext';
// import defaultImage from '../news-notdefined.jpeg';

// const LikedArticles = () => {
//   const { likedArticles } = useContext(LikedArticlesContext);

//   const renderLikedArticles = () => {
//     if (!likedArticles || likedArticles.length === 0) {
//       return <p className="text-center text-gray-500">No liked articles yet.</p>;
//     }

//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {likedArticles.map((article, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
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
//       <h2 className="text-3xl font-bold text-center mb-6">Liked Articles</h2>
//       {renderLikedArticles()}
//     </div>
//   );
// };

// export default LikedArticles;
