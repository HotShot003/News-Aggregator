// Navbar.js
import React from "react";
import logo from '../logo.png';
import profileImage from '../profile.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar py-4 flex items-center justify-between px-4 sm:px-8">
                <img src={logo} alt="Logo" className="w-32 h-auto sm:w-44 sm:h-14 ml-2"/>
                <div className="flex-1 mx-4 sm:mx-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">NewsHive</h1>
                </div>
                <div className="mr-2 sm:mr-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gray-300">
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover"/>
                    </div>
                </div>
                {/* <div className="flex items-center space-x-6"> */}
                    {/* <Link to="/contact" className="flex items-center"> Link to ContactUs page */}
                        {/* <i className="bi bi-phone-fill"></i> */}
                        {/* <span className="ml-2">Contact Us</span> */}
                    {/* </Link> */}
                {/* </div> */}
            </nav>
            <hr className="hr-custom"/>
        </div>
    );
}

export default Navbar;
