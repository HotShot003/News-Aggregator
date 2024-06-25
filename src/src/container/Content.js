import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const Content = () => {
    return (
        <div>
            <div className="p-6 h-full">
                <div className="flex items-center mb-4">
                    <i className="bi bi-house-fill ml-4"></i>
                    <h3 className='ml-10'>Home</h3>
                </div>
                <hr className="hr-custom mt-2"/>
                <div className="flex items-center mt-4 mb-4">
                    <i className="bi bi-search ml-4"></i>
                    <h3 className='ml-10'>Search</h3>
                </div>
                <hr className="hr-custom mt-2"/>
                <div className="flex items-center mt-4 mb-4">
                    <i className="bi bi-heart-fill ml-4"></i>
                    <h3 className='ml-10'>Favourite</h3>
                </div>
                <hr className="hr-custom mt-2"/>
            </div>
        </div>
    )
}

export default Content;




// import React from "react";
// import { Link } from 'react-router-dom'; // Import Link component
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const Content = () => {
//     return (
//         <div>
//             <div className="p-6 h-full">
//                 <Link to="/" className="flex items-center mb-4"> {/* Link to Dashboard/Home */}
//                     <i className="bi bi-house-fill ml-4"></i>
//                     <h3 className='ml-10'>Home</h3>
//                 </Link>
//                 <hr className="hr-custom mt-2"/>
//                 <Link to="/search" className="flex items-center mt-4 mb-4"> {/* Example link to Search page */}
//                     <i className="bi bi-search ml-4"></i>
//                     <h3 className='ml-10'>Search</h3>
//                 </Link>
//                 <hr className="hr-custom mt-2"/>
//                 <Link to="/liked" className="flex items-center mt-4 mb-4"> {/* Link to Liked Articles page */}
//                     <i className="bi bi-heart-fill ml-4"></i>
//                     <h3 className='ml-10'>Favourite</h3>
//                 </Link>
//                 <hr className="hr-custom mt-2"/>
//                 <div className="flex items-center mt-4 mb-4">
//                     <i className="bi bi-calendar ml-4"></i>
//                     <h3 className='ml-10'>Calendar</h3>
//                 </div>
//                 <hr className="hr-custom mt-2"/>
//             </div>
//         </div>
//     );
// };

// export default Content;
